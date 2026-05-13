$( document ).ready(function() { 


    $('#about_us_titulo').text(about_us_titulo);
    $('#about_us_descripcion').text(about_us_descripcion);
    $('#donde_encontrarnos').text(donde_encontrarnos);

    $('#map-marker').text(direccion);
    $('#schedule').text(horario);
    $('#saleemail').text(correoventas);

    document.getElementById('pill-facebook').href = about_us_facebook;
    document.getElementById('pill-instagram').href = about_us_instagram;
    document.getElementById('pill-linkedin').href = about_us_linkedin;
    document.getElementById('pill-youtube').href = about_us_youtube;

    document.getElementById('google-location').src = googleubicacion;
    
});