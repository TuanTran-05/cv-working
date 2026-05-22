// ============================================
// Trần Anh Tuấn — Personal CV Website
// ============================================

// Global state
let currentLang = localStorage.getItem('lang') || 'vi';

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    setLanguage(currentLang);
    
    // Initialize theme
    initTheme();
    
    // Welcome modal
    initWelcomeModal();
    
    // Trigger initial scroll checks
    revealOnScroll();
});

// ============================================
// Theme (Dark/Light Mode)
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    updateThemeIcons(savedTheme);
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
    const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    document.querySelectorAll('.theme-toggle i').forEach(function(el) {
        el.className = 'fas ' + icon;
    });
}

// Desktop dark toggle
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
    darkToggle.addEventListener('click', toggleTheme);
}

// Mobile dark toggle
const darkToggleMobile = document.getElementById('dark-toggle-mobile');
if (darkToggleMobile) {
    darkToggleMobile.addEventListener('click', toggleTheme);
}

// ============================================
// Language Switch
// ============================================
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update all lang labels (desktop + mobile)
    document.querySelectorAll('.lang-label').forEach(function(el) {
        el.textContent = lang === 'vi' ? 'EN' : 'VI';
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update document title
    var titleElement = document.querySelector('title');
    if (titleElement) {
        var newTitle = titleElement.getAttribute('data-lang-' + lang);
        if (newTitle) document.title = newTitle;
    }
    
    // Update text content and innerHTML
    document.querySelectorAll('[data-lang]').forEach(function(el) {
        var newText = el.getAttribute('data-lang-' + lang);
        if (newText !== null && newText !== undefined) {
            // Use innerHTML for elements that contain HTML (like spans)
            if (newText.indexOf('<') !== -1 || el.tagName === 'H1') {
                el.innerHTML = newText;
            } else {
                el.textContent = newText;
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-lang-placeholder-vi],[data-lang-placeholder-en]').forEach(function(el) {
        var newPlaceholder = el.getAttribute('data-lang-placeholder-' + lang);
        if (newPlaceholder) el.placeholder = newPlaceholder;
    });
    
    // Update alt attributes
    document.querySelectorAll('[data-lang-alt-vi],[data-lang-alt-en]').forEach(function(el) {
        var newAlt = el.getAttribute('data-lang-alt-' + lang);
        if (newAlt) el.alt = newAlt;
    });
    
    // Update aria-label attributes
    document.querySelectorAll('[data-lang-aria-label-vi],[data-lang-aria-label-en]').forEach(function(el) {
        var newAriaLabel = el.getAttribute('data-lang-aria-label-' + lang);
        if (newAriaLabel) el.setAttribute('aria-label', newAriaLabel);
    });
}

function toggleLanguage() {
    setLanguage(currentLang === 'vi' ? 'en' : 'vi');
}

// Desktop lang toggle
var langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
}

// Mobile lang toggle
var langToggleMobile = document.getElementById('lang-toggle-mobile');
if (langToggleMobile) {
    langToggleMobile.addEventListener('click', toggleLanguage);
}

// ============================================
// Mobile Menu
// ============================================
var mobileMenuButton = document.getElementById('mobile-menu-button');
var mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        var isOpen = mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open');
        this.setAttribute('aria-expanded', !isOpen);
        
        // Toggle icon
        var icon = this.querySelector('i');
        icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenuButton) {
        mobileMenu.classList.remove('open');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
}

// ============================================
// Back to Top Button
// ============================================
var backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============================================
// Welcome Modal
// ============================================
function initWelcomeModal() {
    var modal = document.getElementById('welcome-modal');
    var closeBtn = document.getElementById('close-welcome-modal');
    
    if (!modal) return;
    
    // Show on first visit
    if (!localStorage.getItem('welcome_shown')) {
        // Small delay for smooth entrance
        setTimeout(function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 300);
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeWelcomeModal(modal);
        });
    }
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeWelcomeModal(modal);
    });
}

function closeWelcomeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    localStorage.setItem('welcome_shown', 'true');
}

// ============================================
// Form Validation & Web3Forms Submission
// ============================================
var contactForm = document.getElementById('contact-form');

if (contactForm) {
    var submitBtn = document.getElementById('submit-btn');
    var submitText = document.getElementById('submit-text');
    var submitLoading = document.getElementById('submit-loading');
    var formSuccess = document.getElementById('form-success');
    
    // Validation helpers
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function validateField(field, validationFn) {
        var value = field.value.trim();
        var errorEl = document.getElementById(field.id + '-error');
        var isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (value && validationFn && !validationFn(value)) {
            isValid = false;
        }
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorEl) errorEl.style.display = 'none';
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            if (errorEl) errorEl.style.display = 'block';
        }
        
        return isValid;
    }
    
    // Field references
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var subjectField = document.getElementById('subject');
    var messageField = document.getElementById('message');
    
    // Real-time validation on blur
    if (nameField) nameField.addEventListener('blur', function() { validateField(nameField); });
    if (emailField) emailField.addEventListener('blur', function() { validateField(emailField, validateEmail); });
    if (subjectField) subjectField.addEventListener('blur', function() { validateField(subjectField); });
    if (messageField) messageField.addEventListener('blur', function() { validateField(messageField, function(v) { return v.length >= 10; }); });
    
    // Clear errors on focus
    contactForm.querySelectorAll('.form-input').forEach(function(field) {
        field.addEventListener('focus', function() {
            this.classList.remove('error');
            var errorEl = document.getElementById(this.id + '-error');
            if (errorEl) errorEl.style.display = 'none';
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        var isNameValid = validateField(nameField);
        var isEmailValid = validateField(emailField, validateEmail);
        var isSubjectValid = validateField(subjectField);
        var isMessageValid = validateField(messageField, function(v) { return v.length >= 10; });
        
        if (!(isNameValid && isEmailValid && isSubjectValid && isMessageValid)) {
            var firstError = contactForm.querySelector('.form-input.error');
            if (firstError) firstError.focus();
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = currentLang === 'vi' ? 'Đang gửi...' : 'Sending...';
        submitLoading.style.display = 'inline-block';
        
        // Submit to Web3Forms
        var formData = new FormData(contactForm);
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            if (result.success) {
                // Show success
                formSuccess.style.display = 'flex';
                contactForm.reset();
                
                // Remove success classes from fields
                contactForm.querySelectorAll('.form-input.success').forEach(function(f) {
                    f.classList.remove('success');
                });
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide after 5 seconds
                setTimeout(function() {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        })
        .catch(function(error) {
            console.error('Form submission error:', error);
            alert(currentLang === 'vi'
                ? 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
                : 'An error occurred while sending the message. Please try again later.'
            );
        })
        .finally(function() {
            // Reset button
            submitBtn.disabled = false;
            submitText.textContent = submitText.getAttribute('data-lang-' + currentLang) ||
                (currentLang === 'vi' ? 'Gửi Tin Nhắn' : 'Send Message');
            submitLoading.style.display = 'none';
        });
    });
}

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', function(e) {
    // Escape closes mobile menu and welcome modal
    if (e.key === 'Escape') {
        closeMobileMenu();
        
        var modal = document.getElementById('welcome-modal');
        if (modal && modal.classList.contains('show')) {
            closeWelcomeModal(modal);
        }
    }
});

// ============================================
// Scroll Reveal Animations
// ============================================
var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

function revealOnScroll() {
    var windowHeight = window.innerHeight;
    var revealPoint = 120;
    
    revealElements.forEach(function(element) {
        var elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

// ============================================
// Progress Bar Animations (IntersectionObserver)
// ============================================
if ('IntersectionObserver' in window) {
    var progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var fill = entry.target.querySelector('.skill-bar-fill');
                if (fill && !fill.classList.contains('animated')) {
                    var width = fill.style.width;
                    fill.style.setProperty('--progress-width', width);
                    fill.style.width = '0';
                    // Trigger reflow then animate
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            fill.classList.add('animated');
                        });
                    });
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[role="progressbar"]').forEach(function(bar) {
        progressObserver.observe(bar);
    });
}

// ============================================
// Active Nav Link on Scroll
// ============================================
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
