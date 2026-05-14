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
    crearListaCiudades(null);
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

    if(data != null){
        data.forEach( element => {
            htmlDptos += '<option value="' + element.id + '">' + element.descripcion + '</option>';
        });
    }

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

    if ($('#name').val() == "") mensaje += 'Nombres obligatorios.<br>';
    if ($('#lastnames').val() == "") mensaje += 'Apellidos obligatorios.<br>';
    if ($('#identification').val() == "") mensaje += 'Identificación obligatoria.<br>';
    if ($('#email').val() == "") mensaje += 'Email obligatorio.<br>';
    if ($('#cities').val() == "") mensaje += 'Selecciona una ciudad.<br>';
    if ($('#direction').val() == "") mensaje += 'Dirección obligatoria.<br>';
    if ($('#cellphone').val() == "") mensaje += 'Celular obligatorio.<br>';

    var pass1 = $('#password').val();
    var pass2 = $('#password_two').val();

    if (pass1 === "" || pass2 === "") {
        mensaje += 'Ingresa y confirma tu contraseña.<br>';
    } else if (pass1.length < 6) {
        mensaje += 'La contraseña es muy corta (min 6).<br>';
    } else if (pass1 !== pass2) {
        mensaje += 'Las contraseñas no coinciden.<br>';
    }

    return mensaje;
}

/**
 * Ejecuta el llamado ajax para almacenar cliente
 */
var suscribirse = function() {
    var mensajeError = validarCampos();

    if(mensajeError == "") {
        $('#subscribe').hide();
        // Asumo que tienes una función showLoader() o similar
        if (typeof showLoader === "function") showLoader();

        var datos = {
            identificacion: $('#identification').val(),
            email: $('#email').val(),
            ciudad: $('#cities').val(),
            direccion: $('#direction').val(),
            celular: $('#cellphone').val(),
            telefono: $('#telephone').val(),
            nombres: $('#name').val(),
            apellidos: $('#lastnames').val(),
            password: $('#password').val(),
            tipoPersona: '1',
            perfiles: '2'
        };

        $.ajax({
            method: "POST",
            url: urlC + "cliente/crearactualizar",
            xhrFields: { withCredentials: true },
            data: datos,
            success: function(respuesta) {
                if (typeof hideLoader === "function") hideLoader();

                if(!respuesta.estado){
                    // Notificación de error
                    notificarUsuario(respuesta.mensaje, 'error');
                    $('#subscribe').show();
                } else {
                    // Notificación de éxito
                    notificarUsuario(respuesta.mensaje || '¡Bienvenido! Registro completado.', 'success');
                    
                    // Redirigir después de que el usuario vea el brindis (toast)
                    setTimeout(function() {
                        window.location.href = urlEC + "login.php";
                    }, 2200); 
                }                
            },
            error: function() {
                if (typeof hideLoader === "function") hideLoader();
                $('#subscribe').show();
                notificarUsuario('Error de conexión con el servidor', 'error');
            }
        });
     
    } else {
        // En lugar de bootbox, usamos tu notificarUsuario
        // Nota: Como es un toast, si el mensaje es muy largo, podrías considerar 
        // usar un Swal.fire normal o limpiar los saltos <br>
        notificarUsuario(mensajeError, 'warning');
    }
}

$( document ).ready(function() {
    $('#nombreEmpresaSuscription').text(nombreEmpresa);
    obtenerPaises(); 
    
    // Se setean los select con datos genericos
    $('#countries').html('<option value="">PAISES*</option>'); 
    $('#dptos').html('<option value="">DEPARTAMENTOS*</option>'); 
    $('#cities').html('<option value="">CIUDADES*</option>'); 
});