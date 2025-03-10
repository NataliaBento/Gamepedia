document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('navMenu').classList.toggle('active');
});

// Esconder e mostrar os elementos corretamente
function adjustMenu() {
    if (window.innerWidth >= 768) {
        document.querySelector('.header-right').style.display = "none"; 
        document.getElementById('mobileSearch').classList.remove('hidden'); 
        document.getElementById('mobileProfile').classList.remove('hidden'); 
    } else {
        document.querySelector('.header-right').style.display = "flex"; 
        document.getElementById('mobileSearch').classList.add('hidden'); 
        document.getElementById('mobileProfile').classList.add('hidden'); 
    }
}

window.addEventListener("resize", adjustMenu);
window.addEventListener("load", adjustMenu);



