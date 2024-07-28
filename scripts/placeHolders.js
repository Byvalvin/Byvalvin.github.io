// placeHolders.js
// load components that will be on all pages


// Function to highlight the active link in the navbar
const highlightActiveLink = () => {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};
// const highlightActiveLink = () => {
//     const currentLocation = window.location.pathname;
//     const navLinks = document.querySelectorAll('.nav-links li a');

//     navLinks.forEach(link => {
//         const href = link.getAttribute('href');
//         if (currentLocation === '/' && href === 'index.html') {
//             link.classList.add('active');
//         } else if (currentLocation === href) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
// };

// Function to add a component to the page
const addComponent = ({ placeholderID, htmlURL }) => {
    console.log(placeholderID);
    document.addEventListener("DOMContentLoaded", function() {
        const componentPlaceholder = document.getElementById(placeholderID);

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

                // Highlight active link based on current URL
                highlightActiveLink();

                // Add event listener for menu toggle
                const menuToggle = document.getElementById('menu-toggle');
                const navLinks = document.getElementById('nav-links');
                
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });              
                
            } else {
                console.error(`Failed to load ${htmlURL}`);
            }
        };

        // Send the request
        xhr.send();
    });
};

// Array of components to include
const components = [
    { 
        placeholderID: "navbar-placeholder", // Placeholder ID for navbar
        htmlURL: "navbar.html" // URL to the HTML component file
    },
    {
        placeholderID: "footer-placeholder", // Placeholder ID for footer
        htmlURL: "footer.html" // URL to the HTML component file
    }
];

// Loop through each component and add it to the page
components.forEach((component) => {
    addComponent(component);
});

