// loadFont.js

/*document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
        // Create the link element
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap';
        link.rel = 'stylesheet';
        
        // Append the link element to the head
        document.head.appendChild(link);
    }
});
*/


/**
 * Change the font of the webpage by updating the Google Fonts <link> tag.
 * @param {string} fontName - The name of the font to apply (e.g., 'Poppins:wght@300;400;600').
 */
export const changeFont = (fontName) => {
    let fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
    
    if (fontLink) {
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
    } else {
        fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
        document.head.appendChild(fontLink);
    }
};

// Example usage: Uncomment the line below to test different fonts

// Roboto – Clean and modern
// changeFont('Roboto:wght@400;700');

// Lora – Elegant with a touch of sophistication
// changeFont('Lora:wght@400;700');

// Poppins – Geometric and modern
changeFont('Poppins:wght@300;400;600');

// Montserrat – Bold and contemporary
// changeFont('Montserrat:wght@400;700');

// Playfair Display – Elegant with a classic touch
// changeFont('Playfair+Display:wght@400;700');

// Raleway – Sleek and stylish
// changeFont('Raleway:wght@400;700');

// Change to Open Sans
// changeFont('Open+Sans:wght@300;400;600');

// Change to Source Sans Pro
// changeFont('Source+Sans+Pro:wght@400;700');

// Change to Merriweather
// changeFont('Merriweather:wght@400;700');

// Change to Lato
// changeFont('Lato:wght@300;400;700');
