/**
 * Crear el dropdown de ciudades
 */
var crearListaCiudades = function(data) {
    var htmlCities = '<option value="">CIUDADES*</option>';

    if(data != null) {
        data.forEach( element => {
            htmlCities += '<option value="' + element.id + '">' + element.descripcion + '</option>';
        });
    }

    $('#cities').html(htmlCities);
}

/**
 * Obtienen las ciudades desde la base de datos
 */
var obtenerCiudades = function() {
    var dptoId = $("#dptos option:selected").val();

    if(dptoId != "") {
        $.ajax({
            method: "GET",
            url: urlC + "ciudades/obtener",
            data: { dptoId : dptoId },
            success: function(respuesta) {
                if(respuesta.estado) {
                    crearListaCiudades(respuesta.data);
                }                
            },
            error: function() {
                console.log('Error al obtener las ciudades');
            }
        }); 
    } else {
        console.log('Debe seleccionar un departamento');
    }
            
}

/**
 * Se crea la lista de departamentos con la información obtenida por ajax
 * @param {*} data 
 */
var crearListaDptos = function(data) {
    var htmlDptos = '<option value="">DEPARTAMENTOS*</option>';

    data.forEach( element => {
        htmlDptos += '<option value="' + element.id + '">' + element.descripcion + '</option>';
    });

    $('#dptos').html(htmlDptos); 
    $('#dptos').change(obtenerCiudades);      
}


/**
 * Funcion ajax para obtener departamentos de un pais, quemado colombia
 */
var obtenerDepartamentos = function() {

    paisId = $('#countries').val(); 
        
    $.ajax({
        method: "GET",
        url: urlC + "departamentos/obtener",
        data: { paisId : paisId },
        success: function(respuesta) {
            if(respuesta.estado) {
                crearListaDptos(respuesta.data);
                crearListaCiudades(null);
            }                
        },
        error: function() {
            console.log('Error al obtener los departamentos');
        }
    });   
}

/**
 * Se crea la lista de paises con la información obtenida por ajax
 * @param {*} data 
 */
var crearListaPaises = function(data) {
    var htmlPaises = '<option value="">PAISES*</option>';

    data.forEach( element => {
        htmlPaises += '<option value="' + element.id + '">' + element.descripcion + '</option>';
    });

    $('#countries').html(htmlPaises);
    $('#countries').change(obtenerDepartamentos);
}

/**
 * Obtiene el listado de paises
 * @param {*} pais_id 
 */
var obtenerPaises = function() {
    $.ajax({
        method: "GET",
        url: urlC + "paises/obtener",
        success: function(respuesta) {
            if(respuesta.estado) {
                crearListaPaises(respuesta.data);
            }                
        },
        error: function() {
            console.log('Error al obtener los departamentos');
        }
    });
}

/**
 * Validar si se diligenció el formulario
 */
var validarCampos = function() {
    var mensaje = "";

    mensaje += $('#name').val() == "" ? '- El campo nombres es obligatorio.<br>' : '';
    mensaje += $('#lastnames').val() == "" ? '- El campo apellidos es obligatorio.<br>' : '';
    mensaje += $('#identification').val() == "" ? '- El campo identificación es obligatorio.<br>' : '';
    mensaje += $('#email').val() == "" ? '- El campo email es obligatorio.<br>' : '';
    mensaje += $('#dptos').val() == "" ? '- El campo departamentos es obligatorio.<br>' : '';
    mensaje += $('#cities').val() == "" ? '- El campo ciudades es obligatorio.<br>' : '';
    mensaje += $('#direction').val() == "" ? '- El campo dirección es obligatorio.<br>' : '';
    mensaje += $('#cellphone').val() == "" ? '- El campo celular es obligatorio.<br>' : '';

    return mensaje;
}

/**
 * Ejecuta el llamado ajax para almacenar cliente
 */
var suscribirse = function() {
    
    //se valida que se hayan ingresado todos los campos de manera correcta
    var mensaje = validarCampos();

    if(mensaje == "") {
        $('#subscribe').hide();
        
        showLoader();

        var identificacion = $('#identification').val();
        var email = $('#email').val();
        var ciudad = $('#cities').val();
        var direccion = $('#direction').val();
        var celular = $('#cellphone').val();
        var telefono = $('#telephone').val();
        var nombres = $('#name').val();
        var apellidos = $('#lastnames').val();

        $.ajax({
            method: "GET",
            url: urlC + "usuarios/crear",
            data: {
                identificacion: identificacion,
                email: email,
                ciudad: ciudad,
                direccion: direccion,
                celular: celular,
                telefono: telefono,
                tipoPersona: '1',
                perfiles: '2',
                nombres: nombres,
                apellidos: apellidos
            },
            success: function(respuesta) {
                if(!respuesta.estado){
                    bootbox.alert(respuesta.mensaje, function(){
                        $('#subscribe').show();
                        hideLoader();
                    });
                } else if (respuesta.estado) {
                    hideLoader();
                    bootbox.alert('El usuario ha sido creado de forma correcta.', function(){
                        window.location.href = urlEC + "login.php";
                    });
                }                
            },
            error: function() {
                console.log('Error crear el usuario.');
            }
        });
     
    } else {
        bootbox.alert(mensaje);  
    }
}

$( document ).ready(function() {
    obtenerPaises(); 
    
    // Se setean los select con datos genericos
    $('#dptos').html('<option value="">DEPARTAMENTOS*</option>'); 
    $('#cities').html('<option value="">CIUDADES*</option>'); 
});