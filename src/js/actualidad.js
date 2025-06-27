// Mostrar el formulario para ingresar correo
function mostrarFormulario() {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('burbuja').textContent = '¡Genial! Por favor escribe tu correo:';
  const opciones = document.querySelector('.opciones');
  if (opciones) opciones.style.display = 'none';
}

// Cambiar texto cuando el usuario dice no
function decirNo() {
  document.getElementById('burbuja').textContent = 'No hay problema, ¡gracias por visitar!';
  const opciones = document.querySelector('.opciones');
  if (opciones) opciones.style.display = 'none';
}

// Función para enviar correo (simulada)
function enviarCorreo() {
  const emailInput = document.getElementById('correo');
  if (!emailInput.checkValidity()) {
    alert('Por favor ingresa un correo válido.');
    return;
  }

  const correo = emailInput.value;
  mostrarNotificacion(`Gracias, ${correo} ha sido registrado.`);
  document.getElementById('burbuja').textContent = '¡Gracias por suscribirte!';
  document.getElementById('formulario').style.display = 'none';

  lanzarConfeti();
}

// Mostrar notificación bonita
function mostrarNotificacion(texto) {
  const noti = document.getElementById('notificacion');
  const mensaje = document.getElementById('mensaje-notificacion');

  mensaje.textContent = texto;
  noti.classList.add('mostrar');

  setTimeout(() => {
    noti.classList.remove('mostrar');
  }, 4000);
}

// Animación simple de confeti
function lanzarConfeti() {
  const canvas = document.getElementById('confeti');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confeti = [];
  const colors = ['#FFA500', '#FFD580', '#FFB347', '#CC8400'];

  for (let i = 0; i < 150; i++) {
    confeti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.1 + 0.05,
    });
  }

  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confeti.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();
    });
  }

  function update() {
    angle += 0.01;
    confeti.forEach((c, i) => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        confeti[i] = {
          x: Math.random() * canvas.width,
          y: -10,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngle: 0,
          tiltAngleIncrement: c.tiltAngleIncrement,
        };
      }
    });
  }

  function animar() {
    draw();
    update();
    requestAnimationFrame(animar);
  }

  animar();
}
