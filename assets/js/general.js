var urlC = '';
var urlEC = '';
var urlImg = '';
var urlGuide = '';
var ivaIncDefecto = '';
var pagActual = '0';
var cantItems = 0;
var cantidadItems = 0;
var empresa = 0;

var typingTimer;                
var doneTypingInterval = 350; // Tiempo de espera en ms

$('#input_search').on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneSearch, doneTypingInterval);
});

/**
 * Obtiene los items agregados por el cliente al carrito de compras y lo setea en el menu
 * En uso
 */
var obtenerItems = function() {
    // valida si existe un usuario logueado
    var userId = localStorage.getItem('id');
    
    if( userId != null ) {
        $.ajax({
            method: "GET",
            xhrFields: {
                withCredentials: true
            },
            url: urlC + "pedido/cantidaditems",
            data: { userId : userId },
            success: function(respuesta) {
                if(respuesta.estado) {
                    $('#cntItems').html(respuesta.data.length);
                }                
            },
            error: function() {
                console.log('Error al obtener los items')
            }
        });             
    }    
}

/**
 * Genera el número de pedido que muestra al cliente tras aprobarlo
 * @param {*} data 
 */
 var generarNumeroPedido = function( data ) {
    
    var numPedido = '';

    // separa la fecha por el espacio entre la fecha y la hora
    var arrDate = data.fechapedido.split(' ');

    // genera el número de pedido con el id del pedido, el id del usuario y la hora sin los dos puntos
    numPedido = data.id.toString() + data.usuario_id.toString() + arrDate['1'].replaceAll(':', '');

    return numPedido;
}

/**
 * Carga por ajax las variables de ambiente locales
 */
var cargarValEnv = function(){
    $.ajax({
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        url: "env.json",
        async: false,
        success: function(respuesta) {
            urlC = respuesta.urlC;
            urlEC = respuesta.urlEC;
            urlImg = respuesta.urlImg;
            urlGuide = respuesta.urlGuide;
            pagActual = respuesta.pagActual;
            cantItems = respuesta.cantItems;
            cantidadItems = respuesta.cantidadItems;
        },
        error: function() {
            bootbox.alert('Se produjo un error. Por favor, inténtelo nuevamente.');
        }
    });  
}

/**
 * Función transversal para notificaiones
 * En uso
 * @param {*} mensaje 
 * @param {*} icono 
 */
const notificarUsuario = (mensaje, icono = 'success') => {
    Swal.fire({
        icon: icono,
        title: mensaje,
        toast: true,
        position: 'top-end', // Volvemos a la derecha
        showConfirmButton: false,
        timer: 2000, // Lo hacemos más rápido (2 seg) para que no estorbe
        timerProgressBar: true,
        target: document.getElementById('notificaciones-torque'),
        customClass: {
            popup: 'apple-toast-popup',
            title: 'apple-toast-title'
        }
    });
};

function doneSearch () {
    var busqueda = $('#input_search').val();

    // Si la búsqueda es muy corta, no hacemos nada o volvemos al inicio
    if (busqueda.length > 0 && busqueda.length < 3) return;

    // Resetear a la página 1 cada vez que se busca algo nuevo
    pagActual = 1; 

    obtenerProductos(pagActual, busqueda); 
}

// Función para CERRAR
function openCart() {
    $('#side-cart').addClass('active');
    $('#cart-overlay').fadeIn(300); // Esto muestra la capa oscura
    actualizarContenidoCarrito();
}

function closeCart() {
    $('#side-cart').removeClass('active');
    $('#cart-overlay').fadeOut(300); // Esto oculta la capa oscura
}

// Consultar al Back la prefactura activa
function actualizarContenidoCarrito() {
    $.ajax({
        url: urlC + 'pedido/obtenercarritoactivo',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            if (res.estado) {
                let html = '';
                
                if (res.items.length === 0) {
                    html = '<div class="empty-cart-msg text-center py-5"><p class="text-muted">Tu carrito está vacío</p></div>';
                } else {
                    res.items.forEach(item => {
                        html += `
                            <div class="cart-item">
                                <div class="cart-item-media">
                                    <img src="${urlImg}${item.imagen}" alt="${item.nombre}">
                                </div>
                                
                                <div class="cart-item-details">
                                    <h4 class="cart-item-name">${item.nombre}</h4>
                                    <p class="cart-item-unit-price" style="font-size: 12px; color: #86868b;">${item.precio_fmt}</p>
                                    
                                    <div class="amazon-stepper">
                                        <button onclick="cambiarCantidad(${item.producto_id}, -1)" class="stepper-btn">
                                            ${item.cantidad > 1 ? '<i class="fa fa-minus"></i>' : '<i class="fa fa-trash-o" style="color:#ff3b30"></i>'}
                                        </button>
                                        <span class="stepper-value">${item.cantidad}</span>
                                        <button onclick="cambiarCantidad(${item.producto_id}, 1)" class="stepper-btn">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
    
                                <div class="cart-item-total-price">
                                    ${item.total_fila_fmt}
                                </div>
                            </div>
                        `;
                    });
                }
    
                $('#cart-items-container').html(html);
                $('#cart-subtotal').text(res.subtotal);
                $('#cart-iva').text(res.iva);
                $('#cart-total').text(res.total);
                $('#cntItems').text(res.totalLineas);
            }
        },
        error: function(xhr) {
            console.error("Error al obtener el carrito:", xhr);
        }
    });
}

/**
 * Agrega un producto al carrito de compras y agrega info a la prefactura
 * @param {*} data 
 */
function cambiarCantidad(productoId, cantidad = 1) {
    
    $.ajax({
        method: "POST",
        xhrFields: {
            withCredentials: true
        },
        url: urlC + "pedidos/guardar",
        data: { item_id: productoId, cantidad: cantidad },
        async: false,
        success: function(respuesta) { 
        
            if ( respuesta.estado ) {

                // 2. Actualizar el numerito del header
                var cntItems = respuesta.totalItems;
                $('#cntItems').text(cntItems);

                if (cntItems > 9) {
                    $('#cntItems').css({
                        'border-radius': '10px',
                        'width': 'auto',
                        'padding': '0 6px'
                    });
                } else {
                    $('#cntItems').css({
                        'border-radius': '50%',
                        'width': '20px',
                        'padding': '0'
                    });
                }
                
                // 3. Feedback visual en el botón del header (Pequeño brinco)
                $('.apple-cart-badge').addClass('bump');
                setTimeout(() => $('.apple-cart-badge').removeClass('bump'), 300);

               openCart(); // Siempre lo abre, no lo alterna

            } else {
                notificarUsuario("No se pudo agregar el producto al carrito de compras", "info");    
            }
            
        },
        error: function(xhr) {
            // Aquí capturamos el 401, 500, etc.
            if (xhr.status === 401) {
                let respuesta = JSON.parse(xhr.responseText);
                
                notificarUsuario(respuesta.mensaje, "error");
                
                // Opcional: Redirigir al login después de 2 segundos
                setTimeout(() => {
                    window.location.href = "login.php";
                }, 2000);
            } else if (xhr.status === 500) {
                let respuesta = JSON.parse(xhr.responseText);
                
                notificarUsuario(respuesta.mensaje, "error");
                
            }else {
                notificarUsuario("Ocurrió un error inesperado", "error");
            }
        }
      }); 
    
}



$( document ).ready(function() { 

    cargarValEnv();
    obtenerItems();
    
});