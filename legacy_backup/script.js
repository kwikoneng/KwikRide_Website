// KwikRide Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {

    // Reveal on Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 3D Tilt & Parallax Effect for Hero Image
    const heroSection = document.querySelector('.hero-section');
    const heroImg = document.querySelector('.hero-img');
    const floatCards = document.querySelectorAll('.float-card');

    if (heroSection && heroImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;

            // Tilt + Move (Parallax)
            heroImg.style.transform = `
                perspective(1000px) 
                rotateY(${x}deg) 
                rotateX(${y}deg)
                translateX(${x * 2}px)
                translateY(${y * 2}px)
            `;

            // Parallax for floating cards (move faster for depth)
            floatCards.forEach((card, index) => {
                const speed = (index + 1) * 3;
                card.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImg.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg)`;
            floatCards.forEach(card => {
                card.style.transform = 'none';
            });
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.border = '1px solid rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.03)';
            navbar.style.border = '1px solid rgba(255,255,255,0.08)';
        }
    });

});
