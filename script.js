// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Parallax & Slideshow Interaction
const heroSection = document.querySelector('main');
const riderSlideshow = document.getElementById('rider-slideshow');
const floatCards = document.querySelectorAll('.float-card');

// Slideshow Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-img');
const totalSlides = slides.length;

if (totalSlides > 1) {
    setInterval(() => {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].style.opacity = '1';
    }, 4000); // Change every 4 seconds
}

if (heroSection && riderSlideshow) {
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (window.innerWidth / 2 - e.pageX) / 30;
        const yPos = (window.innerHeight / 2 - e.pageY) / 30;

        // Animate Slideshow Container
        riderSlideshow.style.transform = `
            perspective(1000px)
            rotateY(${xPos}deg)
            rotateX(${yPos}deg)
            translate(${xPos * 2}px, ${yPos * 2}px)
        `;

        // Animate Cards Opposite Direction
        floatCards.forEach((card, i) => {
            const factor = (i + 1) * 2;
            card.style.transform = `translate(${xPos * -factor}px, ${yPos * -factor}px)`;
        });
    });

    // Reset on leave
    heroSection.addEventListener('mouseleave', () => {
        riderSlideshow.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        floatCards.forEach(card => {
            card.style.transform = 'translate(0, 0)';
        });
    });
}

// Initial Load Animation Sequence
const tl = gsap.timeline();

tl.from('.glass-nav', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})
    .from('.animate-fade-in-up', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5")
    .from('.parallax-container', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

// Scroll Animations for Features
gsap.utils.toArray('.scroll-trigger').forEach((element) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu() {
    if (mobileMenu.classList.contains('translate-x-full')) {
        mobileMenu.classList.remove('translate-x-full');
    } else {
        mobileMenu.classList.add('translate-x-full');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
}

// Button Feedback (Demonstration)
document.querySelectorAll('button:not(#mobile-menu-btn):not(#close-menu-btn)').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Only if it's not strictly a link (buttons usually invoke actions)
        if (!btn.closest('a')) {
            alert('🚀 In a real app, this would open ' + btn.innerText + ' or submit your form!');
        }
    });
});
// Text Rotator Logic
const rotaterElement = document.getElementById('hero-rotator');
if (rotaterElement) {
    const phrases = ["Fast.", "Safely.", "Freely.", "Like Magic."];
    let phraseIndex = 0;

    setInterval(() => {
        // Fade Out
        rotaterElement.style.opacity = '0';
        rotaterElement.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            // Change Text
            phraseIndex = (phraseIndex + 1) % phrases.length;
            rotaterElement.innerText = phrases[phraseIndex];

            // Fade In
            rotaterElement.style.opacity = '1';
        }, 300);

    }, 2500); // Change every 2.5 seconds
}

// Sliding Mockups Logic (Swapping Positions)
const mockup1 = document.getElementById('mockup-1');
const mockup2 = document.getElementById('mockup-2');

if (mockup1 && mockup2) {
    let activeMockup = 1;

    setInterval(() => {
        if (activeMockup === 1) {
            // Swap to Mockup 2 (Android) focused
            mockup2.style.transform = 'translateX(-50%) rotate(0deg) scale(1)';
            mockup2.style.zIndex = '20';
            mockup2.style.opacity = '1';

            mockup1.style.transform = 'translateX(-90%) rotate(-3deg) scale(0.9)';
            mockup1.style.zIndex = '10';
            mockup1.style.opacity = '0.6';

            activeMockup = 2;
        } else {
            // Swap to Mockup 1 (iPhone) focused
            mockup1.style.transform = 'translateX(-50%) rotate(0deg) scale(1)';
            mockup1.style.zIndex = '20';
            mockup1.style.opacity = '1';

            mockup2.style.transform = 'translateX(-10%) rotate(3deg) scale(0.9)';
            mockup2.style.zIndex = '10';
            mockup2.style.opacity = '0.6';

            activeMockup = 1;
        }
    }, 4000); // Swap every 4 seconds
}
