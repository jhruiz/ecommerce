var urlC = '';
var urlEC = '';
var urlImg = '';
var ivaIncDefecto = '';
var pagActual = '0';
var cantItems = 0;
var cantidadItems = 0;
var empresa = 0;
var nombreEmpresa = "";
var celular = "";
var correo = "";
var ubicacion = "";
var googleubicacion = "";
var facebook = "";
var instagram = "";
var linkedin = "";
var youtube = "";
var whatsappButton = "";

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
            urlC = respuesta.general.urlC;
            urlEC = respuesta.general.urlEC;
            urlImg = respuesta.general.urlImg;
            pagActual = respuesta.general.pagActual;
            cantItems = respuesta.general.cantItems;
            cantidadItems = respuesta.general.cantidadItems;
            nombreEmpresa = respuesta.general.nombreEmpresa;
            
            celular = respuesta.footer.celular;
            correo = respuesta.footer.correo;
            ubicacion = respuesta.footer.ubicacion;
            facebook  = respuesta.footer.facebook;
            instagram  = respuesta.footer.instagram;
            linkedin  = respuesta.footer.linkedin;
            youtube  = respuesta.footer.youtube;

            about_us_titulo = respuesta.about_us.about_us_titulo;
            about_us_descripcion = respuesta.about_us.about_us_descripcion;
            donde_encontrarnos = respuesta.about_us.donde_encontrarnos;
            googleubicacion = respuesta.about_us.googleubicacion;
            about_us_facebook = respuesta.about_us.about_us_facebook;
            about_us_instagram = respuesta.about_us.about_us_instagram;
            about_us_linkedin = respuesta.about_us.about_us_linkedin;
            about_us_youtube = respuesta.about_us.about_us_youtube;
            direccion = respuesta.about_us.direccion;
            horario = respuesta.about_us.horario;
            correoventas = respuesta.about_us.correoventas;

            whatsappButton = respuesta.whatsapp.whatsappButton;

            $('#nombreEmpresa').text(nombreEmpresa);

            // 2. Construimos la URL de WhatsApp dinámicamente
            // Usamos encodeURIComponent para que el mensaje no rompa la URL
            var mensaje = "¡Hola! Me interesa conocer más sobre sus productos.";
            var urlWhatsapp = "https://wa.me/+57" + celular + "?text=" + encodeURIComponent(mensaje);

            // 3. Aplicamos la URL al botón
            $('#btn-whatsapp-dinamico').attr('href', urlWhatsapp);
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


/**
 * Cierra la sesión en Back y Front
 */
function ejecutarLogout() {
    $.ajax({
        method: "POST",
        url: urlC + "cliente/logout", // Ruta que crearemos en Laravel
        xhrFields: { withCredentials: true },
        success: function(res) {
            // Limpiamos los datos que guardó tu loginUser
            localStorage.clear();
            
            // Usamos tu función de notificaciones
            if (typeof notificarUsuario === 'function') {
                notificarUsuario("Sesión cerrada correctamente", "success");
            }

            setTimeout(function() {
                window.location.href = 'index.php';
            }, 1500);
        },
        error: function() {
            // Si falla la red, igual limpiamos local por seguridad
            localStorage.clear();
            window.location.href = 'login.php';
        }
    });
}

/**
 * Revisa el localStorage y ajusta el menú
 */
function gestionarHeaderDinamico() {
    const nombre = localStorage.getItem('nombre');
    const menu = $('#menu-principal-torque');

    if (nombre) {
        const primerNombre = nombre.split(' ')[0];
        
        // Creamos la estructura con el nombre y la opción de salir
        // Mantenemos tus clases 'nav-item-apple' para no dañar el diseño
        const htmlLogueado = `
            <a href="index.php" class="nav-item-apple">Inicio</a>
            <a href="about-us.php" class="nav-item-apple">Sobre nosotros</a>
            <div class="dropdown d-inline">
                <a href="#" class="nav-item-apple dropdown-toggle" id="userMenu" data-toggle="dropdown">
                    <i class="fa fa-user-circle"></i> ${primerNombre}
                </a>
                <div class="dropdown-menu dropdown-menu-right apple-dropdown-shadow" style="border-radius: 12px; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <a class="dropdown-item py-2" href="my-orders.php"><i class="fa fa-list-alt mr-2"></i> Mis Pedidos</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="ejecutarLogout()">
                        <i class="fa fa-sign-out mr-2"></i> Cerrar Sesión
                    </a>
                </div>
            </div>
        `;
        menu.html(htmlLogueado);
    }
}

$( document ).ready(function() { 

    cargarValEnv();
    obtenerItems();
    gestionarHeaderDinamico();
    
});