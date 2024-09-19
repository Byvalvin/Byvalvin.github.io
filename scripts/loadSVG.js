// Function to load the SVG and set its color
// loadSVG.js

const loadSVG = ()=> {
    fetch('images/rotary-phone.svg')
        .then(response => response.text())
        .then(data => {
            // Inject the SVG into the DOM
            document.getElementById('contact-icon').innerHTML = data;

            // Set the color for the SVG
            const svgElement = document.querySelector('#contact-icon svg');
            if (svgElement) {
                svgElement.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--body-light-text-color').trim());
                svgElement.classList.add('contact-icon'); // Add your existing class for size/transition
            }
        })
        .catch(error => console.error('Error loading SVG:', error));
}

// Call the function to load the SVG
loadSVG();
