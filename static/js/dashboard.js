// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard functionality
    initDashboard();
});

function initDashboard() {
    // Mobile navigation toggle
    initMobileNav();
    
    // Battery analysis modal
    initBatteryModal();
    
    // Range estimation toggles
    initRangeToggles();
    
    // Route optimization
    initRouteOptimization();
    
    // Van request system
    initVanRequest();
    
    // Alert system
    initAlertSystem();
    
    // Intersection Observer for animations
    initScrollAnimations();
}

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger animation
            navToggle.classList.toggle('active');
        });
    }
}

function initBatteryModal() {
    const analyzeBtn = document.getElementById('analyzeBattery');
    const batteryModal = document.getElementById('batteryModal');
    
    if (!analyzeBtn || !batteryModal) {
        console.log('Battery modal elements not found');
        return;
    }
    
    const closeModal = batteryModal.querySelector('.close-modal');
    
    analyzeBtn.addEventListener('click', () => {
        batteryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            batteryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === batteryModal) {
            batteryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function initRangeToggles() {
    const toggles = ['terrainToggle', 'acToggle', 'weatherToggle', 'trafficToggle'];
    const smartRangeElement = document.getElementById('smartRange');
    
    if (!smartRangeElement) {
        console.log('Smart range element not found');
        return;
    }
    
    let baseRange = 145; // Base smart range
    
    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.addEventListener('change', updateSmartRange);
        }
    });
    
    function updateSmartRange() {
        let range = baseRange;
        
        // Adjust range based on toggle states
        if (document.getElementById('terrainToggle') && !document.getElementById('terrainToggle').checked) range += 15;
        if (document.getElementById('acToggle') && !document.getElementById('acToggle').checked) range += 10;
        if (document.getElementById('weatherToggle') && !document.getElementById('weatherToggle').checked) range += 8;
        if (document.getElementById('trafficToggle') && !document.getElementById('trafficToggle').checked) range += 12;
        
        // Get current range value safely
        const currentText = smartRangeElement.textContent;
        const currentValue = parseInt(currentText) || baseRange;
        
        // Animate the range change
        animateValue(smartRangeElement, currentValue, range, 1000);
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + ' km';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

function initRouteOptimization() {
    const optimizeBtn = document.getElementById('optimizeRoute');
    const routeLine = document.getElementById('routeLine');
    const routeModal = document.getElementById('routeModal');
    
    if (!optimizeBtn) {
        console.log('Optimize button not found');
        return;
    }
    
    optimizeBtn.addEventListener('click', () => {
        // Show route animation if route line exists
        if (routeLine) {
            routeLine.style.transform = 'scaleX(1)';
            routeLine.style.left = '30%';
            routeLine.style.top = '50%';
            routeLine.style.width = '40%';
            routeLine.style.transform = 'rotate(-30deg) scaleX(1)';
            
            // Add glowing effect
            routeLine.style.boxShadow = '0 0 20px #00E1FF, 0 0 40px #00E1FF';
        }
        
        // Show success modal after animation
        setTimeout(() => {
            if (routeModal) {
                routeModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Close modal functionality
                const closeModal = routeModal.querySelector('.close-modal');
                if (closeModal) {
                    closeModal.addEventListener('click', () => {
                        routeModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    });
                }
                
                // Close on outside click
                window.addEventListener('click', function closeModalHandler(e) {
                    if (e.target === routeModal) {
                        routeModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        window.removeEventListener('click', closeModalHandler);
                    }
                });
            }
        }, 1000);
    });
}

function initVanRequest() {
    const requestBtn = document.getElementById('requestVan');
    const vanMoving = document.getElementById('vanMoving');
    const vanDistance = document.getElementById('vanDistance');
    const vanModal = document.getElementById('vanModal');
    
    if (!requestBtn) {
        console.log('Van request button not found');
        return;
    }
    
    requestBtn.addEventListener('click', () => {
        // Disable button during animation
        requestBtn.disabled = true;
        requestBtn.textContent = 'Dispatching...';
        
        // Start van animation
        if (vanMoving) {
            vanMoving.classList.add('moving');
        }
        
        // Update distance counter
        let distance = 3.1;
        const distanceInterval = setInterval(() => {
            distance -= 0.1;
            if (distance <= 0) {
                distance = 0;
                clearInterval(distanceInterval);
            }
            if (vanDistance) {
                vanDistance.textContent = distance.toFixed(1) + ' km';
            }
        }, 500);
        
        // Show modal after animation completes
        setTimeout(() => {
            if (vanModal) {
                vanModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Close modal functionality
                const closeModal = vanModal.querySelector('.close-modal');
                if (closeModal) {
                    closeModal.addEventListener('click', () => {
                        vanModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        resetVanAnimation();
                    });
                }
                
                // Close on outside click
                window.addEventListener('click', function closeModalHandler(e) {
                    if (e.target === vanModal) {
                        vanModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        resetVanAnimation();
                        window.removeEventListener('click', closeModalHandler);
                    }
                });
            }
        }, 3000);
    });
    
    function resetVanAnimation() {
        // Reset van animation
        if (vanMoving) {
            vanMoving.classList.remove('moving');
        }
        
        // Reset button
        requestBtn.disabled = false;
        requestBtn.innerHTML = '<i class="fas fa-bell"></i> Request Van';
        
        // Reset distance
        if (vanDistance) {
            vanDistance.textContent = '3.1 km';
        }
    }
}

function initAlertSystem() {
    const alertsContainer = document.querySelector('.alerts-container');
    
    if (!alertsContainer) return;
    
    // Simulate new alerts every 30 seconds
    setInterval(() => {
        addNewAlert();
    }, 30000);
    
    function addNewAlert() {
        const alerts = [
            {
                icon: 'fas fa-bolt',
                title: 'Fast Charging Available',
                message: 'Station 2.1km away - 150kW available',
                time: 'Now'
            },
            {
                icon: 'fas fa-tachometer-alt',
                title: 'Efficiency Improved',
                message: 'Regenerative braking optimized',
                time: 'Now'
            },
            {
                icon: 'fas fa-map-marker-alt',
                title: 'Destination Nearby',
                message: '5 minutes to your destination',
                time: 'Now'
            }
        ];
        
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        
        const alertElement = document.createElement('div');
        alertElement.className = 'alert-item new';
        alertElement.innerHTML = `
            <i class="${randomAlert.icon}"></i>
            <div>
                <h4>${randomAlert.title}</h4>
                <p>${randomAlert.message}</p>
            </div>
            <span class="alert-time">${randomAlert.time}</span>
        `;
        
        // Add to top of container
        alertsContainer.insertBefore(alertElement, alertsContainer.firstChild);
        
        // Remove 'new' class after animation
        setTimeout(() => {
            alertElement.classList.remove('new');
        }, 2000);
        
        // Limit number of alerts
        const allAlerts = alertsContainer.querySelectorAll('.alert-item');
        if (allAlerts.length > 6) {
            alertsContainer.removeChild(allAlerts[allAlerts.length - 1]);
        }
    }
}

function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Utility function for number animation
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const change = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + change * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Error handling for the entire application
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
});

// Export functions for global access if needed
window.dashboard = {
    initDashboard,
    initBatteryModal,
    initRangeToggles,
    initRouteOptimization,
    initVanRequest,
    initAlertSystem,
    animateNumber
};