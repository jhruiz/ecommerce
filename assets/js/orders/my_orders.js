var estadosPedido = [];

const formatearNumero = (n) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
};

const obtenerEstadosPedido = () => {
    $.ajax({
        method: "GET",
        url: urlC + "estadopedidos/obtener",
        xhrFields: { withCredentials: true },
        success: function(res) { if (res.estado) estadosPedido = res.data; }
    });
}

const cargarPedidos = () => {
    var userId = localStorage.getItem('id');
    $.ajax({
        url: urlC + "prefactura/obtenerpedidocliente",
        type: "GET",
        data: { userId: userId },
        xhrFields: { withCredentials: true },
        success: function(res) {
            if (res.estado) {
                let html = '';
                res.data.forEach(ped => {
                    var num = ped.numeropedido || ped.id;
                    html += `
                    <tr id="tr_${ped.id}" class="trpedido" onclick="verDetalle(${ped.id}, '${num}')">
                        <td><b>#${num}</b></td>
                        <td><span class="badge badge-light text-primary">${ped.estado_nombre}</span></td>
                        <td class="text-right small">${ped.fecha ? ped.fecha.substring(0,10) : ''}</td>
                    </tr>`;
                });
                $('#det_pedidos').html(html);
            }
        }
    });
};

const verDetalle = (id, num) => {
    // UI: Activar fila
    $('.trpedido').removeClass('table-active-torque');
    $(`#tr_${id}`).addClass('table-active-torque');

    // Manejo de contenedores
    $('#instruccion-seleccion').hide();
    $('#info-pedido-dinamica').show();
    $('#num_pedido').text('#' + num);

    $.ajax({
        url: urlC + "pedidodetalle/obtenerdetalle",
        type: "GET",
        data: { pedidoId: id },
        xhrFields: { withCredentials: true },
        success: function(res) {
            if (res.estado) {
                renderTimeline(res.cabecera.estadopedido_id);
                renderResumen(res.cabecera, res.ttles);
                renderItems(res.data);
                renderTotales(res.ttles);
            }
        }
    });
};

const renderTimeline = (actual) => {
    let html = '<ul class="timeline-apple">';
    let activo = 'active';
    estadosPedido.forEach(e => {
        // const activo = e.id == actual ? 'active-' : '';
        html += `<li class="${activo}"><div class="icon"><i class="${e.fontawesome}"></i></div><span class="text">${e.descripcion}</span></li>`;
        if(e.id == actual) {
            activo = ''
        }
    });
    html += '</ul>';
    $('.time-line').html(html);
};

const renderResumen = (c, t) => {
    $('#det-res-pedido').html(`
        <tr><td><b>Fecha:</b> ${c.fechaorden || c.created}</td></tr>
        <tr><td><b>Total Pagado:</b> ${formatearNumero(t['4'])}</td></tr>
    `);
};

const renderItems = (items) => {
    let html = '';
    items.forEach(i => {
        html += `<tr><td>${i.desc_item}</td><td class="text-center">${i.cantidad}</td><td class="text-right">${formatearNumero(i.vlr_item)}</td><td class="text-right">${formatearNumero(i.cantidad * i.vlr_item)}</td></tr>`;
    });
    $('#det_pedido').html(html);
};

const renderTotales = (t) => {
    $('#det_pago').html(`
        <tr><td colspan="3" class="text-right">Subtotal:</td><td class="text-right">${formatearNumero(t['2'])}</td></tr>
        <tr><td colspan="3" class="text-right">IVA:</td><td class="text-right">${formatearNumero(t['3'])}</td></tr>
        <tr><td colspan="3" class="text-right"><b>Total:</b></td><td class="text-right"><b>${formatearNumero(t['4'])}</b></td></tr>
    `);
};

$(document).ready(function() {
    obtenerEstadosPedido();
    cargarPedidos();
});