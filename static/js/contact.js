/**
 * SmartCharge About & Contact Page JavaScript
 * Handles animations, form validation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initContactForm();
    initFAQAccordion();
    initMapModal();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 36, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 15, 36, 0.9)';
        }
    });
}

// Animation triggers
function initAnimations() {
    // Parallax effect for hero image
    window.addEventListener('scroll', function() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate steps sequentially
                if (entry.target.classList.contains('steps-container')) {
                    const steps = entry.target.querySelectorAll('.step');
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                } 
                // Animate cards
                else if (entry.target.classList.contains('card') || 
                         entry.target.classList.contains('team-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                // Default fade-in for other elements
                else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.step, .card, .team-card, .contact-form-container, .contact-details, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe steps container for sequential animation
    const stepsContainer = document.querySelector('.steps-container');
    if (stepsContainer) {
        observer.observe(stepsContainer);
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnLoader.style.display = 'block';
                
                // Simulate form submission (replace with actual fetch in production)
                setTimeout(() => {
                    // In a real implementation, you would use:
                    // fetch(this.action, { method: 'POST', body: new FormData(this) })
                    //   .then(response => { ... })
                    //   .catch(error => { ... });
                    
                    // Show success message
                    showToast('✅ Message sent — we\'ll reply soon.');
                    
                    // Reset form and button
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    btnLoader.style.display = 'none';
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
}

// Form validation
function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}-error`);
    
    // Clear previous error
    clearError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    field.style.borderColor = '#ff6b6b';
}

function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.style.borderColor = 'rgba(125, 249, 255, 0.2)';
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// Map Modal
function initMapModal() {
    const mapThumb = document.getElementById('map-thumb');
    const mapModal = document.getElementById('map-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (mapThumb && mapModal) {
        mapThumb.addEventListener('click', function() {
            mapModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            mapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        mapModal.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mapModal.style.display === 'flex') {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}