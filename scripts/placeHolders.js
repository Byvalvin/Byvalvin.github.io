// placeHolders.js
// Load components that will be on all pages

// Function to highlight the active link in the navbar
const highlightActiveLink = () => {
    const currentSection = window.location.hash.substring(1) || 'home'; // Default to 'home'
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1); // Remove the leading '#'
        let isActive = false;

        // Check for specific subpages
        if (currentSection.startsWith('projectDetails')) {
            isActive = href === 'projects';
        } else if (currentSection.startsWith('otherProjectDetails')) {
            isActive = href === 'otherProjects';
        } else {
            isActive = href === currentSection; // Default case: check against the current section
        }
        link.classList.toggle('active', isActive);
    });
};


// Function to fetch and add a component to the page
const addComponent = ({ placeholderID, htmlURL }) => {
    document.addEventListener("DOMContentLoaded", () => {
        const componentPlaceholder = document.getElementById(placeholderID);

        if (!componentPlaceholder) {
            console.error(`Placeholder with ID ${placeholderID} not found.`);
            return;
        }

        fetch(`components/${htmlURL}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${htmlURL}: Status ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                componentPlaceholder.innerHTML = html;

                // Call highlightActiveLink when navbar is loaded
                if (htmlURL === 'navbar.html') {
                    highlightActiveLink();
                    setupNavbarToggle();
                    const next = {
                        src: 'scripts/feelingLucky.js',
                        msg: 'Feeling Lucky script loaded.'
                    }
                    loadScript('scripts/applyPreferences.js', 'Preferences script loaded.', next);
                } else if (htmlURL === 'footer.html') {
                    updateFooterYear();
                }
            })
            .catch(error => console.error(error));
    });
};

// Function to setup navbar toggle
const setupNavbarToggle = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close the menu when a link is clicked
    const links = navLinks.querySelectorAll('a'); // Select all links within the nav
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active'); // Remove active class to close the menu
            menuToggle.setAttribute('aria-expanded', 'false'); // Update aria-expanded attribute
        });
    });
};

// Function to update the footer year dynamically
const updateFooterYear = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

// Function to load scripts dynamically
const loadScript = (src, successMessage, nextScript) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => {
        console.log(successMessage);
        if (nextScript) loadScript(nextScript.src, nextScript.msg, nextScript.next);
        
    };
    script.onerror = () => console.error(`Failed to load ${src}`);
    document.body.appendChild(script);
};

// Array of components to include
const components = [
    { placeholderID: "navbar-placeholder", htmlURL: "navbar.html" },
    { placeholderID: "footer-placeholder", htmlURL: "footer.html" }
];

// Add each component to the page
components.forEach(addComponent);

// Highlight active link on initial load
window.addEventListener('load', highlightActiveLink);

// Highlight active link on hash change
window.addEventListener('hashchange', highlightActiveLink);
