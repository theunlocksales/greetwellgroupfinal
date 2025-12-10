// your code goes here
/* ==========================================
   GREETWELL GROUP - ULTIMATE LUXURY EDITION
   Advanced Interactions & Animations
   ========================================== */

'use strict';

// ========== GLOBAL VARIABLES ========== //
let lastScrollTop = 0;
let ticking = false;

// ========== INITIALIZATION ========== //
document.addEventListener('DOMContentLoaded', function() {
    initLuxuryPreloader();
    initLuxuryNavbar();
    initMobileMenu();
    initLuxuryParticles();
    initScrollAnimations();
    initScrollToTop();
    initSmoothScroll();
    initParallaxEffects();
    initVideoControls();
    initFormValidation();
    initCursorEffect();
    initPageTransitions();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100,
            disable: 'mobile'
        });
    }
});

// ========== LUXURY PRELOADER ========== //
function initLuxuryPreloader() {
    const preloader = document.querySelector('.luxury-preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'visible';
                }, 800);
            }, 500);
        }
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
    }, 150);
}

// ========== LUXURY NAVBAR ========== //
function initLuxuryNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    }, 100));
}

// ========== MOBILE MENU ========== //
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu on link click
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ========== LUXURY PARTICLES (CANVAS) ========== //
function initLuxuryParticles() {
    const canvas = document.getElementById('luxuryParticles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(201, 169, 97, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(201, 169, 97, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

// ========== SCROLL ANIMATIONS ========== //
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeElements = document.querySelectorAll(
        '.trust-item, .feature-item-luxury, .product-card-luxury, ' +
        '.value-card-luxury, .why-card-ultimate, .timeline-item, ' +
        '.luxury-stat-card, .testimonial-luxury-card'
    );
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        fadeObserver.observe(element);
    });
}

// ========== PARALLAX EFFECTS ========== //
function initParallaxEffects() {
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        // Hero video parallax
        const heroVideo = document.querySelector('.hero-video-bg');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
        
        // Section background videos
        const sectionVideos = document.querySelectorAll('.section-video-bg video');
        sectionVideos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const videoTop = rect.top + window.pageYOffset;
            const offset = (scrolled - videoTop) * 0.3;
            video.style.transform = `translateY(${offset}px) scale(1.1)`;
        });
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            element.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
        });
        
        // Background patterns
        const bgPatterns = document.querySelectorAll('.section-bg-pattern');
        bgPatterns.forEach(pattern => {
            const rect = pattern.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const patternOffset = (scrolled - pattern.offsetTop) * 0.1;
                pattern.style.transform = `translateY(${patternOffset}px)`;
            }
        });
    }, 50));
}

// ========== SCROLL TO TOP ========== //
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, 100));
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLL ========== //
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========== VIDEO CONTROLS ========== //
function initVideoControls() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log('Video play failed:', e));
            } else {
                entry.target.pause();
            }
        });
    }, {
        threshold: 0.25
    });
    
    videos.forEach(video => {
        video.setAttribute('playsinline', '');
        video.muted = true;
        videoObserver.observe(video);
    });
}

// ========== FORM VALIDATION ========== //
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showLuxuryNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showLuxuryNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Success
            showLuxuryNotification('Thank you! We will get back to you soon.', 'success');
            contactForm.reset();
            
            console.log('Form submitted:', data);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLuxuryNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `luxury-notification luxury-notification-${type}`;
    
    const icon = type === 'success' ? 
        '<i class="fas fa-check-circle"></i>' : 
        '<i class="fas fa-exclamation-circle"></i>';
    
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    const bgColor = type === 'success' ? 
        'linear-gradient(135deg, #2d4a2d, #4a7c59)' : 
        'linear-gradient(135deg, #dc3545, #c82333)';
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        padding: 20px 30px;
        background: ${bgColor};
        color: white;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        z-index: 10001;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.innerHTML = `
    @keyframes slideInRight {
        from {
            transform: translateX(500px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(500px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ========== CUSTOM CURSOR EFFECT ========== //
function initCursorEffect() {
    if (window.innerWidth < 1024) return; // Only on desktop
    
    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 25px;
        height: 25px;
        border: 3px solid #c9a961;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.15s ease;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'luxury-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #c9a961;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn-hero-gold, .btn-hero-outline, .product-card-luxury, ' +
        '.value-card-luxury, .why-card-ultimate, .testimonial-luxury-card'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursor.style.background = 'rgba(201, 169, 97, 0.2)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========== PAGE TRANSITIONS ========== //
function initPageTransitions() {
    // Fade in page on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Smooth transitions for internal links
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });
}

// ========== INTERSECTION OBSERVER FOR COUNTERS ========== //
const statNumbers = document.querySelectorAll('.stat-number, .stat-number-luxury');
if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ========== HOVER EFFECTS FOR CARDS ========== //
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.product-card-luxury, .value-card-luxury, .why-card-ultimate, ' +
        '.testimonial-luxury-card, .luxury-stat-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = ((centerX - x) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
});

// ========== IMAGE LAZY LOADING ========== //
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// ========== UTILITY FUNCTIONS ========== //

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ========== PERFORMANCE OPTIMIZATION ========== //
window.addEventListener('resize', debounce(function() {
    // Reinitialize canvas particles on resize
    const canvas = document.getElementById('luxuryParticles');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// ========== DYNAMIC YEAR IN FOOTER ========== //
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});

// ========== KEYBOARD NAVIGATION ========== //
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Scroll to top on Home key
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ========== CONSOLE BRANDING ========== //
console.log(
    '%c🌿 GreetWell Group - Ultimate Luxury Edition',
    'color: #c9a961; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
    '%cCrafted with Excellence | Developed with Passion',
    'color: #2d4a2d; font-size: 16px; font-weight: 600;'
);
console.log(
    '%c© 2025 GreetWell Group. All Rights Reserved.',
    'color: #6a6a6a; font-size: 14px;'
);
console.log(
    '%c\nWebsite Features:\n✓ Premium Luxury Design\n✓ Advanced Animations\n✓ Canvas Particles\n✓ Smooth Parallax\n✓ Custom Cursor\n✓ Responsive Design\n✓ SEO Optimized',
    'color: #4a7c59; font-size: 12px; line-height: 1.8;'
);

// ========== ACCESSIBILITY IMPROVEMENTS ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard focus styles
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #c9a961';
            this.style.outlineOffset = '3px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// ========== LOADING OPTIMIZATION ========== //
window.addEventListener('load', function() {
    // Remove loading class from body
    document.body.classList.remove('loading');
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('[data-preload]');
    criticalImages.forEach(img => {
        const image = new Image();
        image.src = img.dataset.src || img.src;
    });
});

// ========== ERROR HANDLING ========== //
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // Silently handle errors in production
}, true);

// ========== PREVENT ZOOM ON MOBILE ========== //
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

// ========== EXPORT FOR TESTING ========== //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isValidEmail,
        animateCounter
    };
}

/* ==========================================
   END OF ULTIMATE LUXURY EDITION
   ========================================== */
