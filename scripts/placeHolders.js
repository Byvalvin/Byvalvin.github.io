// placeHolders.js
// Load components that will be on all pages

// Function to highlight the active link in the navbar
const highlightActiveLink = () => {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentLocation === href || (currentLocation === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Function to add a component to the page
const addComponent = ({ placeholderID, htmlURL }) => {
    document.addEventListener("DOMContentLoaded", () => {
        const componentPlaceholder = document.getElementById(placeholderID);

        if (!componentPlaceholder) {
            console.error(`Placeholder with ID ${placeholderID} not found.`);
            return;
        }

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Construct the URL to fetch the HTML component
        const url = `components/${htmlURL}`;

        // Configure the XMLHttpRequest
        xhr.open('GET', url, true);

        // Setup onload callback
        xhr.onload = function() {
            if (xhr.status === 200) {
                componentPlaceholder.innerHTML = xhr.responseText;

                if (htmlURL === 'navbar.html') {
                    highlightActiveLink();

                    const menuToggle = document.getElementById('menu-toggle');
                    const navLinks = document.getElementById('nav-links');

                    if (menuToggle && navLinks) {
                        menuToggle.addEventListener('click', () => {
                            navLinks.classList.toggle('active');
                        });
                    }

                    // Dynamically load additional scripts
                    loadScript('scripts/feelingLucky.js', 'Feeling Lucky script loaded.');
                    loadScript('scripts/applyPreferences.js', 'Preferences script loaded.');
                } else if (htmlURL === 'footer.html') {
                    // Update the copyright year dynamically
                    const yearSpan = document.getElementById('year');
                    if (yearSpan) {
                        yearSpan.textContent = new Date().getFullYear();
                    }
                }
            } else {
                console.error(`Failed to load ${htmlURL}: Status ${xhr.status}`);
            }
        };

        // Setup onerror callback
        xhr.onerror = function() {
            console.error(`Failed to load ${htmlURL}: Network error`);
        };

        // Send the request
        xhr.send();
    });
};

// Function to load a script dynamically
const loadScript = (src, successMessage) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => console.log(successMessage);
    script.onerror = () => console.error(`Failed to load ${src}`);
    document.body.appendChild(script);
};

// Array of components to include
const components = [
    { 
        placeholderID: "navbar-placeholder",
        htmlURL: "navbar.html"
    },
    {
        placeholderID: "footer-placeholder",
        htmlURL: "footer.html"
    }
];

// Loop through each component and add it to the page
components.forEach((component) => {
    addComponent(component);
});
