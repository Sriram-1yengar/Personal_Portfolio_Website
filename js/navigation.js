/**
 * Navigation functionality for portfolio website
 * Handles smooth scrolling, active section highlighting, and mobile menu
 */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.isScrolling = false;
        this.scrollTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.highlightActiveSection();
        this.createScrollProgress();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Close mobile menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Scroll event for active section highlighting
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        
        // Update aria attributes for accessibility
        const isOpen = this.navMenu.classList.contains('active');
        this.mobileMenu.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.mobileMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    handleNavClick(e) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        this.smoothScrollToSection(targetSection);
        this.setActiveLink(e.target);
    }
    
    smoothScrollToSection(section) {
        const navbarHeight = this.navbar.offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight - 20; // 20px extra padding
        
        // Use native smooth scroll if supported
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            this.animateScroll(targetPosition);
        }
    }
    
    animateScroll(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    handleScroll() {
        // Throttle scroll events for better performance
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                this.highlightActiveSection();
                this.updateScrollProgress();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
        
        // Clear existing timer
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
        }
        
        // Set a timer to run after scrolling ends
        this.scrollTimer = setTimeout(() => {
            this.highlightActiveSection();
        }, 100);
    }
    
    highlightActiveSection() {
        const navbarHeight = this.navbar.offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle hero section special case
        if (window.scrollY < 100) {
            currentSection = 'home';
        }
        
        this.setActiveLinkById(currentSection);
    }
    
    setActiveLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    setActiveLinkById(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    handleOutsideClick(e) {
        if (!this.navMenu.contains(e.target) && !this.mobileMenu.contains(e.target)) {
            this.closeMobileMenu();
        }
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
    
    handleKeydown(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Navigate with arrow keys when menu is focused
        if (this.navMenu.classList.contains('active')) {
            const focusedElement = document.activeElement;
            const currentIndex = Array.from(this.navLinks).indexOf(focusedElement);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % this.navLinks.length;
                this.navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? this.navLinks.length - 1 : currentIndex - 1;
                this.navLinks[prevIndex].focus();
            }
        }
    }
    
    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Page scroll progress');
        document.body.appendChild(progressBar);
        
        this.scrollProgress = progressBar;
    }
    
    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.scrollProgress.style.width = scrolled + '%';
        this.scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
    }
}

/**
 * Scroll Animation Observer
 * Handles fade-in animations for elements as they come into view
 */
class ScrollAnimationObserver {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            
            this.observeElements();
        } else {
            // Fallback for older browsers
            this.fallbackAnimation();
        }
    }
    
    observeElements() {
        const elementsToObserve = document.querySelectorAll(`
            .section-header,
            .about-content > *,
            .skill-category,
            .timeline-item,
            .project-card,
            .testimonial-card,
            .contact-content > *
        `);
        
        elementsToObserve.forEach(element => {
            element.classList.add('fade-in-on-scroll');
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    fallbackAnimation() {
        // Simple fallback that shows all elements
        const elements = document.querySelectorAll('.fade-in-on-scroll');
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * Navbar Background Controller
 * Changes navbar background based on scroll position
 */
class NavbarBackgroundController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateNavbarBackground());
        this.updateNavbarBackground(); // Initial check
    }
    
    updateNavbarBackground() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ScrollAnimationObserver();
    new NavbarBackgroundController();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation, ScrollAnimationObserver, NavbarBackgroundController };
}
