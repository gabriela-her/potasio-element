const cards = document.querySelectorAll(".card");
const button = document.getElementById("siguiente");
let currentIndex = 0;

// Girar tarjeta al click
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Cambiar tarjeta visible al click del botón
button.addEventListener("click", () => {
  cards[currentIndex].classList.remove("visible");
  cards[currentIndex].classList.remove("flipped"); // para que no quede volteada

  currentIndex = (currentIndex + 1) % cards.length;

  cards[currentIndex].classList.add("visible");
});
