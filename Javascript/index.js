        // Portfolio Show More Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const projectCards = document.querySelectorAll('.project-card');
            const showMoreBtn = document.getElementById('showMoreBtn');
            const projectsPerLoad = 4;
            let currentlyVisible = 0;
            
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
                if (remaining > 0) {
                    const nextBatch = Math.min(projectsPerLoad, remaining);
                    showMoreBtn.innerHTML = `<i class="fas fa-plus me-2"></i>Show ${nextBatch} More Project${nextBatch > 1 ? 's' : ''}`;
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
        });

        // Smooth scrolling for navigation links
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

        // Update active navigation link on scroll
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

        // Add scroll effect to navbar
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
