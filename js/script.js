// Test if script is loading
console.log('Script loaded successfully!');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Hamburger Menu Functionality - Opens Main Menu Modal
    const hamburger = document.querySelector('.hamburger');

    console.log('Looking for hamburger...');
    console.log('Hamburger found:', hamburger);

    if (hamburger) {
        console.log('✅ Hamburger menu setup successful');

        // Simple click handler - opens main menu modal
        hamburger.addEventListener('click', function() {
            console.log('🎯 Hamburger clicked - opening main menu modal!');
            openModal('main-menu');
        });

    } else {
        console.error('❌ Hamburger not found!');
    }
});

// Hero Image Slideshow
const heroImages = [
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
];

let currentImageIndex = 0;
const heroImage = document.getElementById('hero-image');

if (heroImage) {
    function changeImage() {
        heroImage.style.opacity = 0;
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImage.src = heroImages[currentImageIndex];
            heroImage.style.opacity = 1;
        }, 500);
    }

    setInterval(changeImage, 5000);
}

// Contact Form Handling - Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Formspree handles the submission automatically
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Formspree will redirect to thank-you page automatically
        // This is just a fallback in case of issues
        setTimeout(() => {
            if (!window.location.href.includes('thank-you')) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 5000);
    });
}

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe cards for animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// Observe service items
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.style.animationPlayState = 'paused';
    observer.observe(item);
});

// Navbar active link (for single page, but since multi-page, this is basic)
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Smooth scroll for anchor links
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

// Simple close function for menu links
window.closeMainMenu = function() {
    const mainMenuModal = document.getElementById('main-menu-modal');
    if (mainMenuModal) {
        closeModal(mainMenuModal);
    }
};

// Modal functions for main menu only
function openModal(modalId) {
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside or on close button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
        const modal = e.target.closest('.modal') || e.target;
        closeModal(modal);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal[style*="display: block"]');
        modals.forEach(modal => closeModal(modal));
    }
});

console.log('✅ Simple navigation setup complete');