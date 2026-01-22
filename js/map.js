// ========================================
// 1. CONFIGURACIÓN DE UBICACIONES
// ========================================

const locations = [
    // COMPOSTELA
    {
        id: 'compostela',
        name: 'Compostela',
        x: 70.5,
        y: 30,
        url: 'locations/Compostela/compostela.html',
        important: true
    },
    //CHACALILLA
    {
        id: 'chacala',
        name: 'Chacala',
        x: 28,
        y: 42.5,
        url: 'locations/Chacala/chacala.html',
        important: true
    },
    // LA PEÑITA DE JALTEMBA
    {
        id: 'penita',
        name: 'La Peñita de Jaltemba',
        x: 30,
        y: 67.5,
        url: 'locations/La Peñita/penita.html',
        important: true
    },
    // RINCÓN DE GUAYABITOS
    {
        id: 'guayabitos',
        name: 'Rincón de Guayabitos',
        x: 24.5,
        y: 77.5,
        url: 'locations/Guayabitos/guayabitos.html',
        important: true
    },
    //LOS AYALA
    {
        id: 'los-ayala',
        name: 'Los Ayala',
        x: 16.5,
        y: 81,
        url: 'locations/Los Ayala/los-ayala.html',
        important: true
    },
    // LAS VARAS
    {
        id: 'las-varas',
        name: 'Las Varas',
        x: 39.5,
        y: 42.3,
        url: 'locations/Las Varas/las-varas.html',
        important: true
    },
    //ZACUALPAN
    {
        id: 'zacualpan',
        name: 'Zacualpan',
        x: 38,
        y: 26.3,
        url: 'locations/Zacualpan/zacualpan.html',
        important: true
    },
    //PLATANITOS
    {
        id: 'platanitos',
        name: 'Platanitos',
        x: 26.3,
        y: 7,
        url: 'locations/Platanitos/platanitos.html',
        important: true
    },
    //PLAYA LAS TORTUGAS
    {
        id: 'playa-las-tortugas',
        name: 'Playa las Tortugas',
        x: 26.5,
        y: 16.5,
        url: 'locations/Playa las Tortugas/playa-las-tortugas.html',
        important: true
    },
    //PLAYA CHILA
    {
        id: 'playa-chila',
        name: 'Playa Chila',
        x: 27.7,
        y: 27,
        url: 'locations/Playa Chila/playa-chila.html',
        important: true
    },
    // ISLA DEL CORAL
    {
        id: 'isla-coral',
        name: 'Isla del Coral',
        x: 20.5,
        y: 65.5,
        url: 'locations/Guayabitos/isla-coral.html',
        important: true
    },
    //PLAYA DEL TORO
    {
        id: 'playa-del-toro',
        name: 'Playa del Toro',
        x: 15.5,
        y: 71.5,
        url: 'locations/Playa del Toro/playa-del-toro.html',
        important: true
    }

];

// ========================================
// 2. REFERENCIAS DOM
// ========================================

const mapImage = document.getElementById('mapImage');
const pinsContainer = document.getElementById('pinsContainer');
const sidebarList = document.getElementById('sidebarList');

// ========================================
// 3. FUNCIONES DE MAPA (SVG Y POSICIONAMIENTO)
// ========================================

function createPinSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'pin-svg');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
    path.setAttribute('fill', '#ef4444');
    path.setAttribute('stroke', '#ffffff');
    path.setAttribute('stroke-width', '1.5');

    svg.appendChild(path);
    return svg;
}

function positionPins() {
    if (!pinsContainer) return;

    pinsContainer.innerHTML = '';

    locations.forEach(location => {
        const pinElement = document.createElement('div');
        pinElement.className = 'location-pin' + (location.important ? ' important' : '');
        pinElement.id = `pin-${location.id}`;
        pinElement.style.left = `${location.x}%`;
        pinElement.style.top = `${location.y}%`;

        const pinSVG = createPinSVG();
        pinElement.appendChild(pinSVG);

        const tooltip = document.createElement('div');
        tooltip.className = 'pin-tooltip';
        /*tooltip.textContent = location.name;*/
        pinElement.appendChild(tooltip);

        pinElement.addEventListener('click', () => {
            if (location.url) {
                window.location.href = location.url;
            } else {
                console.warn(`No URL defined for ${location.name}`);
            }
        });

        pinElement.addEventListener('mouseenter', () => highlightSidebarItem(location.id));
        pinElement.addEventListener('mouseleave', () => removeHighlight(location.id));

        pinsContainer.appendChild(pinElement);
    });
}

// ========================================
// 4. FUNCIONES: INTERACTIVIDAD SIDEBAR
// ========================================

function generateSidebar() {
    if (!sidebarList) return;

    sidebarList.innerHTML = '';

    const importantLocations = locations.filter(loc => loc.important);

    importantLocations.forEach(location => {
        const li = document.createElement('li');
        li.className = 'dest-item';
        li.id = `list-${location.id}`;
        li.innerHTML = `
            <span>${location.name}</span>
            <i class="fas fa-map-marker-alt"></i>
        `;

        li.addEventListener('click', () => {
            if (location.url) {
                window.location.href = location.url;
            }
        });

        li.addEventListener('mouseenter', () => {
            const pin = document.getElementById(`pin-${location.id}`);
            if (pin) pin.classList.add('active');
            li.classList.add('active');
        });

        li.addEventListener('mouseleave', () => {
            const pin = document.getElementById(`pin-${location.id}`);
            if (pin) pin.classList.remove('active');
            li.classList.remove('active');
        });

        sidebarList.appendChild(li);
    });
}

function highlightSidebarItem(id) {
    const item = document.getElementById(`list-${id}`);
    if (item) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function removeHighlight(id) {
    const item = document.getElementById(`list-${id}`);
    if (item) item.classList.remove('active');
}

// ========================================
// 5. INICIALIZACIÓN Y ERRORES
// ========================================

function handleImageError(img) {
    console.error('Error al cargar imagen');
    img.parentElement.innerHTML = `<div style="padding:4rem; text-align:center; color:#ef4444;">⚠️ No se encuentra la imagen del mapa en images/mapa-compostela.png</div>`;
}

// ========================================
// 6. MAIN LOAD EVENT
// ========================================

window.addEventListener('load', function () {
    if (typeof AOS !== 'undefined') AOS.init();

    positionPins();
    generateSidebar();

    const img = document.getElementById('mapImage');
    if (img && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        handleImageError(img);
    }

    // --- LOGICA DE CONTADORES ---
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let c = 0;
        const updateCount = () => {
            if (c < target) {
                c += increment;
                counter.innerText = Math.ceil(c);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // --- SLIDER HERO ---
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;
        let currentSlide = 0;
        const slideInterval = 6000;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        if (!document.querySelector('.hero-slide.active')) {
            slides[0].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
    initHeroSlider();

    // ========================================
    // MENÚ OVERLAY – LÓGICA DEFINITIVA
    // ========================================

    // ========================================
    // 2.1 REFERENCIAS DOM – MENÚ OVERLAY
    // ========================================

    const btnMenu = document.getElementById('btn-menu-toggle');
    const btnClose = document.getElementById('btn-menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const btnHome = document.getElementById('btn-home');
    const btnEventos = document.getElementById('btn-events');

    const openMenu = () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    btnMenu?.addEventListener('click', openMenu);
    btnClose?.addEventListener('click', closeMenu);

    menuOverlay?.addEventListener('click', e => {
        if (e.target === menuOverlay) closeMenu();
    });

    document.querySelectorAll('.overlay-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    btnHome?.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    btnEventos?.addEventListener('click', () =>
        window.location.href = 'locations/eventos.html'
    );

    // 4. Lógica para detener la barra flotante en el Footer
    const navContainer = document.querySelector('.floating-nav-container');
    const footer = document.getElementById('main-footer');

    function handleScroll() {
        if (!navContainer || !footer) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollY + windowHeight;

        // Posición donde empieza el footer
        const footerTop = footer.offsetTop;
        const stopMargin = 30; // Margen de separación

        // Si el fondo de la pantalla toca el footer
        if (scrollBottom > footerTop + stopMargin) {
            // Se detiene y se vuelve absoluta respecto al documento
            const absoluteTop = footerTop - navContainer.offsetHeight - stopMargin;
            navContainer.classList.add('stopped');
            navContainer.style.position = 'absolute';
            navContainer.style.top = `${absoluteTop}px`;
            navContainer.style.bottom = 'auto';
        } else {
            // Flota normalmente
            navContainer.classList.remove('stopped');
            navContainer.style.position = 'fixed';
            navContainer.style.top = 'auto';
            navContainer.style.bottom = '30px';
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Chequeo inicial
});