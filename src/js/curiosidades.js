document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");// Todas las tarjetas del juego
    const timerElement = document.getElementById("timer");  // Elemento que muestra el tiempo restante
    const scoreElement = document.getElementById("score");  // Elemento que muestra la puntuación actual
    const startButton = document.getElementById("inicio-btn");  // Botón para iniciar el juego
    const cardsContainer = document.querySelector(".cards-container"); // Contenedor de las tarjetas
    const statsSection = document.querySelector(".game-stats");  // Sección que muestra estadísticas (puntaje y tiempo)
    const restartButton = document.getElementById("reiniciar-button"); // Botón para reiniciar el juego
    const soundCorrect = new Audio("../public/sounds/potasiosound.mp3"); // Sonido para respuesta correcta
    const soundIncorrect = new Audio("../public/sounds/error.mp3");  // Sonido para respuesta incorrecta
    const verMemeBtn = document.getElementById("ver-meme-btn"); // Botón para mostrar video/meme
    const videoModal = document.getElementById("video-modal"); // Modal que contiene el video
    const cerrarVideoBtn = document.getElementById("cerrar-video"); // Botón para cerrar el modal de video
    const potasioVideo = document.getElementById("potasio-video"); // Elemento video

    // Variables de control del juego
    let timeLeft = 30; // Tiempo inicial (en segundos)
    let score = 0; // Puntuación inicial
    let timerInterval; // Variable que guardará el intervalo del temporizador para poder detenerlo
    let correctClicks = 0; // Contador de respuestas correctas
    let incorrectClicks = 0; // Contador de respuestas incorrectas

    // Función que inicia el juego
    function startGame() {
        // Mostrar la sección de tarjetas y estadística
        cardsContainer.style.display = "grid"; // Cambia display para mostrar tarjetas
        statsSection.style.display = "flex"; // Muestra sección con puntos y tiempo
        startButton.style.display = "none"; // Oculta botón iniciar para evitar reiniciar sin querer
        restartButton.style.display = "block"; // Muestra botón reiniciar
        // Reiniciar contadores y puntaje
        correctClicks = 0;
        incorrectClicks = 0;
        score = 0;
        timeLeft = 30;
         // Actualizar el texto visible de puntos y tiempo
        scoreElement.textContent = "Puntos: 0";
        timerElement.textContent = "Tiempo: 30";
         // Quitar clase que indica tiempo bajo (por si venía de una partida anterior)
        timerElement.classList.remove("time-low");

         // Limpiar clases de estado en cada tarjeta y volver a activar el evento click
        cards.forEach(card => {
            card.classList.remove("correct", "incorrect", "clicked"); // Limpia estilos de aciertos y errores
            card.addEventListener("click", handleCardClick); // Reactiva evento click en cada tarjeta
        });
         // Crear intervalo que descuenta 1 segundo cada 1000 milisegundos (1 segundo)
        timerInterval = setInterval(() => {
            timeLeft--;   // Resta 1 al tiempo restante
            timerElement.textContent = `Tiempo: ${timeLeft}`;  // Actualiza texto de tiempo

             // Si quedan 10 segundos o menos, cambia el estilo para advertir al jugador 
            if (timeLeft <= 10) {
                timerElement.classList.add("time-low");
            }
            // Cuando el tiempo llega a 0 se termina el juego
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Detiene el temporizador
                endGame();  // Llama a función para terminar juego
            }
        }, 1000);  // 1000 milisegundos = 1 segundo
    }
     // Función que maneja el evento click sobre cada tarjeta
    function handleCardClick(e) {
        const card = e.currentTarget;   // Tarjeta clickeada
        const isTrue = card.dataset.truth === "true"; // Lee atributo data-truth para saber si es correcta

        // Evita que la misma tarjeta pueda clickeada dos veces
        if (card.classList.contains("clicked")) return; // Evita doble clic

        card.classList.add("clicked"); // Marca la tarjeta como clickeada

        if (isTrue) {
            // Si la tarjeta es correcta
            card.classList.add("correct"); // Añade clase para resaltar como correcto
            correctClicks++;  // Aumenta contador de respuestas correctas

             // Calcula la puntuación: base depende de aciertos, penaliza errores, y limita a máximo 10
            let baseScore = Math.min(correctClicks * (10 / 3), 10);
            score = Math.max(baseScore - (incorrectClicks * 2), 0);

             // Actualiza el puntaje en pantalla con dos decimales
            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;
             // Actualiza el puntaje en pantalla con dos decimales
            scoreElement.classList.add("score-increase");
            setTimeout(() => scoreElement.classList.remove("score-increase"), 500);

            soundCorrect.play(); // Reproduce sonido correcto

            // Reproduce sonido correcto
            if (correctClicks === 3) {
                // Desactiva eventos click para evitar más interaccione
                cards.forEach(c => c.removeEventListener("click", handleCardClick));

                // Muestra modal felicitando, y al cerrarlo termina el juego
                showModal("¡Correcto!", "¡Bien hecho!", () => {
                    endGame();
                });
            } else {
                // Si aún no termina, muestra modal felicitando sin cerrar el juego
                showModal("¡Correcto!", "¡Bien hecho!");
            }

        } else {
            // Si la tarjeta es incorrecta
            card.classList.add("incorrect");  // Añade clase para resaltar error
            incorrectClicks++;   // Aumenta contador de errores

            // Recalcula puntuación con penalización
            let baseScore = Math.min(correctClicks * (10 / 3), 10);
            score = Math.max(baseScore - (incorrectClicks * 2), 0);

            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;

            // Obtiene mensaje de corrección específico o usa uno por defecto
            const correction = card.dataset.correct || "Esta afirmación es incorrecta.";
            // Muestra modal con mensaje de error
            showModal("Incorrecto", correction);
            soundIncorrect.play(); // Sonido error

        }
    }
     // Función que termina el juego (por tiempo o por haber acertado)
    function endGame() {
        clearInterval(timerInterval); // Detiene temporizador
         // Muestra alerta con puntuación final
        alert("¡Juego terminado! Tu puntuación fue: " + score);

        // Desactiva todos los eventos click para evitar más interacción
        cards.forEach(card => {
            card.removeEventListener("click", handleCardClick);
        });
    }

     // Función que muestra un modal con mensaje y título
    // Permite pasar una función callback para ejecutar al cerrar el modal
    function showModal(title, text, onClose) {
        const modal = document.getElementById("modal"); // Modal principal
        const modalTitle = document.getElementById("modal-title"); // Título del modal
        const modalText = document.getElementById("modal-text"); // Texto del modal
        const cerrarModalBtn = document.getElementById("cerrar-modal"); // Botón para cerrar modal

        // Actualiza contenido del modal
        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.style.display = "flex"; // Muestra el modal

         // Función para cerrar modal
        function handleClose() {
            modal.style.display = "none";  // Oculta modal
            cerrarModalBtn.removeEventListener("click", handleClose);  // Limpia event listener para evitar duplicados
            if (onClose) onClose();   // Ejecuta callback si fue pasado
        }

        cerrarModalBtn.addEventListener("click", handleClose);  // Listener para cerrar modal al hacer clic en botón
    }

     // Evento para botón reiniciar
    restartButton.addEventListener("click", () => {
        clearInterval(timerInterval); // Detiene temporizador actual
        correctClicks = 0;
        incorrectClicks = 0;
        score = 0;
        startGame(); // Inicia juego de nuevo
    });

    // Evento para botón iniciar juego
    startButton.addEventListener("click", startGame);

    // Evento para abrir modal de video y reproducir video
    verMemeBtn.addEventListener("click", () => {
        videoModal.style.display = "block"; // Muestra modal de video
        potasioVideo.currentTime = 0; // Rebobina video a inicio
        potasioVideo.play();  // Reproduce video
    });
    // Evento para cerrar modal de video y pausar video
    cerrarVideoBtn.addEventListener("click", () => {
        potasioVideo.pause(); // Pausa video
        videoModal.style.display = "none"; // Oculta modal
    });
    // Evento para cerrar modal de video si se hace click fuera del video (en el fondo del modal)
    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            potasioVideo.pause();
            videoModal.style.display = "none";
        }
    });

    // Añadir listener a las cards al cargar la página para que estén activas cuando se inicia el juego
    cards.forEach(card => {
        card.addEventListener("click", handleCardClick);
    });
});