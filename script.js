document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        // Cursor hover effect on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'var(--primary)',
                    duration: 0.3
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'var(--primary)',
                    duration: 0.3
                });
            });
        });
    }

    // Navbar Elements
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');
    const navContainer = document.querySelector('.nav-container');
    
    // Animate nav items on page load
    gsap.from('.nav-link', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
    });

    // Navbar Scroll Effect
    let lastScroll = 0;
    const navHeight = nav.offsetHeight;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Navbar background change on scroll
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll <= 0) {
            gsap.to(nav, { y: 0, duration: 0.6, ease: 'power3.out' });
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > navHeight) {
            // Scrolling down
            gsap.to(nav, {
                y: -navHeight - 10,
                duration: 0.6,
                ease: 'power3.out'
            });
        } else if (currentScroll < lastScroll) {
            // Scrolling up
            gsap.to(nav, {
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        }
        
        lastScroll = currentScroll;
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 10);
    });

    // Navbar Link Hover Animation
    navLinks.forEach((link, index) => {
        // Initial state
        gsap.set(link, { 
            y: 0,
            opacity: 0,
            y: 20
        });
        
        // Animate in with delay based on index
        gsap.to(link, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5 + (index * 0.08),
            ease: 'back.out(1.4)'
        });
        
        // Hover animation
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -3,
                duration: 0.3,
                ease: 'power2.out',
                color: '#6C63FF'
            });
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            link.appendChild(ripple);
            
            gsap.fromTo(ripple, 
                { scale: 0, opacity: 0.3 },
                { 
                    scale: 2, 
                    opacity: 0, 
                    duration: 0.8, 
                    onComplete: () => ripple.remove() 
                }
            );
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                color: '#333'
            });
        });
        
        // Active link indicator on scroll
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(section);
        }
    });

    // Logo Hover Animation
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                y: -2
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                y: 0
            });
        });
    }

    // Hero text animation
    const heroTl = gsap.timeline();
    
    // Animate hero content
    heroTl.from('.hero h1', { 
        y: 100, 
        opacity: 0, 
        skewY: 20, 
        filter: "blur(5px)",
        duration: 1.5, 
        ease: "power3.out" 
    }, 1)
    .from('.hero p', {
        y: 30,
        opacity: 0,
    }, "-=1")
    .from('.cta-btns', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        ease: "power4.out"
    }, "-1");

    // Card animations
    const heroCards = document.querySelectorAll('.hero-card');
    const cardsContainer = document.querySelector('.hero-cards-container');

    if (heroCards.length > 0) {
        // Set initial state
        gsap.set(heroCards, {
            y: -1000,
            x: 600,
            rotation: 120,
            scale: 0.5,
            opacity: 0,
            transformOrigin: "center center"
        });

        // Animate cards into position with staggered timing
        heroCards.forEach((card, i) => {
            const rotation = (i - 1.5) * 12;
            const yPos = i * 30;
            const xPos = i * 60;
            const delay = 0.5 + (i * 0.15);
            
            // Initial animation to final position
            gsap.to(card, {
                y: yPos,
                x: xPos,
                rotation: rotation,
                scale: 1,
                opacity: 1,
                duration: 1.5,
                delay: delay,
                ease: "power4.out"
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.1,
                    zIndex: 100,
                    rotation: rotation * 0.2, // Slight rotation on hover
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    zIndex: heroCards.length - i,
                    rotation: rotation,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

        // Parallax effect
        window.addEventListener('mousemove', (e) => {
            const xVal = (e.clientX / window.innerWidth - 0.5) * 30; // Reduced movement
            const yVal = (e.clientY / window.innerHeight - 0.5) * 30; // Reduced movement
            
            gsap.to(cardsContainer, {
                x: xVal,
                y: yVal,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }

    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 100 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            }
        );
    });
});