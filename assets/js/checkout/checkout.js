function initCheckout() {
    const userId = localStorage.getItem('id');

    $.ajax({
        method: "GET",
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

    $.get(urlC + 'pedido/obtenercarritoactivo', function(res) {
        if (res.estado) {
            let html = '';
            
            if (res.items.length === 0) {
                html = '<div class="empty-cart-msg text-center py-5"><p class="text-muted">Tu carrito está vacío</p></div>';
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
    });
}


function procesarPedido() {

    const metodo = $('input[name="metodo_pago"]:checked').val();
    const totalRaw = $('#check-total').text().replace(/[^0-9]/g, '');
    const btn = $('.btn-pay-now');

    btn.prop('disabled', true).text('Procesando...');

    // LLAMADA ÚNICA AL BACKEND
    $.post(urlC + 'pedidos/finalizar-compra', {
        metodo_pago: metodo,
        total: totalRaw
    }, function(res) {
        if(res.estado) {
            if(metodo === 'wompi') {
                // Si es Wompi, el backend ya nos envió la firma y la llave en 'res.data_pago'
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
                        phoneNumber: String(res.cliente.celular).replace(/\s/g, ''), // Asegurar que sea String y sin espacios
                        phoneNumberPrefix: '+57'
                    }
                });

                checkout.open(function (result) {
                    if (result.transaction.status === 'APPROVED') {
                        window.location.href = "gracias.php?ref=" + result.transaction.id;
                    }
                });
            } else {
                // Si es Contraentrega, simplemente redirigimos
                window.location.href = 'gracias.php?order=' + res.order_id;
            }
        } else {
            alert(res.mensaje);
            btn.prop('disabled', false).text('Finalizar Pedido');
        }
    });
}


$(document).ready(function() {
    initCheckout();
});