

let navLinks = document.querySelectorAll('.nav-link');
let sections = document.querySelectorAll('#information, #skills, #portfolio');

// Function to get the appropriate threshold based on screen size
function getThreshold() {
    return window.matchMedia("(max-width: 768px)").matches ? 0.2 : 0.7; // 20% for small screens, 70% for larger screens
}

// Create an IntersectionObserver instance to track which section is in view
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the ID of the section in view
            let sectionId = entry.target.getAttribute('id');
            
            // Remove "active" class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add "active" class to the link corresponding to the section in view
            let activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    root: null,          // Observe the viewport
    threshold: getThreshold(), // Set threshold based on screen size
    rootMargin: '0px'   // No extra margin to trigger earlier
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = e.target.getAttribute('href'); // Get target section ID
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start'      // Align to the top of the viewport
            });

            // Manually trigger the observer logic
            observer.takeRecords(); // To ensure we take the current entries

            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Update threshold on window resize
window.addEventListener('resize', () => {
    observer.disconnect(); // Stop observing to reset with the new threshold
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));
                let activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        root: null,
        threshold: getThreshold(),
        rootMargin: '0px'
    });

    sections.forEach(section => {
        observer.observe(section); // Re-observe each section
    });
});
