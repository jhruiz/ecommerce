function validarMetodoActivo() {
    // Variable lógica
    var pagoWompiHabilitado = localStorage.getItem('paygate');
    
    // Obtenemos los elementos
    var radioWompi = document.querySelector('input[name="metodo_pago"][value="wompi"]');
    var radioContraentrega = document.querySelector('input[name="metodo_pago"][value="contraentrega"]');
    
    if (pagoWompiHabilitado == 'false') {
        // Si está habilitado, activamos Wompi y lo seleccionamos
        radioWompi.disabled = false;
        radioWompi.checked = true;
    } else {
        // 1. Bloqueamos Wompi para que no se pueda seleccionar
        radioWompi.disabled = true;
        
        // 2. Quitamos cualquier selección previa de Wompi (por seguridad)
        radioWompi.checked = false;
        
        // 3. Seleccionamos Contraentrega por defecto
        radioContraentrega.checked = true;
    }
}

function initCheckout() {
    const userId = localStorage.getItem('id');

    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        url: urlC + "cliente/perfilcliente",
        data: { userId : userId },
        success: function(respuesta) {
            if(respuesta.estado) {
                const c = respuesta.cliente;
                $('#check-nombre-cliente').text(c.nombre);
                $('#check-direccion-cliente').text(c.direccion);
                $('#check-ciudad-telefono').text(c.ciudad + ' - ' + c.celular);
            
            } else {
                // Si no hay sesión en el back, redirigir al login del front
                window.location.href = 'login.php';
            }            
        },
        error: function() {
            console.log('Error al obtener los items')
        }
    });

    // 2. Obtener el resumen del carrito (La función que ya teníamos)
    cargarResumenCheckout();
}


function cargarResumenCheckout() {
    $.ajax({
        url: urlC + 'pedido/obtenercarritoactivo',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            if (res.estado) {
                if (res.items.length === 0) {
                    $('#checkout-items-list').html('<div class="empty-cart-msg text-center py-5"><p class="text-muted">Tu carrito está vacío</p></div>');
                } else {
                    let itemsHtml = '';
                    res.items.forEach(item => {
                        itemsHtml += `
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="d-flex align-items-center">
                                    <img src="${urlImg}${item.imagen}" width="40" class="rounded mr-2">
                                    <span class="small font-weight-bold">${item.cantidad}x ${item.nombre}</span>
                                </div>
                                <span class="text-muted small">${item.total_fila_fmt}</span>
                            </div>`;
                    });
                    
                    $('#checkout-items-list').html(itemsHtml);
                    
                    // Valores con formato Apple
                    $('#check-subtotal').html(`<strong>${res.subtotal}</strong>`);
                    $('#check-iva').html(`<span>IVA Incluido</span> <strong>${res.iva}</strong>`);
                    $('#check-total').html(`<span class="h4 mb-0 font-weight-bold">${res.total}</span>`);
                }
            }
        },
        error: function(xhr) {
            console.error("Error al cargar el resumen del checkout:", xhr);
        }
    });
}

function procesarPedido() {
    const metodo = $('input[name="metodo_pago"]:checked').val();
    const totalRaw = $('#check-total').text().replace(/[^0-9]/g, '');
    const btn = $('.btn-pay-now');
    const minAmount = localStorage.getItem('minamount');
    
    if (metodo == 'wompi' && parseFloat(totalRaw) < parseFloat(minAmount)) {
        
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(minAmount);
        
        const mensaje = "El monto del pedido no puede ser menor a " + formatoMoneda + ".";
        notificarUsuario(mensaje, "info");
        
    } else {
        
        btn.prop('disabled', true).text('Procesando...');
    
        // CAMBIAMOS $.post POR $.ajax PARA ENVIAR CREDENCIALES
        $.ajax({
            url: urlC + 'pedidos/finalizar-compra',
            type: 'POST',
            xhrFields: {
                withCredentials: true // <--- Crucial para que el back recupere la sesión del usuario
            },
            data: {
                metodo_pago: metodo,
                total: totalRaw
            },
            success: function(res) {
                if(res.estado) {
                    if(metodo === 'wompi') {
                        // El backend ya nos envió la firma y la llave cargada desde el Tenant
                        const checkout = new WidgetCheckout({
                            currency: 'COP',
                            amountInCents: res.data_pago.monto,
                            reference: res.data_pago.referencia,
                            publicKey: res.data_pago.public_key,
                            signature: { integrity: res.data_pago.firma },
                            redirectUrl: window.location.origin + '/success.php',
                            customerData: {
                                email: res.cliente.email.trim(),
                                fullName: res.cliente.nombre.trim(),
                                phoneNumber: String(res.cliente.celular).replace(/\s/g, ''),
                                phoneNumberPrefix: '+57'
                            }
                        });
    
                        checkout.open(function (result) {
                            // El resultado del pago se gestiona aquí
                            if (result.transaction.status === 'APPROVED') {
                                window.location.href = "gracias.php?ref=" + result.transaction.id;
                            } else {
                                // Si el pago no fue aprobado (rechazado/cancelado), rehabilitamos el botón
                                alert("El pago no pudo ser procesado (" + result.transaction.status + "). Intenta de nuevo.");
                                btn.prop('disabled', false).text('Finalizar Pedido');
                            }
                        });
                    } else {
                        // Si es Contraentrega
                        window.location.href = 'gracias.php?order=' + res.order_id;
                    }
                }    
                if(metodo === 'contraentrega') {
                    // 1. Limpiamos el carrito localmente si usas localStorage para el conteo
                    localStorage.removeItem('cart_items'); // Ajusta según el nombre de tu variable
                    $('#cntItems').text('0'); // Ponemos el badge del header en cero
                    
                    // 2. Redirigimos
                    window.location.href = 'gracias.php?order=' + res.order_id;
                }
            },
            error: function(xhr) {
                // Manejo de errores de servidor (500, 404, etc)
                console.error(xhr);
                alert("Hubo un error de conexión con el servidor. Por favor intenta de nuevo.");
                btn.prop('disabled', false).text('Finalizar Pedido');
            }
        });
        
    }
    
    

    
}

// Variable global para guardar el ID del cliente
let clienteActualId = null;

function abrirModalDireccion() {
    // Cargamos los países al abrir el modal (reutilizando tu lógica de registro)
    obtenerPaises(); 
    $('#modalDireccion').modal('show');
}

/**
 * Función para guardar la nueva dirección en la base de datos
 */
function guardarNuevaDireccion() {
    const datos = {
        userId: localStorage.getItem('id'),
        pais: $('#countries').val(),
        dpto: $('#dptos').val(),
        ciudad: $('#cities').val(), // ID de la ciudad
        direccion: $('#new-direction').val(),
        celular: $('#new-cellphone').val()
    };

    if (datos.ciudad === "" || datos.direccion === "" || datos.celular === "") {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    $.ajax({
        url: urlC + 'cliente/actualizar-datos-envio', // Debes crear esta ruta en el controlador
        type: 'POST',
        xhrFields: { withCredentials: true },
        data: datos,
        success: function(res) {
            if (res.estado) {
                // Actualizar la vista del checkout sin recargar
                $('#check-direccion-cliente').text(datos.direccion);
                // El nombre de la ciudad lo sacamos del texto del select seleccionado
                const ciudadNombre = $("#cities option:selected").text();
                $('#check-ciudad-telefono').text(ciudadNombre + ' - ' + datos.celular);
                
                // Actualizar localStorage para futuras visitas
                localStorage.setItem('direccion', datos.direccion);
                localStorage.setItem('celular', datos.celular);
                localStorage.setItem('ciudad', ciudadNombre);

                $('#modalDireccion').modal('hide');
                notificarUsuario("Datos de envío actualizados", "success");
            } else {
                alert("No se pudieron actualizar los datos: " + res.mensaje);
            }
        }
    });
}

// --- LÓGICA DE SELECTS ANIDADOS (Reutilizada del registro) ---

var obtenerPaises = function() {
    $.ajax({
        method: "GET",
        url: urlC + "paises/obtener",
        success: function(res) {
            let html = '<option value="">PAISES*</option>';
            res.data.forEach(e => html += `<option value="${e.id}">${e.descripcion}</option>`);
            $('#countries').html(html);
            $('#countries').off('change').on('change', obtenerDepartamentos);
        }
    });
}

var obtenerDepartamentos = function() {
    const paisId = $('#countries').val();
    $.ajax({
        method: "GET",
        url: urlC + "departamentos/obtener",
        data: { paisId: paisId },
        success: function(res) {
            let html = '<option value="">DEPARTAMENTOS*</option>';
            res.data.forEach(e => html += `<option value="${e.id}">${e.descripcion}</option>`);
            $('#dptos').html(html);
            $('#dptos').off('change').on('change', obtenerCiudades);
        }
    });
}

var obtenerCiudades = function() {
    const dptoId = $('#dptos').val();
    $.ajax({
        method: "GET",
        url: urlC + "ciudades/obtener",
        data: { dptoId: dptoId },
        success: function(res) {
            let html = '<option value="">CIUDADES*</option>';
            res.data.forEach(e => html += `<option value="${e.id}">${e.descripcion}</option>`);
            $('#cities').html(html);
        }
    });
}

$(document).ready(function() {
    validarMetodoActivo();
    initCheckout();
});