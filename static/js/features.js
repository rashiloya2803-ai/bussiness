// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // If it's a stat number, start counting
            if (entry.target.classList.contains('stat-number')) {
                startCountUp(entry.target);
            }
        }
    });
}, observerOptions);

// Count up animation for statistics
function startCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.textContent = '0';
        observer.observe(stat);
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Add hover sound effect (optional)
    const interactiveElements = document.querySelectorAll('.feature-card, .cta-button, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = element.classList.contains('feature-card') ? 
                'translateY(-10px)' : 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.classList.contains('feature-card')) {
                element.style.transform = 'translateY(0)';
            } else {
                element.style.transform = 'scale(1)';
            }
        });
    });

    // Add parallax effect to banner image
    window.addEventListener('scroll', () => {
        const bannerImage = document.querySelector('.banner-image img');
        if (bannerImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            bannerImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add ripple effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Re-initialize animations when window is resized
window.addEventListener('resize', throttle(() => {
    // Re-apply any responsive adjustments if needed
}, 250));