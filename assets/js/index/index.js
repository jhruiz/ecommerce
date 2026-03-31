// Iconos SVG para Anterior/Siguiente (para que no dependas de FontAwesome)
var iconArrowLeft = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
var iconArrowRight = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;


/**
 * Redirecciona a la pagina de detalles del producto y guarda en sesion el id de producto
 * En uso
 * @param {*} id 
 */
var redirectItemDetail = function(idProd) {
    window.location.href = urlEC + "product-details.php?id=" + idProd;
}

/**
 * Obtiene y formatea el precio del producto a pesos.
 * Valida si el iva se encuentra incluido o no
 * En uso
 * @param {*} precio 
 * @param {*} ivaInc 
 * @returns 
 */
var  obtenerPrecioProducto = function(precio, ivaInc) {
    var valorProducto = "";

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

    if (precio != "" ) {
        var iva = ivaInc == '1' ? ' IVA incluido' : ' + IVA';
        valorProducto = formatter.format(precio).toString() + '<p>' + iva + '</p>';
    } else {
        valorProducto = '$0'
    }

    return valorProducto;
}

/**
 * Genera la vista de los productos obtenidos desde datax
 * En uso
 * @param {*} data 
 */
var generarVistaImagenes = function(data) {
    var listPdrHtml = "";
    var imgPlaceholder = urlImg + "no-image-placeholder.jpg"; 

    data.data.forEach(element => {
        
        var imgUrl = (element.imagenes && element.imagenes.length > 0 && element.imagenes[0].url) 
            ? urlImg + element.imagenes[0].url
            : imgPlaceholder;

        var valPdr = (typeof obtenerPrecioProducto === 'function') 
            ? obtenerPrecioProducto(element.precio_venta, 1) 
            : "$" + element.precio_venta.toLocaleString();

        // SVG del Carrito (Estilo Apple)
        var iconCart = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

        // SVG de WhatsApp
        var iconWsp = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

        // 1. Seteamos variables a usar
        var nombreProd = element.nombre;
        var codProd = element.codigo;
        var refProd = element.referencia;

        // 2. Creamos el texto personalizado
        var mensajeWsp = "¡Hola! Me interesa información sobre el producto: " + nombreProd + 
                        " (Código: " + codProd + " | Ref: " + refProd + ")";

        // 3. Lo codificamos para URL
        var mensajeEncoded = encodeURIComponent(mensajeWsp);

        // 4. Armamos el link final
        var linkWsp = "https://api.whatsapp.com/send/?phone=573008225432&text=" + mensajeEncoded + "&type=phone_number&app_absent=0";

        listPdrHtml += `
        <div class="col-xl-3 col-lg-4 col-sm-6 mb-4">
            <div class="apple-card">
                <div class="apple-card-image-wrapper" onclick="redirectItemDetail(${element.id})" style="cursor:pointer;">
                    <img src="${imgUrl}" alt="${nombreProd}">
                </div>
                <div class="apple-card-details">
                    <div class="product-meta-subtle">Cod: ${codProd} | Ref: ${refProd}</div>
                    <h4 class="apple-card-title">${nombreProd}</h4>
                    <div class="apple-card-price">${valPdr}</div>
                    <div class="apple-card-actions">
                        <button class="btn-icon-only btn-cart-icon" title="Añadir al carrito" onclick="cambiarCantidad(${element.id})">
                            ${iconCart}
                        </button>
                        <a href="${linkWsp}" target="_blank" class="btn-icon-only btn-wsp-icon" onclick="event.stopPropagation();">
                            ${iconWsp}
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    });

    $('#prods_availables').html(listPdrHtml);
};

/**
 * Obtiene los productos disponibles para el e-commerce
 * @param {*} pag 
 */
var obtenerProductos = function( pag, busqueda = null ) {

    if(pag == ""){
        pag = 1;
    }

    //se obtienen los productos
    $.ajax({
        method: "GET",
        url: urlC + "productos/obtener",
        data: { pagina: pag, cantidad: cantItems, descripcion: busqueda },
        async: false,
        success: function(respuesta) {            

            if ( respuesta.cantidad > 0 ) {

                /** Genera la grilla de imagenes */
                generarVistaImagenes(respuesta);

                /** Obtiene la cantidad total de items en stock */
                cantidadItems = respuesta.cantidad;

                /** Agrega el paginador */
                paginador();                             
            } else {
                $('#prods_availables').html('<div class="col-12 text-center py-5"><h3 class="text-muted">No encontramos productos que coincidan.</h3></div>');
                notificarUsuario("No se encontraron resultados", "info"); 
                cantidadItems = 0;  
                paginador();         
            }
            
        },
        error: function() {
            notificarUsuario("No se pudo obtener información de los productos", "info");
        }
      });  
}

/**
 * Cambia a la anterior pagina basado en la actual
 */
function previusPage() {       
    $('.li_paginate').removeClass("active");
    pagActual = parseInt(pagActual) - 1;
    busqueda = $('#input_search').val();

    obtenerProductos(pagActual, busqueda);
    paginador();
}

/**
 * Cambia a la siguiente pagina basado en la actual
 */
function nextPage() {
    $('.li_paginate').removeClass("active");
    pagActual = parseInt(pagActual) + 1;
    busqueda = $('#input_search').val();
    
    obtenerProductos(pagActual, busqueda);
    paginador();
}

/**
 * Cambia de pagina actual por la selecionada
 * @param {*} data 
 */
function changePag(data) {
    var arrPg = data.id.split("_");
    pagActual = arrPg['1'];
    busqueda = $('#input_search').val();

    obtenerProductos(pagActual, busqueda);
    paginador();
} 

/**
 * Pinta el full paginador en el html
 */
var paginador = function() {
    var cantPag = Math.ceil(cantidadItems / cantItems);
    var current = parseInt(pagActual);
    var maxVisible = 5; // Número de botones de página a mostrar
    var pagHtml = "";

    // 1. Botón Anterior (Double Left) - Solo si no estamos en la 1
    if (current > 1) {
        pagHtml += `<li><a href="javascript:void(0)" onclick="previusPage()" class="pag-nav-btn">${iconArrowLeft}</a></li>`;
    }

    // Calcular el rango de páginas visibles
    var start = Math.max(1, current - Math.floor(maxVisible / 2));
    var end = Math.min(cantPag, start + maxVisible - 1);

    // Ajustar si estamos cerca del final
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    // 2. Primera página y puntos suspensivos iniciales
    if (start > 1) {
        pagHtml += `<li class="li_paginate"><a href="javascript:void(0)" onclick="changePag(this)" id="apg_1">1</a></li>`;
        if (start > 2) {
            pagHtml += `<li class="pag-dots"><span>...</span></li>`;
        }
    }

    // 3. Páginas numéricas centrales
    for (var i = start; i <= end; i++) {
        var activeClass = (i === current) ? "active" : "";
        pagHtml += `
            <li class="li_paginate ${activeClass}" id="li_${i}">
                <a href="javascript:void(0)" onclick="changePag(this)" id="apg_${i}">${i}</a>
            </li>`;
    }

    // 4. Puntos suspensivos finales y última página
    if (end < cantPag) {
        if (end < cantPag - 1) {
            pagHtml += `<li class="pag-dots"><span>...</span></li>`;
        }
        pagHtml += `<li class="li_paginate"><a href="javascript:void(0)" onclick="changePag(this)" id="apg_${cantPag}">${cantPag}</a></li>`;
    }

    // 5. Botón Siguiente (Double Right) - Solo si no estamos al final
    if (current < cantPag) {
        pagHtml += `<li><a href="javascript:void(0)" onclick="nextPage()" class="pag-nav-btn">${iconArrowRight}</a></li>`;
    }

    $('#ul_paginator').html(pagHtml);
};


$( document ).ready(function() {   

    /**Obtiene los items y sus imagenes */
    obtenerProductos(pagActual);  

});