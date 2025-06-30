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

    function startGame() {
        cardsContainer.style.display = "grid";
        statsSection.style.display = "flex";
        startButton.style.display = "none";
        restartButton.style.display = "block";
        correctClicks = 0;

        score = 0;
        timeLeft = 30;
        scoreElement.textContent = "Puntos: 0";
        timerElement.textContent = "Tiempo: 30";
        timerElement.classList.remove("time-low");

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

    function endGame() {
        alert("¡Tiempo terminado! Tu puntuación fue: " + score);
        cards.forEach(card => {
            card.removeEventListener("click", handleCardClick);
        });
    }

    function handleCardClick(e) {
        const card = e.currentTarget;
        const isTrue = card.dataset.truth === "true";

        if (card.classList.contains("clicked")) return;

        if (correctClicks >= 3 && !isTrue){
            showModal("¡El juego ha terminado!", "Ya seleccionaste las 3 respuestas correctas.");
            return;
        }

        card.classList.add("clicked");

        if (isTrue) {
            card.classList.add("correct");
            correctClicks++;

            score = Math.min(correctClicks * (10 / 3), 10);

            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;
            scoreElement.classList.add("score-increase");
            setTimeout(() => scoreElement.classList.remove("score-increase"), 500);

            showModal("¡Correcto!", "¡Bien hecho!");
            soundCorrect.play();

            if (correctClicks === 3) {
                cards.forEach(c => {
                    c.removeEventListener("click", handleCardClick);
                });
            }

        } else {
            card.classList.add("incorrect");

            score = Math.max(score - 2, 0);
            scoreElement.textContent = `Puntos: ${score.toFixed(2)}`;

            const correction = card.dataset.correct || "Esta afirmación es incorrecta.";
            showModal("Incorrecto", correction);
            soundIncorrect.play();
        }
    }

    function showModal(title, text) {
        const modal = document.getElementById("modal");
        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-text").textContent = text;
        modal.style.display = "flex";
    }

    function closeModal() {
        document.getElementById("modal").style.display = "none";
    }

    function resetGame() {
        clearInterval(timerInterval);
        cards.forEach(card => {
            card.classList.remove("correct", "incorrect", "clicked");
            card.addEventListener("click", handleCardClick); // Re-activar clicks
        });
        startGame();
    }

    // Añadir listeners una sola vez al cargar la página
    cards.forEach(card => {
        card.addEventListener("click", handleCardClick);
    });

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", resetGame);
    document.getElementById("cerrar-modal").addEventListener("click", closeModal);

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

});
