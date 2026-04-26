// ==========================================
// MODAL ZA PRIKAZ SLIKA U VEĆOJ REZOLUCIJI
// ==========================================

/**
 * Otvara modal s slikom u većoj rezoluciji
 * @param {string} imageSrc - Put do slike u visokoj rezoluciji
 */
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    captionText.innerHTML = modalImg.alt;
    
    // Omogući zatvaranje modalnog prozora klikom izvan slike
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeImageModal();
        }
    }
}

/**
 * Zatvara modal sa slikom
 */
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Omogući zatvaranje modalnog prozora s tipkom ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// ==========================================
// SMOOTH SCROLLING ZA NAVIGACIJSKE LINKOVE
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70; // Visina navigacije
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMACIJA SKILL BAROVA PRI SCROLLANJU
// ==========================================

/**
 * Provjerava je li element vidljiv na ekranu
 * @param {Element} element - DOM element za provjeru
 * @returns {boolean} - True ako je element vidljiv
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Animira skill barove kad dođu u viewport
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        if (isElementInViewport(bar) && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

// Pokreni animaciju pri učitavanju i scrollanju
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// ==========================================
// FADE-IN ANIMACIJA ZA SEKCIJE
// ==========================================

/**
 * Dodaje fade-in animaciju sekcijama kad dođu u viewport
 */
function fadeInSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        if (isElementInViewport(section) && !section.classList.contains('fade-in')) {
            section.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInSections);
window.addEventListener('load', fadeInSections);

// ==========================================
// NAVIGACIJA - ACTIVE CLASS
// ==========================================

/**
 * Dodaje aktivnu klasu trenutno vidljivoj sekciji u navigaciji
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// LAZY LOADING ZA SLIKE
// ==========================================

/**
 * Implementira lazy loading za slike radi bržeg učitavanja stranice
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Pokreni lazy loading ako je podržan
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// ==========================================
// BACK TO TOP BUTTON (OPCIONO)
// ==========================================

/**
 * Kreira i dodaje "Nazad na vrh" gumb
 */
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #e74c3c);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Prikaži/sakrij gumb ovisno o scroll poziciji
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Kreiraj "Nazad na vrh" gumb
window.addEventListener('load', createBackToTopButton);

// ==========================================
// MOBILE MENU TOGGLE (OPCIONO)
// ==========================================

/**
 * Dodaje funkcionalnost za mobilni menu
 */
function setupMobileMenu() {
    const nav = document.querySelector('.nav-menu');
    const menuToggle = document.createElement('button');
    
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
    `;
    
    // Dodaj toggle button u navigaciju
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    });
    
    // Prikaži toggle button na malim ekranima
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            nav.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

window.addEventListener('load', setupMobileMenu);

// ==========================================
// LOADING ANIMATION
// ==========================================

/**
 * Prikazuje loading screen dok se stranica učitava
 */
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(`
╔═══════════════════════════════════════╗
║   Portfolio Web Stranica             ║
║   Izrađeno za: FERIT Osijek          ║
║   Kolegij: Multimedijska tehnika     ║
╚═══════════════════════════════════════╝
`);

// ==========================================
// EXPORT FUNKCIJA (ZA BUDUĆE POTREBE)
// ==========================================

// Globalno dostupne funkcije
window.portfolioFunctions = {
    openImageModal,
    closeImageModal,
    animateSkillBars,
    fadeInSections
};
