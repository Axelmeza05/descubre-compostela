/* ============================================================
   main.js — Descubre Compostela
   JS global compartido por todas las paginas
   v1.0 — Lote 0
   ============================================================ */

/* --- Toggle del menu overlay (llamada desde onclick en HTML) --- */
function toggleOverlayMenu() {
    const overlay = document.getElementById('menu-overlay');
    const floatingNav = document.querySelector('.floating-nav-container');

    if (!overlay) return;

    overlay.classList.toggle('active');

    if (overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        if (floatingNav) floatingNav.classList.add('hidden-by-overlay');
    } else {
        document.body.style.overflow = '';
        if (floatingNav) floatingNav.classList.remove('hidden-by-overlay');
    }
}

/* --- Helpers para ocultar/mostrar floating nav --- */
function hideFloatingNav() {
    var nav = document.querySelector('.floating-nav-container');
    if (nav) nav.classList.add('hidden-by-overlay');
}

function showFloatingNav() {
    var nav = document.querySelector('.floating-nav-container');
    if (nav) nav.classList.remove('hidden-by-overlay');
}


document.addEventListener('DOMContentLoaded', function () {

    /* --- Inicializar AOS (Animate On Scroll) --- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic'
        });
    }

    /* --- Navbar sticky: toggle clase .scrolled al hacer scroll --- */
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- Abrir menu overlay con boton toggle (paginas que usan btn-menu-toggle) --- */
    var btnMenuToggle = document.getElementById('btn-menu-toggle');
    var menuOverlay = document.getElementById('menu-overlay');
    var floatingNav = document.querySelector('.floating-nav-container');

    if (btnMenuToggle && menuOverlay) {
        btnMenuToggle.addEventListener('click', function () {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            hideFloatingNav();
        });
    }

    /* --- Cerrar menu overlay con boton X --- */
    var btnClose = document.getElementById('btn-menu-close');

    if (btnClose && menuOverlay) {
        btnClose.addEventListener('click', function () {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            showFloatingNav();
        });
    }

    /* --- Floating nav: detenerse antes del footer --- */
    var footer = document.querySelector('footer');

    function handleNavScroll() {
        if (!footer || !floatingNav) return;

        var scrollY = window.scrollY;
        var windowHeight = window.innerHeight;
        var scrollBottom = scrollY + windowHeight;
        var footerTop = footer.offsetTop;
        var stopMargin = 30;

        if (scrollBottom > footerTop + stopMargin) {
            var absoluteTop = footerTop - floatingNav.offsetHeight - stopMargin;
            floatingNav.classList.add('stopped');
            floatingNav.style.position = 'absolute';
            floatingNav.style.top = absoluteTop + 'px';
            floatingNav.style.bottom = 'auto';
        } else {
            floatingNav.classList.remove('stopped');
            floatingNav.style.position = 'fixed';
            floatingNav.style.top = 'auto';
            floatingNav.style.bottom = '30px';
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    window.addEventListener('resize', handleNavScroll);
    handleNavScroll();

    /* --- Scroll suave para enlaces con ancla --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* --- Modal de informacion (subpaginas: direccion, horario, precio) --- */
    setupInfoModal();

    /* --- Modal de filtros (subpaginas: categorias de restaurantes, etc.) --- */
    setupFilterModal();
});


/* --- Setup del modal de informacion --- */
function setupInfoModal() {
    var modal = document.getElementById('info-modal');
    if (!modal) return;

    var closeModal = document.querySelector('.close-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalInfo = document.getElementById('modal-info');
    var modalIcon = document.getElementById('modal-icon');
    var modalMapBtn = document.getElementById('modal-map-btn');
    var modalMenuBtn = document.getElementById('modal-menu-btn');
    var modalBookingBtn = document.getElementById('modal-booking-btn');

    document.querySelectorAll('.btn-info').forEach(function (button) {
        button.addEventListener('click', function () {
            var title = button.getAttribute('data-title');
            var info = button.getAttribute('data-info');
            var link = button.getAttribute('data-link');
            var menuLink = button.getAttribute('data-menu-link');
            var bookingLink = button.getAttribute('data-booking-link');

            if (modalTitle) modalTitle.textContent = title;
            if (modalInfo) modalInfo.innerHTML = info;

            if (modalMapBtn) modalMapBtn.classList.add('hidden');
            if (modalMenuBtn) modalMenuBtn.classList.add('hidden');
            if (modalBookingBtn) modalBookingBtn.classList.add('hidden');

            /* Icono generico para todos los tipos de boton */
            if (modalIcon) {
                modalIcon.className = 'fas fa-info-circle';
                modalIcon.style.color = '#d97706';
            }

            /* Mostrar boton de mapa si hay link de direccion */
            if (button.classList.contains('btn-direccion') || button.classList.contains('btn-ubicacion')) {
                if (link && modalMapBtn) {
                    modalMapBtn.href = link;
                    modalMapBtn.classList.remove('hidden');
                }
            }

            /* Mostrar boton de menu si hay link de menu */
            if (button.classList.contains('btn-precio')) {
                if (menuLink && modalMenuBtn) {
                    modalMenuBtn.href = menuLink;
                    modalMenuBtn.classList.remove('hidden');
                }
                if (bookingLink && modalBookingBtn) {
                    modalBookingBtn.href = bookingLink;
                    modalBookingBtn.classList.remove('hidden');
                }
            }

            /* Boton de reservar en hospedajes */
            if (button.classList.contains('btn-contacto')) {
                if (bookingLink && modalBookingBtn) {
                    modalBookingBtn.href = bookingLink;
                    modalBookingBtn.classList.remove('hidden');
                }
            }

            modal.classList.add('active');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function () {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}


/* --- Setup del modal de filtros --- */
function setupFilterModal() {
    var btnFilter = document.getElementById('btn-filter');
    var filterModal = document.getElementById('filter-modal');
    var closeFilter = document.getElementById('close-filter') || document.getElementById('close-filter-modal');
    var filterOptions = document.querySelectorAll('.filter-option');
    var cards = document.querySelectorAll('.restaurant-card, .hotel-card, .attraction-card, .operator-card, .event-card, .destination-card, .night-card');

    if (!btnFilter || !filterModal) return;

    btnFilter.addEventListener('click', function () {
        filterModal.classList.add('active');
        hideFloatingNav();
        document.body.style.overflow = 'hidden';
    });

    if (closeFilter) {
        closeFilter.addEventListener('click', function () {
            filterModal.classList.remove('active');
            showFloatingNav();
            document.body.style.overflow = '';
        });
    }

    filterOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            filterOptions.forEach(function (opt) { opt.classList.remove('active'); });
            option.classList.add('active');

            var filterValue = option.getAttribute('data-filter');

            cards.forEach(function (card) {
                if (filterValue === 'all' || filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.classList.add('fade-in');
                    setTimeout(function () { card.classList.remove('fade-in'); }, 500);
                } else {
                    card.style.display = 'none';
                }
            });

            setTimeout(function () {
                filterModal.classList.remove('active');
                showFloatingNav();
                document.body.style.overflow = '';
            }, 300);
        });
    });

    filterModal.addEventListener('click', function (e) {
        if (e.target === filterModal) {
            filterModal.classList.remove('active');
            showFloatingNav();
            document.body.style.overflow = '';
        }
    });
}
