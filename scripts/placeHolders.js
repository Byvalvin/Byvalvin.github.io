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

// Track whether the event listener has been added
let isMenuToggleListenerAdded = false;

// Function to add a component to the page
const addComponent = ({ placeholderID, htmlURL }) => {
    console.log(placeholderID);
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

                // Highlight active link based on current URL
                highlightActiveLink();

                // Add event listener for menu toggle
                const menuToggle = document.getElementById('menu-toggle');
                const navLinks = document.getElementById('nav-links');

                if(menuToggle && navLinks){
                    
                    if (!isMenuToggleListenerAdded) {   
                        console.log("Menu toggle and nav links found, adding event listener.");
                        menuToggle.addEventListener('click', () => {
                            console.log("hamburger");
                            navLinks.classList.toggle('active');
                        }); 
                        isMenuToggleListenerAdded = true;                        
                    }else{
                        console.log("Menu toggle event listener already added.");
                    }
                    
   
                }else {
                    console.warn('Menu toggle or nav links element not found');
                }                
            } else {
                console.error(`Failed to load ${htmlURL}`);
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

