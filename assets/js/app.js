// Función para cargar contenido en el main
function loadPage(page) {
    const url = `views/${page}.html?v=${new Date().getTime()}`; // Agregar un parámetro único
    fetch(url)
        .then(response => response.text())
        .then(html => {
            
            document.getElementById('main-content').innerHTML = html;
            runPageScripts(page);
        })
        .catch(err => {
            console.error('Error al cargar la página: ', err);
        });
}
// Función para cargar el header y footer (si es necesario)
function loadHeaderAndFooter() {
    // Cargar header
    const loadHeader = fetch('views/templates/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el header');
            return response.text();
        })
        .then(html => {
            const header = document.getElementById('header');
            if (!header) throw new Error("Contenedor 'header' no encontrado");
            header.innerHTML = html;
        });

    // Cargar footer
    const loadFooter = fetch('views/templates/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el footer');
            return response.text();
        })
        .then(html => {
            const footer = document.getElementById('footer');
            if (!footer) throw new Error("Contenedor 'footer' no encontrado");
            footer.innerHTML = html;
        });

    return Promise.all([loadHeader, loadFooter]);
}


// Función para ejecutar el JS específico de cada página
function runPageScripts(page) {
    try {
        // Ejecutar código dependiendo de la página
        switch(page) {
            case 'home':
                initializeHome();
                
                break;
            case 'about':
                initializeAbout();
                break;
            case 'services':
                initializeServices();
                break;
            case 'portfolio':
                initializePortfolio();
                break;
            case 'contact':
                initializeContact();
                break;
            default:
    
        }
    } catch (error) {
        console.error(`Error al ejecutar los scripts de la página ${page}: `, error);
    }
}

function route() {
    const path = window.location.hash.substr(1) || 'home';
    loadHeaderAndFooter();  // Cargar siempre el header y footer primero
    loadPage(path);
}



// Funciones específicas para cada página
function initializeHome() {

    visible();
    theme();
    menu();
    imgnoimg();
    metricas();
    textanimate();
    carrusel2();
    
    
}

function initializeAbout() {
    // Tu lógica para la página about

    visible();
    theme();
    menu();
    carrusel();
    imgnoimg();
    navbarabout()
   
}



function initializeServices() {
    // Tu lógica para la página services

    visible();
    theme();
    menu();
    imgnoimg();
}

function initializePortfolio() {
    // Tu lógica para la página services

    theme();
    imgnoimg();
    menu();
}

function initializeContact() {
    // Tu lógica para la página services

    visible();
    theme();
    imgnoimg();
    menu();
}




document.addEventListener('DOMContentLoaded', route);

// Manejar cambios de URL cuando cambie el hash
window.addEventListener('hashchange', route);

function theme(){

    const themeToggleButton = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    
    // Lógica para el cambio de tema
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeStylesheet.href = 'assets/css/light-mode.css';
        themeToggleButton.innerHTML = '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>';
    } else {
        document.body.classList.add('dark-mode');
        themeStylesheet.href = 'assets/css/dark-mode.css';
        themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeToggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeStylesheet.href = 'assets/css/light-mode.css';
            themeToggleButton.innerHTML = '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeStylesheet.href = 'assets/css/dark-mode.css';
            themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

function menu(){
    
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.querySelector(".menu");
    const btn = document.querySelector(".cta");

    menuIcon.addEventListener("click", function() {
        // Alternar la clase 'show' en el menú
        menu.classList.toggle("show");

        // Alternar el display del logo dentro del menú
        if (menu.classList.contains("show")) {
            menu.prepend(btn); // Mover el logo dentro del menú cuando está abierto
        } else {
            document.querySelector(".cta").prepend(btn); // Moverlo fuera cuando se cierra el menú
        }
    }); 
    

}

function menu() {
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.querySelector(".menu");
    const btn = document.querySelector(".cta-contact");
    const originalParent = btn.parentElement; // Guardar posición original

    menuIcon.addEventListener("click", function() {
        menu.classList.toggle("show");
        
        if (menu.classList.contains("show")) {
            // Mover el botón al menú
            menu.appendChild(btn);
            btn.style.display = 'block';
        } else {
            // Devolver el botón a su posición original
            originalParent.appendChild(btn);
            btn.style.display = 'block';
        }
    });
}

function visible(){
    const sections = document.querySelectorAll('.services, .about, .testimonials, .contact, .cta-section, .metrics, .redes, .hero, .about-section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: [0, 0.1, 0.9, 1] // Puedes ajustar esto si es necesario
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function carrusel(){
    const carousel = document.querySelector('.history-carousel');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');

    if (carousel && nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });

        });
    } else {
        console.error('No se encontraron los elementos del carrusel o los botones.');
    }
}



// Declarar las métricas fuera de la función para mayor claridad
const metrics = {
    clients: 3,
    projects: 5,
    tests: 30
};

function metricas() {

    // Función para animar el conteo
    function animateCount(elementId, endValue, duration) {
        const element = document.getElementById(elementId);

        // Validar si el elemento existe
        if (!element) {
       
            return;
        }

        // Asegúrate de que 'endValue' no sea cero para evitar una división por cero
        if (endValue === 0) {

            return;
        }

        let startValue = 0;
        const stepTime = Math.floor(duration / endValue);

        const timer = setInterval(() => {
            startValue += 1;
            element.textContent = startValue;

            if (startValue === endValue) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Función para inicializar las métricas
    function updateMetrics() {
        if (metrics.clients) animateCount('clients-count', metrics.clients, 2000);
        if (metrics.projects) animateCount('projects-count', metrics.projects, 2000);
        if (metrics.tests) animateCount('tests-count', metrics.tests, 2000);
    }

    // Ejecutar la función al cargar la página
    updateMetrics();
}

// Asegúrate de que esta función se ejecute cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', metricas);

function textanimate(){
    const title = "¿Listo para mejorar tu software?";
    const description = "Descubre cómo nuestras soluciones pueden transformar tu negocio.";

    const titleElement = document.getElementById('cta-title');
    const descriptionElement = document.getElementById('cta-description');
    const ctaSection = document.getElementById('final-cta');
    const ctaButton = document.querySelector('.cta');

    // Función para escribir texto en un elemento
    function typeText(element, text, callback) {
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    // Función para mostrar el botón
    function showCTAButton() {
        const ctaButton = document.querySelector('.cta-section .cta');
        if (ctaButton) {
            ctaButton.style.opacity = '1'; // Cambiar opacidad a 1
        } else {
            console.error("El botón no se encontró en el DOM.");
        }
    }

    // Función principal para animar la sección
    function animateCTA() {
        ctaSection.style.opacity = 1; // Hacemos visible la sección

        // Escribir el título
        typeText(titleElement, title, function () {
            // Después del título, escribir la descripción
            typeText(descriptionElement, description, function () {
                // Finalmente, mostrar el botón
                setTimeout(showCTAButton, 200); // Agregar un pequeño retraso
            });
        });
    }

    // Intersection Observer para detectar cuando la sección es visible
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCTA(); // Disparamos la animación
                    observer.disconnect(); // Desconectamos el observador
                }
            });
        },
        { threshold: 0.5 } // Activar cuando el 50% de la sección sea visible
    );

    observer.observe(ctaSection);
}



function imgnoimg(){
    const hero = document.querySelector(".hero"); // Seleccionamos el hero
    const header = document.querySelector("header"); // Seleccionamos el header
    const menuq = document.querySelector(".menu"); // Seleccionamos el header

    // Si el elemento .hero existe, es porque hay una imagen de fondo
    if (hero) {
        // Si hay imagen de fondo (hero), aseguramos que no tenga la clase 'no-image'
        if (header && header.classList.contains("no-image")) {
            header.classList.remove("no-image");
            menuq.classList.remove("no-image");
        }
    } else {
        // Si no hay hero (no hay imagen de fondo), agregamos la clase 'no-image' al header
        if (header) {
            header.classList.add("no-image");
            menuq.classList.add("no-image");
        }
    }

    // Lógica de scroll para aplicar la clase 'scrolled' (si aplica)
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
                menuq.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
                menuq.classList.remove("scrolled");
            }
        }
    });
}

function carrusel2(){

    const wrapper = document.querySelector('.carousel-wrapper');
    const items = document.querySelectorAll('.video-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0; // El índice del video central

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');

            if (index === currentIndex) {
                // Resaltar solo el video central
                item.classList.add('active');
            }
        });

        // Centrar el video activo
        const offset = -(currentIndex - 1) * 30; // Ajusta para desplazar el central
        wrapper.style.transform = `translateX(${offset}%)`;
    }

    // Control del botón previo
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    // Control del botón siguiente
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Inicializar el carrusel
    updateCarousel();
}
function scrollToSection(event, sectionId) {
    event.preventDefault(); // Evitar que el enlace salte directamente
    const section = document.getElementById(sectionId);

    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight || 0; // Ajustar si hay un header
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    } else {
        console.error(`No se encontró una sección con el ID: ${sectionId}`);
    }
}

function navbarabout(){

    const aboutNavLinks = document.querySelectorAll('#about-nav ul li a');

    // Agregamos un controlador de clic a cada enlace
    aboutNavLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace

            const sectionId = this.getAttribute('href').substring(1); // Obtener el ID de la sección (sin el #)
            const section = document.getElementById(sectionId);

            if (section) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0; // Altura del header si existe
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            } else {
                console.error(`No se encontró una sección con el ID: ${sectionId}`);
            }
        });
    });
}