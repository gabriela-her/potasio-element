document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeModalBtn = document.getElementById("cerrar-modal");
    const correctSound = new Audio("../public/sounds/potasiosound.mp3");
    const incorrectSound = new Audio("../public/sounds/error.mp3");
    incorrectSound.load();
    const reiniciarButton = document.getElementById("reiniciar-button");
    const verMemeBtn = document.getElementById("ver-meme-btn");
    const videoModal = document.getElementById("video-modal");
    const cerrarVideo = document.getElementById("cerrar-video");
    const video = document.getElementById("potasio-video");
    const scoreDisplay = document.getElementById("score");

    let time = 30;
    let interval;
    let points = 0;
    let successes = 0;
    let errores = 0;
    const maxErrores = 2;
    const totalSuccesses = document.querySelectorAll('[data-truth="true"]').length;

    function actualizarPuntuacion() {
        scoreDisplay.textContent = `Puntuación: ${points.toFixed(1)}`;
        scoreDisplay.classList.add("score-increase");
        setTimeout(() => {
            scoreDisplay.classList.remove("score-increase");
        }, 400);
    }

    function iniciarTemporizador() {
        const timer = document.getElementById("timer");
        timer.textContent = `Tiempo: ${time}`;
        timer.classList.remove("time-low");

        interval = setInterval(() => {
            time--;
            timer.textContent = `Tiempo: ${time}`;
            if (time <= 10) {
                timer.classList.add("time-low");
            }
            if (time <= 0) {
                clearInterval(interval);
                finishGame("¡Tiempo agotado!");
            }
        }, 1000);
    }

    function finishGame(message) {
        modalTitle.textContent = message;
        modalText.textContent = `Tu puntuación fue: ${points.toFixed(1)}`;
        modal.style.display = "flex";
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    }

    verMemeBtn.addEventListener("click", () => {
        videoModal.style.display = "block";
        video.currentTime = 0;
        video.play();
    });

    cerrarVideo.addEventListener("click", () => {
        videoModal.style.display = "none";
        video.pause();
        video.currentTime = 0;
    });

    window.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = "none";
            video.pause();
        }
    });

    reiniciarButton.addEventListener("click", () => {
        cards.forEach(card => {
            card.classList.remove("correct", "incorrect");
            card.style.borderColor = "";
        });

        modal.style.display = "none";
        clearInterval(interval);
        time = 30;
        points = 0;
        actualizarPuntuacion();
        successes = 0;
        errores = 0;
        iniciarTemporizador();
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("correct") || card.classList.contains("incorrect")) return;
            if (errores >= maxErrores) return;
            card.classList.add("clicked");
            setTimeout(() => {
                card.classList.remove("clicked");
            }, 300);

            const isTrue = card.getAttribute("data-truth") === "true";

            if (isTrue) {
                card.classList.add("correct");
                points += 10 / totalSuccesses;
                successes++;
                actualizarPuntuacion();
                card.style.borderColor = "#4caf50";
                modalTitle.textContent = "¡CORRECTO!";
                modalText.textContent = "¡Bien hecho!";
                modal.style.display = "flex";
                correctSound.currentTime = 0;
                correctSound.play();
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                if (successes === totalSuccesses) {
                    clearInterval(interval);
                    finishGame("¡Ganaste!");
                }
            } else {
                errores++;
                points = Math.max(0, points - 2);
                actualizarPuntuacion();
                const correctInfo = card.getAttribute("data-correct");
                card.classList.add("incorrect");
                modalTitle.textContent = "¡Incorrecto!";
                modalText.textContent = correctInfo || "Respuesta incorrecta.";
                modal.style.display = "flex";
                card.style.borderColor = "#f44336";
                incorrectSound.currentTime = 0;
                incorrectSound.play();
            }

            if (errores >= maxErrores) {
                clearInterval(interval);
                finishGame("¡Se acabaron los intentos!");
            }
        });
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    iniciarTemporizador();
});
