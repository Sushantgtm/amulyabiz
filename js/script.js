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

// Contact Form Handling with Formspree Integration
// This script handles form validation, submission, and user feedback
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Get form elements for validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceSelect = document.getElementById('service');
    const messageTextarea = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Get message containers
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{7,20}$/;

    // Real-time validation function
    function validateField(field, pattern = null, minLength = 0) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        const formGroup = field.closest('.form-group');

        // Reset previous error state
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        formGroup.classList.remove('error');

        // Check if field is empty
        if (field.hasAttribute('required') && !value) {
            errorElement.textContent = 'This field is required';
            errorElement.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }

        // Check minimum length
        if (minLength > 0 && value.length < minLength) {
            errorElement.textContent = `Minimum ${minLength} characters required`;
            errorElement.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }

        // Check pattern validation
        if (pattern && value && !pattern.test(value)) {
            switch(field.id) {
                case 'email':
                    errorElement.textContent = 'Please enter a valid email address';
                    break;
                case 'phone':
                    errorElement.textContent = 'Please enter a valid phone number';
                    break;
                default:
                    errorElement.textContent = 'Please enter valid information';
            }
            errorElement.classList.add('show');
            formGroup.classList.add('error');
            return false;
        }

        return true;
    }

    // Add real-time validation to form fields
    nameInput.addEventListener('blur', () => validateField(nameInput, null, 2));
    emailInput.addEventListener('blur', () => validateField(emailInput, emailPattern));
    phoneInput.addEventListener('blur', () => validateField(phoneInput, phonePattern, 7));
    serviceSelect.addEventListener('blur', () => validateField(serviceSelect));
    messageTextarea.addEventListener('blur', () => validateField(messageTextarea, null, 10));

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        // Prevent default form submission initially
        e.preventDefault();

        // Validate all fields before submission
        const isNameValid = validateField(nameInput, null, 2);
        const isEmailValid = validateField(emailInput, emailPattern);
        const isPhoneValid = validateField(phoneInput, phonePattern, 7);
        const isServiceValid = validateField(serviceSelect);
        const isMessageValid = validateField(messageTextarea, null, 10);

        // If any validation fails, stop submission
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isMessageValid) {
            // Scroll to first error
            const firstError = document.querySelector('.error-text.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Hide any previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        // Prepare form data for submission
        const formData = new FormData(contactForm);

        // Submit form using fetch API for better error handling
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success - show success message
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';

                // Reset form
                contactForm.reset();

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide success message after 5 seconds and redirect
                setTimeout(() => {
                    window.location.href = contactForm.querySelector('input[name="_next"]').value;
                }, 3000);

            } else {
                // Handle Formspree errors
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);

            // Show error message
            successMessage.style.display = 'none';
            errorMessage.style.display = 'block';

            // Scroll to error message
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        });
    });

    // Clear validation errors when user starts typing
    [nameInput, emailInput, phoneInput, serviceSelect, messageTextarea].forEach(field => {
        field.addEventListener('input', () => {
            const errorElement = document.getElementById(field.id + 'Error');
            const formGroup = field.closest('.form-group');

            if (errorElement.classList.contains('show')) {
                errorElement.classList.remove('show');
                formGroup.classList.remove('error');
            }
        });
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