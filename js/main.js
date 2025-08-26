/**
 * Main JavaScript file for portfolio website
 * Handles general functionality, skill animations, contact form, and utilities
 */

/**
 * Main Application Controller
 */
class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }
    
    onDOMReady() {
        this.initializeComponents();
        this.setupEventListeners();
        this.startAnimations();
        this.isLoaded = true;
        
        console.log('Portfolio website loaded successfully');
    }
    
    initializeComponents() {
        // Initialize all major components
        this.skillAnimator = new SkillAnimator();
        this.contactForm = new ContactForm();
        this.utils = new Utils();
        this.performanceMonitor = new PerformanceMonitor();
    }
    
    setupEventListeners() {
        // Global event listeners
        window.addEventListener('load', () => this.onWindowLoad());
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('orientationchange', () => this.onOrientationChange());
        
        // Prevent right-click on images (optional)
        // document.addEventListener('contextmenu', (e) => {
        //     if (e.target.tagName === 'IMG') {
        //         e.preventDefault();
        //     }
        // });
    }
    
    startAnimations() {
        // Trigger initial animations
        this.skillAnimator.startSkillBars();
        this.utils.addScrollAnimations();
    }
    
    onWindowLoad() {
        // Hide loading spinner if it exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
        
        // Start performance monitoring
        this.performanceMonitor.startMonitoring();
    }
    
    onWindowResize() {
        // Handle responsive adjustments
        this.utils.debounce(() => {
            this.skillAnimator.recalculateSkillBars();
            this.utils.updateViewportHeight();
        }, 250)();
    }
    
    onOrientationChange() {
        // Handle orientation changes on mobile
        setTimeout(() => {
            this.utils.updateViewportHeight();
        }, 500);
    }
}

/**
 * Skill Bar Animation Controller
 */
class SkillAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        } else {
            // Fallback for older browsers
            this.startSkillBars();
        }
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            }
        );
        
        // Observe skill sections
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            this.observer.observe(skillsSection);
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.startSkillBars();
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    startSkillBars() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                this.animateSkillBar(bar);
            }, index * 200);
        });
    }
    
    animateSkillBar(bar) {
        const skillLevel = bar.getAttribute('data-skill');
        if (skillLevel) {
            bar.style.setProperty('--progress-width', skillLevel + '%');
            bar.style.width = skillLevel + '%';
            
            // Add completion callback
            bar.addEventListener('transitionend', () => {
                bar.classList.add('animation-complete');
            }, { once: true });
        }
    }
    
    recalculateSkillBars() {
        // Recalculate skill bars on window resize
        this.skillBars.forEach(bar => {
            if (bar.classList.contains('animation-complete')) {
                const skillLevel = bar.getAttribute('data-skill');
                bar.style.width = skillLevel + '%';
            }
        });
    }
}

/**
 * Contact Form Handler
 */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = null;
        this.originalButtonText = '';
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.submitButton = this.form.querySelector('button[type="submit"]');
        if (this.submitButton) {
            this.originalButtonText = this.submitButton.textContent;
        }
        
        this.setupEventListeners();
        this.setupValidation();
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    setupValidation() {
        // Add custom validation messages
        const emailInput = this.form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('invalid', (e) => {
                e.target.setCustomValidity('Please enter a valid email address');
            });
            emailInput.addEventListener('input', (e) => {
                e.target.setCustomValidity('');
            });
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            const formData = new FormData(this.form);
            const result = await this.submitForm(formData);
            
            if (result.success) {
                this.showSuccess('Message sent successfully!');
                this.form.reset();
            } else {
                this.showError(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('An error occurred. Please try again later.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async submitForm(formData) {
        // Simulate form submission - replace with your actual endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success/failure
                const success = Math.random() > 0.1; // 90% success rate for demo
                resolve({
                    success,
                    message: success ? 'Message sent!' : 'Server error occurred'
                });
            }, 2000);
        });
        
        // Example with actual endpoint:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        return await response.json();
        */
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        // Name validation
        if (field.name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            }
        }
        
        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters long';
            }
        }
        
        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, message);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    setLoadingState(isLoading) {
        if (!this.submitButton) return;
        
        this.form.classList.toggle('form-submitting', isLoading);
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading ? 'Sending...' : this.originalButtonText;
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

/**
 * Utility Functions
 */
class Utils {
    constructor() {
        this.init();
    }
    
    init() {
        this.updateViewportHeight();
        this.addScrollAnimations();
    }
    
    // Debounce function for performance optimization
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Throttle function for performance optimization
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Update CSS custom property for viewport height (mobile fix)
    updateViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Add scroll-triggered animations
    addScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '0px 0px -50px 0px',
                    threshold: 0.1
                }
            );
            
            elements.forEach(element => observer.observe(element));
        } else {
            // Fallback for older browsers
            elements.forEach(element => element.classList.add('visible'));
        }
    }
    
    // Smooth scroll to element
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        
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
    
    // Get element position relative to viewport
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            width: rect.width,
            height: rect.height
        };
    }
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Format date for display
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options })
            .format(new Date(date));
    }
    
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const result = document.execCommand('copy');
                textArea.remove();
                return result;
            }
        } catch (error) {
            console.error('Failed to copy text:', error);
            return false;
        }
    }
}

/**
 * Performance Monitor
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observer = null;
    }
    
    startMonitoring() {
        this.measurePageLoad();
        this.observeResourceLoading();
        this.measureLargestContentfulPaint();
    }
    
    measurePageLoad() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        this.metrics.pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
                        this.metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.fetchStart;
                        
                        console.log('Performance Metrics:', this.metrics);
                    }
                }, 0);
            });
        }
    }
    
    observeResourceLoading() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'resource') {
                        // Log slow-loading resources
                        if (entry.duration > 1000) {
                            console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
                        }
                    }
                }
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
    
    measureLargestContentfulPaint() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
                
                console.log('LCP:', lastEntry.startTime);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
}

/**
 * Theme Controller (for future dark mode implementation)
 */
class ThemeController {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.getStoredTheme()) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.storeTheme(theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    getStoredTheme() {
        try {
            return localStorage.getItem('portfolio-theme');
        } catch (error) {
            return null;
        }
    }
    
    storeTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (error) {
            console.warn('Could not store theme preference');
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }
}

// Initialize the application
const app = new PortfolioApp();

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        SkillAnimator,
        ContactForm,
        Utils,
        PerformanceMonitor,
        ThemeController
    };
}
