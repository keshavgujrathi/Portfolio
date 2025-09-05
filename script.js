// A-COLD-WALL x Graduation Portfolio - Interactive Animations
// Sharp, fast animations triggered by scrolling and hovering

document.addEventListener('DOMContentLoaded', function() {
    
    // Custom cursor
    initCustomCursor();
    
    // Architectural blueprint background
    initBlueprintBackground();
    
    // Grid Animation System
    initGridAnimation();
    
    // Scroll-triggered animations
    initScrollAnimations();
    
    // Case study hover effects
    initCaseStudyEffects();
    
    // Smooth scrolling for internal links
    initSmoothScrolling();
    
    // Mouse-reactive grid
    initMouseReactiveGrid();
    
    // Typing animation for hero text
    initHeroTextAnimation();
    
    // Enhanced background animations
    initEnhancedBackground();
    
    // Initialize hero text with proper initial state
    initHeroInitialState();
    
    // Initialize tooltips and form
    initTooltips();
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Navigation functionality
    initNavigation();
});

// Custom Geometric Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = 'a, button, .case-study, .timeline-item, .nav-dot, .name-panel';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Hover effects
    document.querySelectorAll(hoverElements).forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Architectural Blueprint Background
function initBlueprintBackground() {
    const blueprintBg = document.querySelector('.blueprint-bg');
    const blueprintLines = document.querySelector('.blueprint-lines');
    
    // Generate blueprint lines and nodes
    const lines = [
        { x1: '10%', y1: '20%', x2: '90%', y2: '20%', width: '1px', delay: '0s' },
        { x1: '20%', y1: '10%', x2: '20%', y2: '90%', width: '1px', delay: '2s' },
        { x1: '80%', y1: '10%', x2: '80%', y2: '90%', width: '1px', delay: '4s' },
        { x1: '10%', y1: '80%', x2: '90%', y2: '80%', width: '1px', delay: '6s' },
        { x1: '30%', y1: '30%', x2: '70%', y2: '30%', width: '1px', delay: '1s' },
        { x1: '30%', y1: '70%', x2: '70%', y2: '70%', width: '1px', delay: '3s' },
        { x1: '50%', y1: '15%', x2: '50%', y2: '85%', width: '1px', delay: '5s' }
    ];
    
    const nodes = [
        { x: '20%', y: '20%', delay: '1s' },
        { x: '80%', y: '20%', delay: '3s' },
        { x: '20%', y: '80%', delay: '5s' },
        { x: '80%', y: '80%', delay: '7s' },
        { x: '50%', y: '50%', delay: '2s' },
        { x: '30%', y: '30%', delay: '4s' },
        { x: '70%', y: '70%', delay: '6s' }
    ];
    
    // Create lines
    lines.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'blueprint-line';
        lineElement.style.cssText = `
            left: ${line.x1};
            top: ${line.y1};
            width: ${Math.abs(parseFloat(line.x2) - parseFloat(line.x1))}%;
            height: ${line.width};
            animation-delay: ${line.delay};
            transform-origin: left center;
        `;
        
        if (line.y1 === line.y2) {
            // Horizontal line
            lineElement.style.left = line.x1;
            lineElement.style.top = line.y1;
            lineElement.style.width = `${Math.abs(parseFloat(line.x2) - parseFloat(line.x1))}%`;
            lineElement.style.height = line.width;
        } else {
            // Vertical line
            lineElement.style.left = line.x1;
            lineElement.style.top = line.y1;
            lineElement.style.width = line.width;
            lineElement.style.height = `${Math.abs(parseFloat(line.y2) - parseFloat(line.y1))}%`;
            lineElement.style.transform = 'scaleY(0)';
            lineElement.style.animation = `blueprintDrawVertical 8s ease-in-out infinite`;
        }
        
        blueprintLines.appendChild(lineElement);
    });
    
    // Create nodes
    nodes.forEach((node, index) => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'blueprint-node';
        nodeElement.style.cssText = `
            left: ${node.x};
            top: ${node.y};
            animation-delay: ${node.delay};
        `;
        blueprintLines.appendChild(nodeElement);
    });
    
    // Add vertical line animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blueprintDrawVertical {
            0%, 100% { transform: scaleY(0); opacity: 0; }
            50% { transform: scaleY(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Navigation functionality
function initNavigation() {
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav dot
            document.querySelectorAll('.nav-dot').forEach((dot, index) => {
                dot.classList.remove('active');
            });
            
            const sectionIndex = ['hook', 'projects', 'approach', 'contact'].indexOf(sectionId);
            if (sectionIndex >= 0) {
                document.querySelectorAll('.nav-dot')[sectionIndex].classList.add('active');
            }
        }
    };
    
    // Update active nav dot on scroll
    window.addEventListener('scroll', () => {
        const sections = ['hook', 'projects', 'approach', 'contact'];
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
                const activeDot = document.querySelectorAll('.nav-dot')[index];
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            }
        });
    });
    
    // Add interactive nav dot effects
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.4)';
            dot.style.boxShadow = '0 0 15px currentColor';
        });
        
        dot.addEventListener('mouseleave', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = dot.style.boxShadow.replace('15px', '8px');
            }
        });
    });
}

// Animated Grid Background with Mouse Interaction
function initGridAnimation() {
    const grid = document.querySelector('.animated-grid');
    if (!grid) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Create ripple effect on grid
        const intensity = Math.sin(Date.now() * 0.001) * 0.2 + 0.3;
        grid.style.opacity = intensity + (mouseX * mouseY * 0.2);
        
        // Subtle grid movement
        const translateX = (mouseX - 0.5) * 10;
        const translateY = (mouseY - 0.5) * 10;
        grid.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
}

// Mouse-reactive grid dots
function initMouseReactiveGrid() {
    const hookSection = document.querySelector('.hook-section');
    if (!hookSection) return;
    
    // Create interactive dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'interactive-dots';
    dotsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Generate grid dots
    const rows = 20;
    const cols = 30;
    
    for (let i = 0; i < rows * cols; i++) {
        const dot = document.createElement('div');
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        dot.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #8b5cf6;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.3s ease;
            left: ${(col / cols) * 100}%;
            top: ${(row / rows) * 100}%;
        `;
        
        dotsContainer.appendChild(dot);
    }
    
    hookSection.appendChild(dotsContainer);
    
    // Mouse interaction with dots
    hookSection.addEventListener('mousemove', (e) => {
        const rect = hookSection.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width;
        const mouseY = (e.clientY - rect.top) / rect.height;
        
        const dots = dotsContainer.children;
        Array.from(dots).forEach((dot, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const dotX = col / cols;
            const dotY = row / rows;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
            );
            
            if (distance < 0.1) {
                const intensity = 1 - (distance / 0.1);
                dot.style.opacity = intensity * 0.8;
                dot.style.transform = `scale(${1 + intensity * 2})`;
            } else {
                dot.style.opacity = 0;
                dot.style.transform = 'scale(1)';
            }
        });
    });
}

// Hero Text Animation with Sequential Typewriter
function initHeroTextAnimation() {
    const nameElement = document.querySelector('.hero-name');
    const taglineElement = document.querySelector('.hero-tagline');
    const rotatingWordElement = document.querySelector('.rotating-word');
    
    if (!nameElement || !taglineElement || !rotatingWordElement) return;
    
    // Start with name typing
    setTimeout(() => {
        typeText(nameElement, "Hi, I'm Keshav Gujrathi", 80, () => {
            // After name completes, start tagline
            setTimeout(() => {
                typeText(taglineElement, 'I turn data into products that move the needle', 60, () => {
                    // After tagline completes, start rotating words
                    setTimeout(() => {
                        startWordRotation(rotatingWordElement);
                    }, 500);
                });
            }, 800);
        });
    }, 500);
}

function typeText(element, text, speed, callback) {
    element.style.opacity = '1';
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

function startWordRotation(element) {
    const words = ['Fast.', 'Creative.', 'Impact.'];
    let currentIndex = 0;
    
    element.parentElement.style.opacity = '1';
    
    function typewriterEffect(word, callback) {
        let i = 0;
        element.textContent = '';
        
        function typeChar() {
            if (i < word.length) {
                element.textContent += word.charAt(i);
                i++;
                setTimeout(typeChar, 100);
            } else {
                setTimeout(() => {
                    deleteWord(callback);
                }, 1500);
            }
        }
        
        typeChar();
    }
    
    function deleteWord(callback) {
        const currentText = element.textContent;
        let i = currentText.length;
        
        function deleteChar() {
            if (i > 0) {
                element.textContent = currentText.substring(0, i - 1);
                i--;
                setTimeout(deleteChar, 80);
            } else {
                setTimeout(callback, 300);
            }
        }
        
        deleteChar();
    }
    
    function rotateWord() {
        const word = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length;
        
        typewriterEffect(word, rotateWord);
    }
    
    // Start rotation
    rotateWord();
}

// Enhanced Background Animations
function initEnhancedBackground() {
    const hookSection = document.querySelector('.hook-section');
    if (!hookSection) return;
    
    // Create floating particles
    createFloatingParticles();
    
    // Enhanced grid lines with pulsing effect
    enhanceGridLines();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
    `;
    
    document.querySelector('.hook-section').appendChild(particleContainer);
    
    // Reduce particles to 6 for better performance
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 500);
    }
    
    // Less frequent particle creation
    setInterval(() => {
        if (particleContainer.children.length < 6) {
            createParticle(particleContainer);
        }
    }, 5000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const startX = Math.random() * 100;
    const duration = Math.random() * 15 + 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--neon-purple);
        border-radius: 50%;
        left: ${startX}%;
        top: 100%;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation: floatUp ${duration}s linear forwards;
        will-change: transform;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
}

function enhanceGridLines() {
    const grid = document.querySelector('.animated-grid');
    if (!grid) return;
    
    // Simplified grid with better performance
    const pulsingLines = document.createElement('div');
    pulsingLines.className = 'pulsing-grid-lines';
    pulsingLines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(var(--neon-purple) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-purple) 1px, transparent 1px);
        background-size: 100px 100px;
        opacity: 0;
        animation: gridPulse 8s ease-in-out infinite;
        pointer-events: none;
        will-change: opacity;
    `;
    
    grid.appendChild(pulsingLines);
}

// Add CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate3d(20px, -100vh, 0);
            opacity: 0;
        }
    }
    
    @keyframes gridPulse {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.15; }
    }
`;
document.head.appendChild(enhancedStyle);

// Initialize hero elements with hidden state
function initHeroInitialState() {
    const nameElement = document.querySelector('.hero-name');
    const taglineElement = document.querySelector('.hero-tagline');
    const rotatingWord = document.querySelector('.rotating-word');
    
    if (nameElement) {
        nameElement.style.opacity = '0';
        nameElement.innerHTML = '';
    }
    
    if (taglineElement) {
        taglineElement.style.opacity = '0';
        taglineElement.innerHTML = '';
    }
    
    if (rotatingWord) {
        rotatingWord.style.opacity = '1';
        rotatingWord.parentElement.style.opacity = '1';
        rotatingWord.innerHTML = '';
    }
}

// Tooltip functionality for// Initialize tooltips and form handling
function initTooltips() {
    const badges = document.querySelectorAll('.skill-badge, .skill-pill');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const tooltip = badge.getAttribute('data-tooltip');
            if (tooltip) {
                badge.setAttribute('title', tooltip);
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Hi Keshav,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
        const mailtoLink = `mailto:gujrathikeshav94@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Email Client Opened!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'var(--accent-cyan)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'var(--neon-purple)';
            form.reset();
        }, 3000);
    });
}

// Smooth scroll animations
function initScrollAnimations() {
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
    
    // Add fade-in class to elements that should animate
    const animateElements = [
        '.section-title',
        '.case-study',
        '.philosophy',
        '.proof-in-action',
        '.toolkit-category',
        '.contact-headline'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Case Study Interactive Effects
function initCaseStudyEffects() {
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(study => {
        const visual = study.querySelector('.case-visual');
        
        study.addEventListener('mouseenter', () => {
            // Enhance visual effects on hover
            if (visual.querySelector('.heatmap-dots')) {
                const heatmap = visual.querySelector('.heatmap-dots');
                heatmap.style.animationDuration = '1s';
            }
            
            if (visual.querySelector('.face-box')) {
                const faceBox = visual.querySelector('.face-box');
                faceBox.style.animationDuration = '0.5s';
            }
            
            // Add glow effect to buttons
            const buttons = study.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.3)';
            });
        });
        
        study.addEventListener('mouseleave', () => {
            // Reset animations
            if (visual.querySelector('.heatmap-dots')) {
                const heatmap = visual.querySelector('.heatmap-dots');
                heatmap.style.animationDuration = '3s';
            }
            
            if (visual.querySelector('.face-box')) {
                const faceBox = visual.querySelector('.face-box');
                faceBox.style.animationDuration = '2s';
            }
            
            // Remove glow from buttons
            const buttons = study.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.style.boxShadow = 'none';
            });
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translateY(0) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for sections
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.case-visual');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced contact email interaction
document.addEventListener('DOMContentLoaded', () => {
    const contactEmail = document.querySelector('.contact-email');
    if (contactEmail) {
        contactEmail.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(139, 92, 246, 0.1);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = contactEmail.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = -size / 2 + 'px';
            ripple.style.marginTop = -size / 2 + 'px';
            
            contactEmail.style.position = 'relative';
            contactEmail.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .case-study {
        position: relative;
        overflow: hidden;
    }
    
    .case-study::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
        transition: left 0.5s;
        z-index: 1;
    }
    
    .case-study:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(initParallaxEffect, 16);
window.addEventListener('scroll', throttledParallax);
