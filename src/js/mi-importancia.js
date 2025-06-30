document.addEventListener('DOMContentLoaded', () => {
  const disparador = document.getElementById('imagen-disparadora');
  const overlay = document.getElementById('overlay-mapa');
  const cerrar = document.getElementById('cerrar-mapa');
  const sonido = document.getElementById('sonido-clic');

  disparador.addEventListener('click', () => {
    overlay.style.display = 'flex';
    sonido.currentTime = 0;
    sonido.play();
  });

  cerrar.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  const form = document.getElementById('potassiumForm');
  const resultado = document.getElementById('resultado');
  const nivel = document.getElementById('nivel');
  const recomendacion = document.getElementById('recomendacion');
  const encuesta = document.querySelector('.evaluacion-potasio');

  const preguntas = document.querySelectorAll('fieldset.pregunta');
  const btnAnterior = document.getElementById('btnAnterior');
  const btnSiguiente = document.getElementById('btnSiguiente');
  const btnEnviar = document.getElementById('btnEnviar');

  let indiceActual = 0;

  function mostrarPregunta(index) {
    preguntas.forEach((f, i) => {
      f.classList.toggle('activa', i === index);
    });

    btnAnterior.disabled = index === 0;
    btnSiguiente.style.display = (index === preguntas.length - 1) ? 'none' : 'inline-block';
    btnEnviar.style.display = (index === preguntas.length - 1) ? 'inline-block' : 'none';
  }

  btnSiguiente.addEventListener('click', () => {
    const preguntaActual = preguntas[indiceActual];
    const seleccion = preguntaActual.querySelector('input[type="radio"]:checked');
    if (!seleccion) {
      alert('Por favor selecciona una opción para continuar.');
      return;
    }
    if (indiceActual < preguntas.length - 1) {
      indiceActual++;
      mostrarPregunta(indiceActual);
    }
  });

  btnAnterior.addEventListener('click', () => {
    if (indiceActual > 0) {
      indiceActual--;
      mostrarPregunta(indiceActual);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ultimaPregunta = preguntas[indiceActual];
    const seleccion = ultimaPregunta.querySelector('input[type="radio"]:checked');
    if (!seleccion) {
      alert('Por favor selecciona una opción para enviar el formulario.');
      return;
    }

    const frutas = form.elements["frutas"].value;
    const calambres = form.elements["calambres"].value;
    const ejercicio = form.elements["ejercicio"].value;
    const estimulantes = form.elements["estimulantes"].value;

    let score = 0;

    if (frutas === "media") score += 1;
    else if (frutas === "baja") score += 2;

    if (calambres === "si") score += 1;
    else if (calambres === "no") score += 2;

    if (ejercicio === "frecuente") score += 1;
    else if (ejercicio === "nunca") score += 2;

    if (estimulantes === "si") score += 2;

    resultado.classList.remove("oculto");
    encuesta.classList.add('oculto');

    if (score <= 2) {
      nivel.textContent = "Potasio y tú son besties";
      recomendacion.textContent = "Tu cuerpo te agradece esa dieta rica y balanceada. ¡Sigue así! 🌟🍌";
    } else if (score <= 5) {
      nivel.textContent = "¡Atención! Amistad con altibajos";
      recomendacion.textContent = "Más potasio y buenos hábitos te harán mejores amigos 🥦💚";
    } else {
      nivel.textContent = "Alerta roja: relación en crisis";
      recomendacion.textContent = "Inclúyelo más en tu dieta. Él te perdona 🍌🥺💥";
    }

    resultado.scrollIntoView({ behavior: "smooth" });
  });

  // Mostrar la primera pregunta al cargar
  mostrarPregunta(indiceActual);

  // Volver al inicio del cuestionario
  document.getElementById('btnVolverInicio').addEventListener('click', () => {
    resultado.classList.add('oculto');
    encuesta.classList.remove('oculto');

    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.checked = false);

    indiceActual = 0;
    mostrarPregunta(indiceActual); // 🔧 Esta línea es clave
  });
});
