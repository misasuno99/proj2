// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== PARTÍCULAS NO HERO =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== ANIMAÇÃO DE CONTAGEM DE NÚMEROS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observer para ativar a contagem quando visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== ANIMAÇÕES DE SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            const delay = element.getAttribute('data-delay') || 0;
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 1600);
});

// ===== CAROUSEL =====
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');
let currentSlide = 0;
let autoSlideInterval;

// Criar dots
carouselItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        dots[index].classList.remove('active');
        if (index === currentSlide) {
            item.classList.add('active');
            dots[index].classList.add('active');
        }
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

// Suporte a swipe no carousel
let touchStartX = 0;
let touchEndX = 0;
const carousel = document.getElementById('carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
        resetAutoSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
        resetAutoSlide();
    }
}

// ===== EFEITO DE CONFETES =====
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];
const confettiColors = ['#ffd700', '#f5a623', '#00b894', '#ff6b6b', '#4ecdc4', '#45b7d1'];

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
        this.size = Math.random() * 8 + 4;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 0.2 - 0.1;
        this.drift = Math.random() * 2 - 1;
    }
    
    update() {
        this.y += this.speed;
        this.x += this.drift;
        this.angle += this.spin;
        
        if (this.y > confettiCanvas.height + 50) {
            this.y = -50;
            this.x = Math.random() * confettiCanvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        ctx.restore();
    }
}

// Criar confetes
for (let i = 0; i < 100; i++) {
    confettiPieces.push(new Confetti());
}

let confettiActive = false;

function animateConfetti() {
    if (!confettiActive) {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        return;
    }
    
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiPieces.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

// Ativar confetes em momentos especiais
function triggerConfetti(duration = 3000) {
    confettiActive = true;
    animateConfetti();
    
    setTimeout(() => {
        confettiActive = false;
    }, duration);
}

// Confetes ao carregar a página
window.addEventListener('load', () => {
    setTimeout(() => {
        triggerConfetti(4000);
    }, 1500);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== EFEITO PARALLAX NO HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBall = document.getElementById('heroBall');
    
    if (heroBall) {
        heroBall.style.transform = `rotate(${scrolled * 0.5}deg) translateY(${scrolled * 0.3}px)`;
    }
});

// ===== EFEITO DE ONDULAÇÃO NOS CARDS =====
document.querySelectorAll('.country-card, .stadium-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== SCROLL SUAVE PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== EFEITO DE DIGITAÇÃO NO HERO (OPCIONAL) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== ANIMAÇÃO DE ENTRADA PARA TIMELINE =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// ===== EFEITO DE BRILHO NOS TÍTULOS =====
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.textShadow = 'none';
    });
});

// ===== RESIZE HANDLER PARA CANVAS =====
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// ===== EFEITO DE SCROLL REVEAL PARA SEÇÕES =====
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
});

// ===== EFEITO ESPECIAL: EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Super confete!
        triggerConfetti(8000);
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        konamiCode = [];
    }
});

// Adicionar animação rainbow dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('⚽ Copa do Mundo 2026 - Site carregado com sucesso!');
console.log('🎮 Tente o código Konami: ↑↑↓↓←→←→BA');
