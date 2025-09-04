// ===== INTERACTIVE WAVE EFFECTS =====
class InteractiveWaves {
    constructor() {
        this.waves = document.querySelectorAll('.wave');
        this.isHovering = false;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Add mouse move listener for wave interaction
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            this.updateWaves();
        });
        
        // Add hover effects for login box
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.intensifyWaves();
            });
            
            loginBox.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.normalizeWaves();
            });
        }
    }
    
    updateWaves() {
        this.waves.forEach((wave, index) => {
            const intensity = this.isHovering ? 1.5 : 1;
            const xOffset = (this.mouseX - 0.5) * 50 * intensity;
            const yOffset = (this.mouseY - 0.5) * 30 * intensity;
            const scale = 1 + (this.mouseX * this.mouseY * 0.1 * intensity);
            
            wave.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
            wave.style.filter = `blur(${2 + (this.mouseX * this.mouseY * 2)}px)`;
        });
    }
    
    intensifyWaves() {
        this.waves.forEach((wave, index) => {
            wave.style.transition = 'all 0.3s ease';
            wave.style.opacity = '0.8';
            
            // Add pulsing effect
            setTimeout(() => {
                if (this.isHovering) {
                    wave.style.animation = `waveMove ${20 + index * 2}s infinite ease-in-out, wavePulse 2s infinite ease-in-out`;
                }
            }, index * 100);
        });
    }
    
    normalizeWaves() {
        this.waves.forEach((wave, index) => {
            wave.style.transition = 'all 0.6s ease';
            wave.style.opacity = '';
            wave.style.animation = `waveMove ${20 + index * 5}s infinite ease-in-out`;
        });
    }
}

// ===== FORM FUNCTIONALITY =====
class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailField = document.getElementById('email');
        this.passwordField = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.rememberCheckbox = document.getElementById('remember');
        
        this.init();
    }
    
    init() {
        // Password toggle functionality
        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', () => {
                this.togglePasswordVisibility();
            });
        }
        
        // Form submission handling
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Input field enhancements
        this.setupInputEnhancements();
        
        // Social button interactions
        this.setupSocialButtons();
    }
    
    togglePasswordVisibility() {
        const isPassword = this.passwordField.type === 'password';
        const toggleIcon = this.passwordToggle.querySelector('.toggle-icon');
        
        if (isPassword) {
            this.passwordField.type = 'text';
            toggleIcon.textContent = '🙈';
            this.passwordToggle.style.color = 'rgba(0, 255, 255, 0.8)';
        } else {
            this.passwordField.type = 'password';
            toggleIcon.textContent = '👁️';
            this.passwordToggle.style.color = 'rgba(255, 255, 255, 0.5)';
        }
        
        // Add ripple effect
        this.addRippleEffect(this.passwordToggle);
    }
    
    setupInputEnhancements() {
        [this.emailField, this.passwordField].forEach(field => {
            if (!field) return;
            
            // Add focus/blur animations
            field.addEventListener('focus', (e) => {
                const wrapper = e.target.closest('.input-wrapper');
                const glow = wrapper.querySelector('.input-glow');
                
                wrapper.style.transform = 'translateY(-2px)';
                if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.02)';
                }
            });
            
            field.addEventListener('blur', (e) => {
                const wrapper = e.target.closest('.input-wrapper');
                const glow = wrapper.querySelector('.input-glow');
                
                wrapper.style.transform = 'translateY(0)';
                if (glow && !field.matches(':focus')) {
                    glow.style.opacity = '0';
                    glow.style.transform = 'scale(1)';
                }
            });
            
            // Real-time validation
            field.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        });
    }
    
    validateField(field) {
        const isValid = field.checkValidity();
        const wrapper = field.closest('.input-wrapper');
        
        if (field.value.length > 0) {
            if (isValid) {
                wrapper.style.borderColor = 'rgba(0, 255, 128, 0.6)';
                field.style.borderColor = 'rgba(0, 255, 128, 0.6)';
            } else {
                wrapper.style.borderColor = 'rgba(255, 100, 100, 0.6)';
                field.style.borderColor = 'rgba(255, 100, 100, 0.6)';
            }
        } else {
            wrapper.style.borderColor = '';
            field.style.borderColor = '';
        }
    }
    
    setupSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addRippleEffect(button);
                
                // Simulate social login
                const platform = button.classList.contains('google-btn') ? 'Google' : 
                               button.classList.contains('apple-btn') ? 'Apple' : 'Facebook';
                
                this.showNotification(`${platform} login clicked`, 'info');
            });
        });
    }
    
    handleFormSubmit() {
        // Validate form
        const email = this.emailField.value.trim();
        const password = this.passwordField.value;
        
        if (!email || !password) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate login process
        this.simulateLogin(email, password);
    }
    
    simulateLogin(email, password) {
        const loginBtn = document.querySelector('.login-btn');
        const btnText = loginBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.textContent = 'Signing In...';
        loginBtn.style.opacity = '0.7';
        
        // Simulate API call
        setTimeout(() => {
            loginBtn.disabled = false;
            btnText.textContent = originalText;
            loginBtn.style.opacity = '1';
            
            // Simulate successful login
            this.showNotification('Login successful! Welcome back.', 'success');
            
            // Add success animation to login box
            const loginBox = document.querySelector('.login-box');
            loginBox.style.animation = 'successPulse 0.6s ease';
            
        }, 2000);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    addRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s ease';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Styling
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            font-size: 14px;
            z-index: 1000;
            backdrop-filter: blur(10px);
            animation: slideInNotification 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Type-specific styling
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, rgba(0, 255, 128, 0.9), rgba(0, 200, 100, 0.9))';
                notification.style.border = '1px solid rgba(0, 255, 128, 0.3)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, rgba(255, 100, 100, 0.9), rgba(200, 50, 50, 0.9))';
                notification.style.border = '1px solid rgba(255, 100, 100, 0.3)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.9), rgba(255, 0, 255, 0.9))';
                notification.style.border = '1px solid rgba(0, 255, 255, 0.3)';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Optimize animations for better performance
        this.optimizeAnimations();
        
        // Add prefers-reduced-motion support
        this.respectMotionPreferences();
    }
    
    optimizeAnimations() {
        // Use CSS custom properties for dynamic values
        const root = document.documentElement;
        
        // Set initial mouse position
        root.style.setProperty('--mouse-x', '0.5');
        root.style.setProperty('--mouse-y', '0.5');
        
        // Throttle mouse move events
        let ticking = false;
        
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    root.style.setProperty('--mouse-x', mouseX.toString());
                    root.style.setProperty('--mouse-y', mouseY.toString());
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
            
            // Disable complex animations
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                .reduced-motion .wave {
                    display: none;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== ADD ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); box-shadow: 0 0 60px rgba(0, 255, 128, 0.3); }
    100% { transform: scale(1); }
}

@keyframes wavePulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

@keyframes slideInNotification {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutNotification {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

/* Enhanced input glow effect */
.input-wrapper {
    transition: transform 0.2s ease;
}

.input-glow {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
`;

// Add additional styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    const waves = new InteractiveWaves();
    const form = new LoginForm();
    const optimizer = new PerformanceOptimizer();
    
    // Add loading complete animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 Futuristic Login Page initialized successfully!');
});
