// placeHolders.js
// Load components that will be on all pages

// Function to highlight the active link in the navbar
const highlightActiveLink = () => {
    // Get the current path without leading slash and with query parameters removed
    let currentLocation = window.location.pathname;
    currentLocation = cleanLink(currentLocation);
    console.log("current", currentLocation);

    // Handle special case for root path
    const isRootPath = currentLocation === '' || currentLocation === 'index.html';

    // Get the nav links
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        // Normalize href to remove leading slash and query parameters
        href = cleanLink(href);

        // Determine if the href is an active link
        const isActive = isRootPath && (href === '' || href === 'index.html') ||
                         (currentLocation === href) ||
                         (first7Chars(currentLocation) === first7Chars(href));
        
        if (isActive) {
            console.log("active", href);
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

// Helper functions to clean URLs
const cleanLink = (link) => removeSlashes(removeQueryArguments(link));
const removeSlashes = (link) => link.endsWith('/') ? link.slice(0, -1) : link.startsWith('/') ? link.slice(1) : link;
const removeQueryArguments = (link) => link.split('?')[0];

// Helper for embedded links for projects: Get the first 7 characters of the href, if available
const first7Chars = (link) => link.length >= 7 ? link.substring(0, 7) : link;

// Function to setup navbar toggle
const setupNavbarToggle = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Update ARIA attribute for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
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
        if (nextScript) {
            loadScript(nextScript.src, nextScript.msg, nextScript.next);
        }
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
