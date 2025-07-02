// Carousel
let slideIndex = 1;
showSlides(slideIndex); // Cuando se muestra el carousel se sitúa en su index que se define como 1, la primera fruta

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n); // Se mueve hacia el item anterior o al siguiente
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n); // Se mueve hacia el item con número n
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-item");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Sólo muestra un carousel-item y oculta los demás
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" carousel-item-active", ""); // Muestra en color verde para resaltar solo el doc del carousel-item que está activo
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " carousel-item-active"; // Añade la clase para resaltar el dot del carousel-item activo
}

// Scroll 
function scrollDown1() {
  const element = document.getElementById("carousel");
  element.scrollIntoView();
}
function scrollDown2() {
  const element = document.getElementById("foodCards");
  element.scrollIntoView();
}

// Highlight the active link in the navigation bar
document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('nav.topnav a').forEach(function (link) {
                if (link.href === window.location.href) {
                    link.classList.add('active');
                    if (link.parentElement) {
                        link.parentElement.classList.add('active');
                    }
                }
            });
        });