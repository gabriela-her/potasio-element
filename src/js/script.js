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
      alert("✅ ¡Correcto! Potasio es un metal alcalino.");
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
  // Limpiar estados visuales
  opciones.forEach(o => {
    o.classList.remove('seleccionado', 'correcto', 'incorrecto');
  });

  // Espera un pequeño tiempo para reiniciar, para evitar clics inmediatos
  setTimeout(() => {
    respondido = false;
  }, 10); // reinicia el estado para permitir otra selección
}
