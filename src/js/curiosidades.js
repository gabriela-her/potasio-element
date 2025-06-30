document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const timerElement = document.getElementById("timer");
    const scoreElement = document.getElementById("score");
    const startButton = document.getElementById("inicio-btn");
    const cardsContainer = document.querySelector(".cards-container");
    const statsSection = document.querySelector(".game-stats");
    const restartButton = document.getElementById("reiniciar-button");
    const soundCorrect = new Audio("../public/sounds/potasiosound.mp3"); 
    const soundIncorrect = new Audio("../public/sounds/error.mp3");
    const verMemeBtn = document.getElementById("ver-meme-btn");
    const videoModal = document.getElementById("video-modal");
    const cerrarVideoBtn = document.getElementById("cerrar-video");
    const potasioVideo = document.getElementById("potasio-video");

    let timeLeft = 30;
    let score = 0;
    let timerInterval;
    let correctClicks = 0;
    let incorrectClicks = 0;

    function startGame() {
        cardsContainer.style.display = "grid";
        statsSection.style.display = "flex";
        startButton.style.display = "none";
        restartButton.style.display = "block";
        correctClicks = 0;
        incorrectClicks = 0;
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = "Puntos: 0";
        timerElement.textContent = "Tiempo: 30";
        timerElement.classList.remove("time-low");

        // Reactivar clicks y limpiar estilos de tarjetas
        cards.forEach(card => {
            card.classList.remove("correct", "incorrect", "clicked");
            card.addEventListener("click", handleCardClick);
        });

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tiempo: ${timeLeft}`;
            if (timeLeft <= 10) {
                timerElement.classList.add("time-low");
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function handleCardClick(e) {
        const card = e.currentTarget;
        const isTrue = card.dataset.truth === "true";

        if (card.classList.contains("clicked")) return; // Evita doble clic

        card.classList.add("clicked");

        if (isTrue) {
            card.classList.add("correct");
            correctClicks++;

            let baseScore = Math.min(correctClicks * (10 / 3), 10);
            score = Math.max(baseScore - (incorrectClicks * 2), 0);

            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;
            scoreElement.classList.add("score-increase");
            setTimeout(() => scoreElement.classList.remove("score-increase"), 500);

            soundCorrect.play();

            if (correctClicks === 3) {
                // Desactivar clicks
                cards.forEach(c => c.removeEventListener("click", handleCardClick));

                showModal("¡Correcto!", "¡Bien hecho!", () => {
                    endGame();
                });
            } else {
                showModal("¡Correcto!", "¡Bien hecho!");
            }

        } else {
            card.classList.add("incorrect");
            incorrectClicks++;

            let baseScore = Math.min(correctClicks * (10 / 3), 10);
            score = Math.max(baseScore - (incorrectClicks * 2), 0);

            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;

            const correction = card.dataset.correct || "Esta afirmación es incorrecta.";
            showModal("Incorrecto", correction);
            soundIncorrect.play();
        }
    }

    function endGame() {
        clearInterval(timerInterval);
        alert("¡Juego terminado! Tu puntuación fue: " + score);

        cards.forEach(card => {
            card.removeEventListener("click", handleCardClick);
        });
    }

    function showModal(title, text, onClose) {
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modal-title");
        const modalText = document.getElementById("modal-text");
        const cerrarModalBtn = document.getElementById("cerrar-modal");

        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.style.display = "flex";

        function handleClose() {
            modal.style.display = "none";
            cerrarModalBtn.removeEventListener("click", handleClose);
            if (onClose) onClose();
        }

        cerrarModalBtn.addEventListener("click", handleClose);
    }

    // Botón reiniciar
    restartButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        correctClicks = 0;
        incorrectClicks = 0;
        score = 0;
        startGame();
    });

    // Botón iniciar
    startButton.addEventListener("click", startGame);

    // Modal video y controles
    verMemeBtn.addEventListener("click", () => {
        videoModal.style.display = "block";
        potasioVideo.currentTime = 0;
        potasioVideo.play();
    });

    cerrarVideoBtn.addEventListener("click", () => {
        potasioVideo.pause();
        videoModal.style.display = "none";
    });

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