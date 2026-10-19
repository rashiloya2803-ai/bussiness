// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.plan-card, .comparison-table, .why-content, .cta-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Plan card hover effects
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button click handlers
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.plan-card').dataset.plan;
            handlePlanSelection(plan);
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Add glowing effect to premium card
    const premiumCard = document.querySelector('.plan-card.premium');
    if (premiumCard) {
        setInterval(() => {
            premiumCard.style.boxShadow = `
                0 0 30px rgba(255, 215, 0, 0.3),
                0 0 60px rgba(255, 215, 0, 0.2),
                0 0 90px rgba(255, 215, 0, 0.1)
            `;
            
            setTimeout(() => {
                premiumCard.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
            }, 1000);
        }, 3000);
    }

    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 225, 255, 0.1)';
            this.style.borderLeft = '3px solid #00E1FF';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.borderLeft = '3px solid transparent';
        });
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Initialize particle effect for premium card
    initPremiumParticles();
});

// Handle plan selection
function handlePlanSelection(plan) {
    const plans = {
        basic: 'SmartCharge Basic (Free)',
        plus: 'SmartCharge Plus (₹249/month)',
        pro: 'SmartCharge Pro (₹499/month)',
        premium: 'SmartCharge Premium (₹599/month)'
    };

    // Create a glowing effect
    const selectedCard = document.querySelector(`[data-plan="${plan}"]`);
    if (selectedCard) {
        selectedCard.style.boxShadow = '0 0 40px rgba(0, 225, 255, 0.6)';
        setTimeout(() => {
            selectedCard.style.boxShadow = '';
        }, 1000);
    }

    // Show confirmation (in a real app, this would redirect to payment)
    console.log(`Selected plan: ${plans[plan]}`);
    
    // Simulate API call
    simulatePlanSelection(plan);
}

// Simulate plan selection process
function simulatePlanSelection(plan) {
    const button = document.querySelector(`[data-plan="${plan}"] .plan-btn`);
    const originalText = button.textContent;
    
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Success!';
        button.style.background = '#00FF88';
        button.style.color = '#0A0F24';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }, 1500);
}

// Premium card particle effect
function initPremiumParticles() {
    const premiumCard = document.querySelector('.plan-card.premium');
    if (!premiumCard) return;

    for (let i = 0; i < 8; i++) {
        createParticle(premiumCard);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#FFD700';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    // Random position around the card
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    container.style.position = 'relative';
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    let opacity = 1;
    let scale = 1;
    const duration = 2000 + Math.random() * 2000;
    
    function update() {
        opacity -= 0.01;
        scale += 0.01;
        
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${scale})`;
        
        if (opacity > 0) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
            // Create new particle
            const container = particle.parentElement;
            if (container) {
                setTimeout(() => createParticle(container), 500);
            }
        }
    }
    
    update();
}

// Performance optimization for scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Handle scroll actions
            const scrolled = window.pageYOffset;
            const navbar = document.querySelector('.navbar');
            
            if (navbar) {
                if (scrolled > 100) {
                    navbar.style.background = 'rgba(10, 15, 36, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = 'rgba(10, 15, 36, 0.9)';
                    navbar.style.backdropFilter = 'blur(20px)';
                }
            }
        }, 10);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any modals or reset states
        const buttons = document.querySelectorAll('.plan-btn');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.textContent = btn.textContent.replace('Processing...', 'Get Started').replace('Success!', 'Get Started');
        });
    }
});