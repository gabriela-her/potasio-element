// Responsive Nav
function responsiveNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
    // Cambio del icono en función de si el nav está abierto o cerrado
    let icon = document.getElementsByClassName("fa-bars")[0];
    if (icon) {
        icon.className = icon.className.replace("fa-bars", "fa-close");
    }
    else {
        icon = document.getElementsByClassName("fa-close")[0];
        icon.className = icon.className.replace("fa-close", "fa-bars");
    }
}
document.getElementById("que-soy-li-link").style.backgroundColor = "rgba(250, 222, 82, 0.5)";
document.getElementById("donde-estoy-li-link").style.backgroundColor = "rgba(201, 227, 172, 0.5)";
document.getElementById("mi-importancia-li-link").style.backgroundColor = "rgba(97, 179, 35, 0.5)";
document.getElementById("curiosidades-li-link").style.backgroundColor = "rgba(67, 100, 54, 0.5)";
document.getElementById("actualidad-li-link").style.backgroundColor = "rgba(248, 140, 140, 0.5)";
document.getElementById("creadoras-li-link").style.backgroundColor = "rgba(250, 222, 82, 0.5)";


// Código antiguo que gira las 3 barras del menú de navegación al hacer click:
// const rotateBars = document.getElementById("fa-bars-menu");
// rotateBars.addEventListener("click", function () {
//    const openMenu = document.getElementById("openMenu");
//    if (openMenu.style.transform === "rotate(90deg)") {
//        openMenu.style.transform = "rotate(180deg)";
//    } else {
//        openMenu.style.transform = "rotate(90deg)";
//    }
//  })

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