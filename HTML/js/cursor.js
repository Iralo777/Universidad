//■■■■■■■■■■■■■■■■■■■■■■■■■■■■ cursor ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
document.addEventListener("DOMContentLoaded", function() {
    // Cargar el sonido
    const sonidoHover = new Audio("sonido/magic.mp3");

    // Obtener todos los elementos con la clase imagen-con-brillo
    const imagenesConBrillo = document.querySelectorAll(".imagen-con-brillo");

    // Añadir el evento mouseenter para cada imagen
    imagenesConBrillo.forEach(imagen => {
        imagen.addEventListener("mouseenter", function() {
            sonidoHover.pause(); // Detener el sonido si ya está sonando
            sonidoHover.currentTime = 0; // Reiniciar el sonido
            sonidoHover.play(); // Reproducir el sonido al pasar el ratón
        });
    });
});




  
