document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initMobileMenu();
    initThemeToggle();
    initHeroTyping();
    initProjectFiltering();
    initSkillBars();
    initCopyEmail();
    initContactForm();
    initRippleEffect();
    initScrollAnimations();
});

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, icon = 'fa-solid fa-check') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}" style="color: var(--accent-primary);"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3600);
}

// ==========================================================================
// THEME TOGGLE (DARK / LIGHT MODE)
// ==========================================================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!toggleBtn || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function setLightMode(isLight) {
        if (isLight) {
            document.body.classList.add('light-mode');
            themeIcon.className = 'fa-regular fa-moon';
        } else {
            document.body.classList.remove('light-mode');
            themeIcon.className = 'fa-regular fa-sun';
        }
    }

    // Initial state setup
    const initialLight = savedTheme === 'light' || (!savedTheme && !prefersDark);
    setLightMode(initialLight);

    toggleBtn.addEventListener('click', function () {
        const isCurrentlyLight = document.body.classList.contains('light-mode');
        const newLightState = !isCurrentlyLight;
        setLightMode(newLightState);
        localStorage.setItem('theme', newLightState ? 'light' : 'dark');
        showToast(newLightState ? 'Switched to Light Theme' : 'Switched to Dark Theme', newLightState ? 'fa-regular fa-moon' : 'fa-regular fa-sun');
    });
}

// ==========================================================================
// NAVIGATION & SCROLLSPY
// ==========================================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar background blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Active Section Observer
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
}

// ==========================================================================
// MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const overlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileDrawerClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer || !overlay) return;

    function openMenu() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// ==========================================================================
// HERO TYPING EFFECT
// ==========================================================================
function initHeroTyping() {
    const tagline = document.getElementById('heroTagline');
    if (!tagline) return;

    const roles = [
        "Developer",
        "UI/UX Designer",
        "Concept Artist"
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            tagline.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            tagline.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 2500);
}

// ==========================================================================
// PROJECT CATEGORY FILTERING
// ==========================================================================
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================================================
// SKILL PROGRESS BARS ANIMATION
// ==========================================================================
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-progress-fill');
    if (skillFills.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                if (targetWidth) {
                    entry.target.style.width = targetWidth;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillFills.forEach(fill => observer.observe(fill));
}

// ==========================================================================
// ONE-CLICK COPY EMAIL
// ==========================================================================
function legacyCopy(text, onSuccess, onFail) {
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) onSuccess(); else onFail();
    } catch (e) {
        onFail();
    }
}

function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const emailAddress = document.getElementById('emailAddress');

    if (!copyBtn || !emailAddress) return;

    copyBtn.addEventListener('click', function () {
        const textToCopy = emailAddress.textContent.trim();

        function onCopySuccess() {
            showToast('Email copied to clipboard!', 'fa-solid fa-copy');
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
            }, 2500);
        }

        function onCopyFail() {
            showToast('Could not copy — please copy manually: ' + textToCopy, 'fa-solid fa-triangle-exclamation');
        }

        // Try modern Clipboard API first, fall back to legacy execCommand
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(onCopySuccess).catch(() => {
                legacyCopy(textToCopy, onCopySuccess, onCopyFail);
            });
        } else {
            legacyCopy(textToCopy, onCopySuccess, onCopyFail);
        }
    });
}

// ==========================================================================
// CONTACT FORM SUBMISSION
// ==========================================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = `Portfolio Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        window.open(`mailto:mijaresgiancyril@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

        showToast('Opening email client...', 'fa-regular fa-paper-plane');
        form.reset();
    });
}

// ==========================================================================
// BUTTON RIPPLE EFFECT
// ==========================================================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .filter-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();

            button.appendChild(circle);
        });
    });
}

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .experience-card, .project-card, .skill-item, .contact-info-card, .contact-form-container');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}