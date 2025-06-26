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

    verMemeBtn.addEventListener("click", () => {
        videoModal.style.display = "block";
        video.currentTime = 0;
        video.play();
    });

    cerrarVideo.addEventListener("click", () => {
        videoModal.style.display = "none";
        video.pause();
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
    });

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            card.classList.add("clicked");
            setTimeout(() => {
             card.classList.remove("clicked");         
            }, 300);

             const isTrue = card.getAttribute("data-truth") === "true";
             const isExplosionCard = card.textContent.includes("reacciona con el agua");

            if (isTrue) {
             card.classList.add("correct");
             card.style.borderColor =" #4caf50" ;
             modalTitle.textContent = "¡CORRECTO!";
             modalText.textContent = "¡Bien hecho!";
             console.log("Ahora tiene que sonar")
            modal.style.display = "flex";
            correctSound.currentTime = 0;
            correctSound.play();
            confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
            });
             } else {
            const correctInfo = card.getAttribute("data-correct");
            card.classList.add("incorrect");
            modalTitle.textContent = "¡Incorrecto!";
            modalText.textContent = correctInfo;
            modal.style.display = "flex";
            card.style.borderColor = "#f44336" ;
            incorrectSound.currentTime = 0;
            incorrectSound.play();
        }
     });  
    });
    closeModalBtn.addEventListener("click", ()   => { 
    modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
    if (event.target === modal) {
    modal.style.display = "none" ;
        }
    });
});