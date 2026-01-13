document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initProjectFiltering();
    initContactForm();
    initSpotlight();
    initAppleStyleEffects();
    initHeroTyping();
});

// NAVIGATION
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(5, 5, 5, 0.95)';
                navbar.style.borderBottom = '1px solid #333';
            } else {
                navbar.style.background = 'rgba(5, 5, 5, 0.7)';
                navbar.style.borderBottom = '1px solid transparent';
            }
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(section => navObserver.observe(section));
    }
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .experience-card, .project-card, .skill-item');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay based on index of batch
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// PROJECT FILTERING
function initProjectFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (categoryBtns.length === 0) return;

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

// CONTACT FORM
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input');

    // Input Focus Effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) input.parentElement.classList.remove('focused');
        });
    });

    // Submit Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        
        // Opens default mail client
        window.open(`mailto:mijaresgiancyril@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    });
}

// APPLE STYLE EFFECTS (Ripple & Hover)
function initAppleStyleEffects() {
    // Button Ripple
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');

            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) ripple.remove();

            button.appendChild(circle);
        });
    });

    // Keyboard Navigation Accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Page Load Animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// HERO TYPING EFFECT
function initHeroTyping() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const roles = [
        "Developer & Designer",
        "AI explorer",
        "Full Stack Developer",
        "UI/UX Designer"
        
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

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 3000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start loop after initial 3s delay
    setTimeout(type, 3000);
}