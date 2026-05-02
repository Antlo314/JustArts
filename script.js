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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply observer to sections and cards
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
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 100;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when impact section is visible
    const impactSection = document.querySelector('#impact');
    const impactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            impactObserver.unobserve(impactSection);
        }
    }, { threshold: 0.2 }); /* Reduced threshold for better reliability */

    if (impactSection) impactObserver.observe(impactSection);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            if (menuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
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
    // Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (track && dots.length > 0) {
        const updateSlider = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateSlider(index));
        });

        // Auto slide
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Impact Calculator
    const slider = document.getElementById('impact-slider');
    const amountDisplay = document.getElementById('calc-amount');
    const textDisplay = document.getElementById('impact-text');

    if (slider) {
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
            
            // Fixed reverse logic
            const levels = [...impactLevels].reverse();
            const level = levels.find(l => val >= l.threshold);
            if (level) textDisplay.innerText = level.text;
        });
    }

    // Portfolio Modals
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('portfolio-modal');
    const closeModal = document.querySelector('.close-modal');

    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img').src;
                const title = item.querySelector('h4').innerText;
                const student = item.getAttribute('data-student');
                const age = item.getAttribute('data-age');
                const statement = item.getAttribute('data-statement');

                document.getElementById('modal-img').src = img;
                document.getElementById('modal-title').innerText = title;
                document.getElementById('modal-student').innerText = student;
                document.getElementById('modal-age').innerText = age;
                document.getElementById('modal-statement').innerText = statement;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const hideModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeModal.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }
    // Mobile Bottom Nav Active State on Scroll
    const bottomNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});

/* Premium Interactions */
window.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if(cursor && follower) {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.3 });
    }
});

// GSAP Scroll Reveals
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

// Hero Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if(hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Nav Click Fix
document.querySelectorAll('.nav-links a, .mobile-nav-links a, .mobile-nav-item').forEach(link => {
    link.onclick = (e) => {
        const targetId = link.getAttribute('href');
        if(targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    };
});


/* Elite Script Polish */
window.addEventListener('scroll', () => {
    // Scroll Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if(progressBar) progressBar.style.width = scrolled + '%';

    // Scroll-Spy Highlighting
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.mobile-nav-item');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

