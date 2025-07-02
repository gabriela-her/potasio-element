const opciones = document.querySelectorAll('.opciones li');
const mensajeError = document.getElementById('mensaje-error');
let respondido = false;

opciones.forEach(opcion => {
  opcion.addEventListener('click', () => {
    if (respondido) return;

    opcion.classList.add('seleccionado');
    respondido = true;

    if (opcion.dataset.respuesta === "correcta") {
      opcion.classList.add("correcto");
      setTimeout(() => {
        window.location.href = "/potasio-element/pages/que-soy.html";
      }, 500); // medio segundo para que se vea el mensaje/efecto
    } else {
      opcion.classList.add("incorrecto");
      mostrarError();
    }
  });
});

function mostrarError() {
  mensajeError.style.display = 'flex';

  setTimeout(() => {
    mensajeError.style.display = 'none';
  }, 1000);

  setTimeout(() => {
    reiniciarPregunta();
  }, 100);
}

function reiniciarPregunta() {
  opciones.forEach(o => {
    o.classList.remove('seleccionado', 'correcto', 'incorrecto');
  });

  setTimeout(() => {
    respondido = false;
  }, 10);
}

//Sonidos para los botones 


// Cargar sonidos
const sonidoHover = new Audio('./sonidos/button-index.mp3');
const sonidoError = new Audio('./sonidos/wrong-index.mp3');

window.addEventListener('DOMContentLoaded', () => {
  const opciones = document.querySelectorAll('.opciones li');
  const mensajeError = document.getElementById('mensaje-error');
  let respondido = false;

  // Hover: reproducir sonido al pasar el mouse por encima
  opciones.forEach(opcion => {
    opcion.addEventListener('mouseenter', () => {
      sonidoHover.currentTime = 0;
      sonidoHover.play();
    });
  });

  // Click: manejar selección y sonido de error si corresponde
  opciones.forEach(opcion => {
    opcion.addEventListener('click', () => {
      if (respondido) return;

      opcion.classList.add('seleccionado');
      respondido = true;

      if (opcion.dataset.respuesta === "correcta") {
        opcion.classList.add("correcto");

        setTimeout(() => {
          window.location.href = "/pages/que-soy.html";
        }, 500);
      } else {
        sonidoError.currentTime = 0;
        sonidoError.play();

        opcion.classList.add("incorrecto");
        mostrarError();
      }
    });
  });

  function mostrarError() {
    mensajeError.style.display = 'flex';

    setTimeout(() => {
      mensajeError.style.display = 'none';
    }, 1000);

    setTimeout(() => {
      reiniciarPregunta();
    }, 100);
  }

  function reiniciarPregunta() {
    opciones.forEach(o => {
      o.classList.remove('seleccionado', 'correcto', 'incorrecto');
    });

    setTimeout(() => {
      respondido = false;
    }, 10);
  }
});
