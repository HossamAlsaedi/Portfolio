// Global variables
let translations = {};
let currentLang = 'en';

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('../Javascript/translation.json');
        translations = await response.json();
        
        // Load saved language preference or default to English
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        switchLanguage(savedLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Language Switcher Function
function switchLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    
    // Update HTML attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Update active button for both desktop and mobile
    document.querySelectorAll('.lang-btn, .lang-btn-mobile').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize Language Switcher
function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn, .lang-btn-mobile').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

// Portfolio Show More Functionality
function initPortfolio() {
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const projectsPerLoad = 4;
    let currentlyVisible = 0;
    
    if (!showMoreBtn) return;
    
    // Initially hide all projects
    projectCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Function to show projects with animation
    function showProjects(count) {
        for (let i = currentlyVisible; i < Math.min(currentlyVisible + count, projectCards.length); i++) {
            const card = projectCards[i];
            card.style.display = 'block';
            
            // Add animation delay for staggered effect
            setTimeout(() => {
                card.classList.add('visible');
            }, (i - currentlyVisible) * 100);
        }
        
        currentlyVisible = Math.min(currentlyVisible + count, projectCards.length);
        
        // Hide button if all projects are visible
        if (currentlyVisible >= projectCards.length) {
            showMoreBtn.classList.add('hidden');
        }
        
        // Update button text
        updateButtonText();
    }
    
    // Function to update button text
    function updateButtonText() {
    const remaining = projectCards.length - currentlyVisible;
    const nextBatch = Math.min(projectsPerLoad, remaining);

    const countSpan = document.getElementById('showMoreCount');

    if (remaining > 0) {
        countSpan.textContent = ` (${nextBatch})`;
    } else {
        countSpan.textContent = '';
    }
}

    
    // Show initial projects
    showProjects(projectsPerLoad);
    
    // Show more button click handler
    showMoreBtn.addEventListener('click', function() {
        showProjects(projectsPerLoad);
        
        // Add click animation
        showMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            showMoreBtn.style.transform = '';
        }, 150);
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
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
}

// Update active navigation link on scroll
function initScrollNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section, .hero-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add scroll effect to navbar
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
    initLanguageSwitcher();
    initPortfolio();
    initSmoothScroll();
    initScrollNavigation();
    initNavbarScroll();
});