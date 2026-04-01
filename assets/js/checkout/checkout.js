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
            } else {
                alert(res.mensaje);
                btn.prop('disabled', false).text('Finalizar Pedido');
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


$(document).ready(function() {
    initCheckout();
});