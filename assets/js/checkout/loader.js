// Función para mostrar el loader
function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

// Función para ocultar el loader
function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

$( document ).ready(function() { 
    hideLoader();
});