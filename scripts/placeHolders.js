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
    console.log(`Adding component to ${placeholderID}`);

    document.addEventListener("DOMContentLoaded", function() {
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
                // Insert the received HTML into the placeholder
                componentPlaceholder.innerHTML = xhr.responseText;

                if (htmlURL === 'navbar.html') {
                    highlightActiveLink();

                    // Add event listener for menu toggle
                    const menuToggle = document.getElementById('menu-toggle');
                    const navLinks = document.getElementById('nav-links');

                    if (menuToggle && navLinks) {
                        menuToggle.addEventListener('click', () => {
                            console.log("Hamburger menu clicked");
                            navLinks.classList.toggle('active');
                        });
                    } else {
                        console.warn('Menu toggle or nav links element not found');
                    }

                    // Dynamically load additional scripts
                    const feelingLuckyScript = document.createElement('script');
                    feelingLuckyScript.src = 'scripts/feelingLucky.js';
                    feelingLuckyScript.defer;
                    feelingLuckyScript.onload = () => {
                        console.log('Feeling Lucky script loaded.');

                        const preferencesScript = document.createElement('script');
                        preferencesScript.src = 'scripts/applyPreferences.js';
                        preferencesScript.defer;
                        preferencesScript.onload = () => {
                            console.log('Preferences script loaded.');
                        };
                        preferencesScript.onerror = () => {
                            console.error('Failed to load Preferences script.');
                        };
                        document.body.appendChild(preferencesScript);
                    };
                    feelingLuckyScript.onerror = () => {
                        console.error('Failed to load Feeling Lucky script.');
                    };
                    document.body.appendChild(feelingLuckyScript);
                } else if(htmlURL === 'footer.html'){
                    // Update the copyright year dynamically
                    document.addEventListener('DOMContentLoaded', () => {
                        const yearSpan = document.getElementById('year');
                        if (yearSpan) {
                            yearSpan.textContent = new Date().getFullYear();
                        }
                    });
                    
                } else {
                    console.log(`${htmlURL} loaded.`);
                }
            } else {
                console.error(`Failed to load ${htmlURL}: Status ${xhr.status}`);
            }
        };

        // Setup onerror callback
        xhr.onerror = function() {
            console.error(`Failed to load ${htmlURL}: Network error`);
            // Optional: Display a user-friendly error message or fallback content
        };

        // Send the request
        xhr.send();
    });
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
