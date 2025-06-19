const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeModalBtn = document.getElementById("cerrar-modal");

cards.forEach(card => {
    card.addEventListener("click", () => {
    const isTrue = card.getAttribute("data-truth") === "true";

    if (isTrue) {
        card.classList.add("correct");
        card.computedStyleMap.borderColor =" #4caf50" ;
    } else {
        const correctInfo = card.getAttribute("data-correct");
        modalText.textContent = correctInfo;
        modal.style.display = "flex";
        card.classList.add("incorrect");
        card.style.borderColor = "#f44336" ;
    }
  });  
});
closeModalBtn.addEventListener("click", () => { 
    modal.style.display = "none" ;
});
window.addEventListener("click", (event) => {
    if (event.target === modal) {
    modal.style.display = "none" ;
}
});
