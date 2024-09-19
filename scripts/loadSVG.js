// Function to load the SVG and set its color and attributes
// loadSVG.js

const loadSVG = () => {
    fetch('images/rotary-phone.svg')
        .then(response => response.text())
        .then(data => {
            // Inject the SVG into the DOM
            document.getElementById('contact-icon').innerHTML = data;

            // Select the SVG element
            const svgElement = document.querySelector('#contact-icon svg');
            if (svgElement) {
                // Set the color for the SVG
                svgElement.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--body-light-text-color').trim());
                
                // Set size and other attributes
                svgElement.setAttribute('width', '24'); // Set width
                svgElement.setAttribute('height', '24'); // Set height
                svgElement.setAttribute('viewBox', '0 0 24 24'); // Set viewBox if needed
                svgElement.classList.add('contact-icon'); // Add your existing class for size/transition
            }
        })
        .catch(error => console.error('Error loading SVG:', error));
};
