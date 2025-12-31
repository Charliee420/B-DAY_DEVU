// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#fa709a', '#fee140', '#ffd89b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 4 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Burst Confetti Effect
function burstConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#fa709a', '#fee140', '#ffd89b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Celebrate Button Click Handler
function handleCelebrate() {
    const button = document.getElementById('celebrateBtn');
    
    // Create burst effect
    burstConfetti();
    
    // Play sound effect (vibration on mobile)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    // Button animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // Show celebration message
    showCelebrationMessage();
}

// Show Celebration Message
function showCelebrationMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 24px;
        font-size: 1.5rem;
        font-family: 'Pacifico', cursive;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: popIn 0.5s ease-out forwards;
    `;
    message.innerHTML = '🎉 Yay! Happy Birthday! 🎉';
    document.body.appendChild(message);
    
    // Add pop-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'popIn 0.5s ease-out reverse';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 3000);
}

// Photo Upload Handler (for future implementation)
function setupPhotoUpload() {
    const photoCards = document.querySelectorAll('.photo-placeholder');
    
    photoCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Create file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        // Replace placeholder with image
                        card.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;" alt="Memory ${index + 1}">`;
                        
                        // Add hover effect to image
                        card.style.cursor = 'default';
                        card.parentElement.style.transition = 'transform 0.3s ease';
                        card.parentElement.addEventListener('mouseenter', () => {
                            card.parentElement.style.transform = 'scale(1.05)';
                        });
                        card.parentElement.addEventListener('mouseleave', () => {
                            card.parentElement.style.transform = 'scale(1)';
                        });
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.wish-section, .gallery-section, .wishes-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add floating hearts on random intervals
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1;
        animation: floatHeart 4s ease-in forwards;
        left: ${Math.random() * 100}%;
        bottom: -10%;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            0% {
                bottom: -10%;
                opacity: 0;
                transform: translateX(0) rotate(0deg);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                bottom: 110%;
                opacity: 0;
                transform: translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Start floating hearts at intervals
function startFloatingHearts() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingHeart();
        }
    }, 2000);
}

// Add sparkle effect on cursor (for desktop)
function addSparkleEffect() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    font-size: 1rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleDisappear 1s ease-out forwards;
                `;
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes sparkleDisappear {
                        0% {
                            opacity: 1;
                            transform: translate(-50%, -50%) scale(0);
                        }
                        50% {
                            opacity: 1;
                            transform: translate(-50%, -50%) scale(1);
                        }
                        100% {
                            opacity: 0;
                            transform: translate(-50%, -50%) scale(0);
                        }
                    }
                `;
                document.head.appendChild(style);
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create initial confetti
    createConfetti();
    
    // Setup celebrate button
    const celebrateBtn = document.getElementById('celebrateBtn');
    celebrateBtn.addEventListener('click', handleCelebrate);
    
    // Setup photo upload functionality
    setupPhotoUpload();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Start floating hearts
    startFloatingHearts();
    
    // Add sparkle effect
    addSparkleEffect();
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.wish-item, .photo-card, .celebrate-btn').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
    }
    
    // Auto-trigger celebration after 2 seconds
    setTimeout(() => {
        burstConfetti();
    }, 2000);
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
