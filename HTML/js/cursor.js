//■■■■■■■■■■■■■■■■■■■■■■■■■■■■ cursor ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //Cursor Background Tracking
    const tokenBgCursor = document.querySelector('.blob-cursor__bg');
    document.addEventListener('mousemove', e => {
        tokenBgCursor.setAttribute("style", "top: " + (e.pageY - 100) + "px; left: " + (e.pageX - 100) + "px;")
    });
    const triggerCursor = document.querySelector('.show-cursor--bg');
    const cursorBg = document.querySelector('.blob-cursor__bg');
    triggerCursor.addEventListener('mouseenter', () => {
        cursorBg.classList.remove('hide');
    });
    triggerCursor.addEventListener('mouseleave', () => {
        cursorBg.classList.add('hide');
    });


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■ sonido enlaces ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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




  
