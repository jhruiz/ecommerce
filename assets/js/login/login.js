/**
 * Funcion logout
 */
function logoutUser() {
    bootbox.confirm("¿Está seguro que desea salir?", function(result){ 
        if( result ) {
            localStorage.clear();
            location.reload();
        }
    });
}

/**
 * Valida si se diligenció correctamente el formulario
 * @param {*} usuario 
 * @param {*} password 
 * @returns 
 */
var validarLogin = function(usuario, password) {

    if(usuario == "" || password == "") {
        return false;
    }

    return true;
}

/**
 * Funcion para realizar el login del usuario cliente
 * En uso
 */
function loginUser() {
    var user = $('#user').val();
    var password = $('#password').val();

    if(validarLogin(user, password)) {
        $.ajax({
            method: "POST",
            xhrFields: {
                withCredentials: true
            },
            url: urlC + "cliente/login",
            data: { user: user, password: password },
            success: function(respuesta) {
                if( respuesta.estado ) {
                    if( respuesta.data.estado != '1' ) {
                        notificarUsuario("El usuario se encuentra inactivo.", "info");
                    } else {

                        notificarUsuario(respuesta.mensaje, "success");
                        
                        localStorage.setItem('email', respuesta.data.email);
                        localStorage.setItem('estado', respuesta.data.estado_id);
                        localStorage.setItem('id', respuesta.data.id);
                        localStorage.setItem('identificacion', respuesta.data.nit);
                        localStorage.setItem('nombre', respuesta.data.nombre);
                        localStorage.setItem('celular', respuesta.data.celular);
                        localStorage.setItem('direccion', respuesta.data.direccion);
                        localStorage.setItem('ciudad', respuesta.data.ciudad);
                        localStorage.setItem('empresa', respuesta.data.empresa_id);

                        window.location.href = 'index.php';
                    }
                } else {
                    notificarUsuario(respuesta.mensaje, "info");
                }
                
            },
            error: function() {
                notificarUsuario("Se produjo un error. Por favor, inténtelo nuevamente.", "info");
            }
          })        

    } else {
        notificarUsuario("El usuario y/o contraseña no son correctos.", "info");
    }
}

/**
 * Valida el estado de login del cliente
 */
var validarEstadoLogin = function() {
    var cliente = localStorage.getItem('id');
    
    if(cliente != null) {
        $('#form-login').html('');

        var nlHtml = "";
    
        nlHtml += '<div class="col-lg-12 col-md-12 col-sm-12">';
        nlHtml += '<fieldset>';
        nlHtml += '<p>El usuario ' + localStorage.getItem('nom_benf') + ' ya se encuentra logueado.</p>';
        nlHtml += '</fieldset>';
        nlHtml += '</div>';
        nlHtml += '<div class="col-lg-12">';
        nlHtml += '<fieldset>';
        nlHtml += '<a href="#" class="btn btn-primary" onclick="logoutUser()">Salir</a>';
        nlHtml += '</fieldset>';
        nlHtml += '</div>';
        $('#form-login').html(nlHtml);    
    }

}

$( document ).ready(function() {       
    validarEstadoLogin();
});