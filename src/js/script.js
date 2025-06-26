 // Responsive Nav
 function responsiveNav() {
            let x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
document.getElementById("que-soy-li-link").style.backgroundColor="rgba(250, 222, 82, 0.5)";
document.getElementById("donde-estoy-li-link").style.backgroundColor="rgba(201, 227, 172, 0.5)";
document.getElementById("mi-importancia-li-link").style.backgroundColor="rgba(97, 179, 35, 0.5)";
document.getElementById("curiosidades-li-link").style.backgroundColor="rgba(67, 100, 54, 0.5)";
document.getElementById("actualidad-li-link").style.backgroundColor="rgba(248, 140, 140, 0.5)";
document.getElementById("creadoras-li-link").style.backgroundColor="rgba(250, 222, 82, 0.5)";



const rotateBars = document.getElementById("fa-bars-menu");
rotateBars.addEventListener("click", function() {
    const openMenu = document.getElementById("openMenu");
    if (openMenu.style.transform === "rotate(90deg)") {
        openMenu.style.transform = "rotate(180deg)";
    } else {
        openMenu.style.transform = "rotate(90deg)";
    }
});