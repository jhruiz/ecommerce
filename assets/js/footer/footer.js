$( document ).ready(function() { 
    // Seteo redes
    document.getElementById('link-facebook').href = facebook;
    document.getElementById('link-instagram').href = instagram; 
    document.getElementById('link-linkedin').href = linkedin;
    document.getElementById('link-youtube').href = youtube;

    // Seteo contacto
    $('#li-email span').text(correo);
    $('#li-telefono span').text(celular);
    $('#li-direccion span').text(ubicacion);
});