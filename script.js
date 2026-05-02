document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.mission-card, .event-card, .program-item, .founder-card, .support-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Counter Animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            gsap.from(counter, { scale: 1.5, duration: 1, ease: 'elastic.out(1, 0.3)' });
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const increment = target / 100;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const impactSection = document.querySelector('#impact');
    if (impactSection) {
        const impactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                impactObserver.unobserve(impactSection);
            }
        }, { threshold: 0.2 });
        impactObserver.observe(impactSection);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });

        const hideMenu = () => {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeMenu) closeMenu.addEventListener('click', hideMenu);
        mobileLinks.forEach(link => link.addEventListener('click', hideMenu));
    }

    // Form Submission
    const contactForm = document.getElementById('just-arts-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#81B29A';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Impact Calculator
    const slider = document.getElementById('impact-slider');
    const amountDisplay = document.getElementById('calc-amount');
    const textDisplay = document.getElementById('impact-text');

    if (slider && amountDisplay && textDisplay) {
        const impactLevels = [
            { threshold: 25, text: "Provides one week of art supplies for a student." },
            { threshold: 50, text: "Funds a specialized guest artist masterclass." },
            { threshold: 100, text: "Sponsors one full month of materials for a student." },
            { threshold: 250, text: "Covers a full scholarship for a 6-week culinary intensive." },
            { threshold: 500, text: "Funds the costume and set design for a theatre production." },
            { threshold: 750, text: "Powers our community outreach program for an entire neighborhood." },
            { threshold: 1000, text: "Sponsors a student's entire creative journey for one year." }
        ];

        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            amountDisplay.innerText = `$${val}`;
            const level = [...impactLevels].reverse().find(l => val >= l.threshold);
            if (level) textDisplay.innerText = level.text;
        });
    }

    // Portfolio Modals
    const modal = document.getElementById('portfolio-modal');
    if (modal) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('modal-img').src = item.querySelector('img').src;
                document.getElementById('modal-title').innerText = item.querySelector('h4').innerText;
                document.getElementById('modal-student').innerText = item.getAttribute('data-student');
                document.getElementById('modal-age').innerText = item.getAttribute('data-age');
                document.getElementById('modal-statement').innerText = item.getAttribute('data-statement');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const hideModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        const closeModal = modal.querySelector('.close-modal');
        if (closeModal) closeModal.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
    }

    // Scroll Logic (Combined)
    window.addEventListener('scroll', () => {
        const winScroll = window.scrollY;
        
        // Scroll Progress
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) progressBar.style.width = scrolled + '%';

        // Scroll-Spy & Hero Parallax
        const sections = document.querySelectorAll('section, header');
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const hero = document.querySelector('.hero-content');
        
        if (hero) {
            hero.style.transform = `translateY(${winScroll * 0.4}px)`;
            hero.style.opacity = 1 - (winScroll / 700);
        }

        let current = "";
        sections.forEach(section => {
            if (winScroll >= section.offsetTop - 150) current = section.getAttribute('id');
        });

        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href').substring(1) === current);
        });
    });
});

// Cursor Interaction (Global)
window.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (cursor && follower) {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.3 });
    }
});

// GSAP Init
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

/* Magnetic Buttons */
document.querySelectorAll('.btn, .cta-btn, .shop-btn, .mobile-nav-item, .social-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
});

// Hero Staggered Reveal
gsap.from('.hero-title', { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out', delay: 1 });
gsap.from('.hero-subtitle', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', delay: 1.8 });
gsap.from('.hero-actions .btn', { opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)', delay: 2.2 });

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    }
});

