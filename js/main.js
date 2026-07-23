document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        updateActiveLink();
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Typed text — role in terminal
    const roleEl = document.getElementById('typedRole');
    typeText(roleEl, 'SOC Analyst | SIEM • EDR • DFIR | Threat Hunter', 45);

    // Typed subtitle rotation
    const subtitleEl = document.getElementById('typedSubtitle');
    const roles = [
        'SOC Analyst',
        'SIEM Specialist',
        'Threat Hunter',
        'Digital Forensics Investigator',
        'Incident Responder'
    ];
    rotateText(subtitleEl, roles);

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(n => statsObserver.observe(n));

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-header, .about-text, .about-stats, .skill-category, .timeline-item, .project-card, .cert-column, .contact-intro, .contact-methods, .contact-cta');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
});

// Type text with typing effect
function typeText(element, text, speed = 50) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Rotate through phrases
function rotateText(element, phrases, delayBetween = 2000) {
    if (!element) return;
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = phrases[phraseIndex];
        if (!deleting) {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, delayBetween);
                return;
            }
            setTimeout(tick, 80);
        } else {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(tick, 40);
        }
    }
    tick();
}

// Animate counter to target
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = target === 9 ? (eased * target).toFixed(2) : value + (target >= 80 ? '' : '');
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = target === 9 ? '9.00' : (target === 100 ? '100+' : target);
        }
    }
    requestAnimationFrame(frame);
}
