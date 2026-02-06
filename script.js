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
