/**
 * Función principal para renderizar vistas del detalle de producto
 * @param {*} response 
 */
var generarVistaDetalladaItem = function(response) {
    const producto = response.data;
    const sugeridos = response.sugeridos;

    // 1. Renderizar Galería
    renderizarGaleria(producto.imagenes);

    // 2. Renderizar Información Principal
    renderizarInfoPrincipal(producto, response.es_top_ventas, response.ventas_reales);

    // 3. Renderizar Sugeridos (También te puede interesar)
    renderizarSugeridos(sugeridos);
};

/**
 * Maneja la imagen principal y las miniaturas
 * En uso
 */
function renderizarGaleria(imagenes) {
    const contenedorThumbnails = $('#sec_images');
    const contenedorPrincipal = $('#ppal_image');
    
    // Si no hay imágenes, poner un placeholder
    if (!imagenes || imagenes.length === 0) {
        contenedorPrincipal.html(`<img src="${urlImg}no-image-placeholder.jpg" class="img-fluid">`);
        contenedorThumbnails.hide();
        return;
    }

    // Limpiar contenedores
    contenedorThumbnails.empty().show();
    
    // Generar Miniaturas
    imagenes.forEach((img, index) => {
        const urlCompleta = `${urlImg}${img.url}`; // Ajusta tu URL base
        const thumb = $(`
            <div class="thumb-item ${index === 0 ? 'active' : ''}">
                <img src="${urlCompleta}" onclick="cambiarImagenPrincipal('${urlCompleta}', this)">
            </div>
        `);
        contenedorThumbnails.append(thumb);
    });

    // Colocar la primera imagen como principal por defecto
    const primeraUrl = `${urlImg}${imagenes[0].url}`;
    cambiarImagenPrincipal(primeraUrl);
}

/**
 * Función para cambiar la imagen principal
 * En uso
 * @param {*} url 
 * @param {*} element 
 */
function cambiarImagenPrincipal(url, element) {
    const contenedor = $('#ppal_image');
    contenedor.fadeOut(200, function() {
        $(this).html(`<img src="${url}" class="img-fluid zoom-apple" id="img-zoom" data-zoom-image="${url}">`).fadeIn(200);
        
        // Re-inicializar zoom si usas elevateZoom
        if($.fn.elevateZoom) {
            $('.zoom-apple').elevateZoom({ zoomType: "inner", cursor: "crosshair" });
        }
    });

    if (element) {
        $('.thumb-item').removeClass('active');
        $(element).parent().addClass('active');
    }
}

/**
 * Pinta textos, precios y descripción
 * En uso
 */
function renderizarInfoPrincipal(p, topVentas, totalVendidos) {

    $('#referencia').text(p.categoria + ' | ' + p.referencia);
    $('#tituloPpal').text(p.nombre);
    $('#codItem').text('SKU: ' + p.codigo);
    
    // Formateo de precio (Estilo Apple: limpio)
    const precioFmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.precio_venta);
    $('#precioPpal').text(precioFmt);

    // Si hay precio máximo (oferta), mostrar el tachado
    if (parseFloat(p.precio_maximo) > parseFloat(p.precio_venta)) {
        const precioMaxFmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.precio_venta);
        $('#delPrice').html(`<span class="text-muted text-decoration-line-through">${precioMaxFmt}</span>`);
    } else {
        $('#delPrice').empty();
    }   

    // Limpiamos primero por si acaso
    $('#urgencia_container, #social_proof_container').empty();

    // 1. Mostrar Stock bajo si aplica
    if (p.existenciaactual > 0 && p.existenciaactual <= 5) {
        $('#urgencia_container').append(`
            <div class="apple-badge-stock">
                <i class="fa fa-clock-o"></i> ¡Últimas ${p.existenciaactual} unidades!
            </div>
        `);
    }

    // 2. Mostrar Prueba Social (Ventas)
    if (topVentas) {
        $('#social_proof_container').append(`
            <div class="social-proof-wrapper">
                <div class="proof-line">
                    <i class="fa fa-star"></i> 
                    <span>Producto <span class="highlight-text">Top Ventas</span></span>
                </div>
                <div class="proof-line">
                    <i class="fa fa-users"></i> 
                    <span><span class="highlight-text">Más de ${totalVendidos} personas</span> lo han comprado</span>
                </div>
            </div>
        `);
    }

    // Descripción: Limpiamos posibles estilos inline que vengan de la DB para que no rompan el diseño
    $('#descripcionPpal').html(p.desc_extensa).scrollTop(0);
    
    // Guardamos IDs para el carrito
    $('#codHid').val(p.codigo);
    $('#descHid').val(p.nombre);
}

/**
 * Renderiza los productos sugeridos con el diseño de cards Apple
 * En uso
 */
function renderizarSugeridos(sugeridos) {
    const contenedor = $('#imgGrupos');
    contenedor.empty();

    if (!sugeridos || sugeridos.length === 0) {
        $('.latest-products').hide();
        return;
    }

    sugeridos.forEach(s => {
        const imgUrl = (s.imagenes && s.imagenes.length > 0) 
            ? `${urlImg}${s.imagenes[0].url}` 
            : urlImg + "no-image-placeholder.jpg";
            
        const precioFmt = new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP', 
            minimumFractionDigits: 0 
        }).format(s.precio_venta);

        var nombreProd = s.nombre;
        var codProd = s.codigo;
        var refProd = s.referencia;

        // 2. Creamos el texto personalizado
        var mensajeWsp = "¡Hola! Me interesa información sobre el producto: " + nombreProd + 
                        " (Código: " + codProd + " | Ref: " + refProd + ")";

        // 3. Lo codificamos para URL
        var mensajeEncoded = encodeURIComponent(mensajeWsp);

        // 4. Armamos el link final
        var linkWsp = "https://api.whatsapp.com/send/?phone=573008225432&text=" + mensajeEncoded + "&type=phone_number&app_absent=0";

        // Estructura idéntica a las cards del Index
        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="apple-card">
                    <div class="apple-card-image-wrapper" onclick="window.location.href='product-details.php?id=${s.id}'" style="cursor:pointer;">
                        <img src="${imgUrl}" alt="${nombreProd}">
                    </div>
                    <div class="apple-card-details">
                        <div class="product-meta-subtle">Cod: ${codProd} | Ref: ${refProd}</div>
                        <h4 class="apple-card-title">${nombreProd}</h4>
                        <div class="apple-card-price">${precioFmt}</div>
                        
                        <div class="apple-card-actions">
                            <button class="btn-icon-only btn-cart-icon" title="Añadir al carrito" onclick="cambiarCantidad(${s.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </button>
                            <a href="${linkWsp}" target="_blank" class="btn-icon-only btn-wsp-icon" onclick="event.stopPropagation();">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.601 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.append(card);
    });
}

/**
 * Funcion para obtener un producto especifico, detalles y 
 * productos similares relacionados
 * En uso
 */
var cargarInformacionProducto = function(idProd) {
    //se obtienen los productos
    $.ajax({
        method: "GET",
        url: urlC + "producto/obtenerdetalle",
        data: { idProd: idProd },
        success: function(respuesta) {
            if ( respuesta.estado ) {
                generarVistaDetalladaItem(respuesta);
            } else {
                notificarUsuario("No se pudo obtener información del producto", "info");               
            }                
        },
        error: function() {
            notificarUsuario("No se pudo obtener información del producto", "error");
        }
    }); 
}

/**
 * Función para obtener parámetros de la URL
 * En uso
 */
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

/**
 * Agrega la información del formulario al carrito de compras
 * con la cantidad específica para el producto
 */
var salvarAlCarrito = function() {
    var cantidad = $('#uniFactor').val();
    const idProd = getQueryParam('id');

    cambiarCantidad(idProd, cantidad);

    $('#uniFactor').val('1');
}


$( document ).ready(function() {
    const idProd = getQueryParam('id');
    
    if (idProd) {
        cargarInformacionProducto(idProd);
    } else {
        // Si alguien entra a product-details.php sin ID, lo mandamos al inicio
        window.location.href = "index.php";
    }
});