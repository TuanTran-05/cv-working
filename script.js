// Global variables
let currentLang = localStorage.getItem('lang') || 'vi';

// Welcome modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome modal on first visit
    if (!localStorage.getItem('welcome_shown')) {
        const modal = document.getElementById('welcome-modal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(function() {
                modal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close welcome modal
    const closeBtn = document.getElementById('close-welcome-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('welcome-modal');
            modal.classList.remove('show');
            setTimeout(function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
            localStorage.setItem('welcome_shown', 'true');
        });
    }
    
    // Initialize language
    setLanguage(currentLang);
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Change icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-2xl';
        } else {
            icon.className = 'fas fa-times text-2xl';
        }
    });
    
    // Close mobile menu when clicking on menu items
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-2xl';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-2xl';
        }
    });
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Language switch functionality
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update language label
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
        langLabel.textContent = lang === 'vi' ? 'EN' : 'VI';
    }
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update document title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const newTitle = titleElement.getAttribute('data-lang-' + lang);
        if (newTitle) {
            document.title = newTitle;
        }
    }
    
    // Update text content and innerHTML
    document.querySelectorAll('[data-lang]').forEach(el => {
        const newText = el.getAttribute('data-lang-' + lang);
        if (newText !== null && newText !== undefined) {
            if (el.querySelector('span') || el.tagName === 'H1') {
                el.innerHTML = newText;
            } else {
                el.textContent = newText;
            }
        }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-lang-placeholder-vi],[data-lang-placeholder-en]').forEach(el => {
        const newPlaceholder = el.getAttribute('data-lang-placeholder-' + lang);
        if (newPlaceholder !== null && newPlaceholder !== undefined) {
            el.placeholder = newPlaceholder;
        }
    });
    
    // Update alt attributes for images
    document.querySelectorAll('[data-lang-alt-vi],[data-lang-alt-en]').forEach(el => {
        const newAlt = el.getAttribute('data-lang-alt-' + lang);
        if (newAlt !== null && newAlt !== undefined) {
            el.alt = newAlt;
        }
    });
    
    // Update aria-label attributes
    document.querySelectorAll('[data-lang-aria-label-vi],[data-lang-aria-label-en]').forEach(el => {
        const newAriaLabel = el.getAttribute('data-lang-aria-label-' + lang);
        if (newAriaLabel !== null && newAriaLabel !== undefined) {
            el.setAttribute('aria-label', newAriaLabel);
        }
    });
}

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', function() {
        setLanguage(currentLang === 'vi' ? 'en' : 'vi');
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    const formSuccess = document.getElementById('form-success');
    
    // Validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateField(field, validationFn = null) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + '-error');
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (value && validationFn && !validationFn(value)) {
            isValid = false;
        }
        
        if (isValid) {
            field.classList.remove('form-error');
            field.classList.add('form-success');
            errorElement.style.display = 'none';
        } else {
            field.classList.remove('form-success');
            field.classList.add('form-error');
            errorElement.style.display = 'block';
        }
        
        return isValid;
    }
    
    // Real-time validation
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (nameField) nameField.addEventListener('blur', function() { validateField(this); });
    if (emailField) emailField.addEventListener('blur', function() { validateField(this, validateEmail); });
    if (subjectField) subjectField.addEventListener('blur', function() { validateField(this); });
    if (messageField) messageField.addEventListener('blur', function() { validateField(this, (value) => value.length >= 10); });
    
    // Clear error states on focus
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.classList.remove('form-error');
            const errorEl = document.getElementById(this.id + '-error');
            if (errorEl) errorEl.style.display = 'none';
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(nameField);
        const isEmailValid = validateField(emailField, validateEmail);
        const isSubjectValid = validateField(subjectField);
        const isMessageValid = validateField(messageField, (value) => value.length >= 10);
        
        const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;
        
        if (!isFormValid) {
            const firstError = contactForm.querySelector('.form-error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = currentLang === 'vi' ? 'Đang gửi...' : 'Sending...';
        submitLoading.classList.remove('hidden');
        contactForm.classList.add('form-loading');
        
        // Create form data
        const formData = new FormData(contactForm);
        
        // Submit to Google Forms
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            // Show success message
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            
            // Remove success classes from fields
            contactForm.querySelectorAll('.form-success').forEach(field => {
                field.classList.remove('form-success');
            });
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(currentLang === 'vi' ? 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.' : 'An error occurred while sending the message. Please try again later.');
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitText.textContent = submitText.getAttribute('data-lang-' + currentLang);
            submitLoading.classList.add('hidden');
            contactForm.classList.remove('form-loading');
        });
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menu = document.getElementById('mobile-menu');
        const button = document.getElementById('mobile-menu-button');
        
        if (menu && button && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
            button.querySelector('i').className = 'fas fa-bars text-2xl';
            button.focus();
        }
    }
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Progress bar animation
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.setProperty('--progress-width', width);
                    progressBar.classList.add('animated');
                    entry.target.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[role="progressbar"]').forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Smooth Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check on page load

// Back to top button functionality (improved)
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
