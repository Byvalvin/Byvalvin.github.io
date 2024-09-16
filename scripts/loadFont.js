// scripts/loadFont.js

/**
 * Change the font of the webpage by updating or adding the Google Fonts <link> tag.
 * @param {string} fontName - The name of the font to apply (e.g., 'Poppins:wght@300;400;600').
 */
const changeFont = (fontName) => {
    // Validate the fontName parameter
    if (typeof fontName !== 'string' || !fontName.trim()) {
        console.error('Invalid font name.');
        return;
    }

    // Construct the new font URL
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;

    // Find existing font link
    let fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');

    if (fontLink) {
        // Update existing link if the URL is different
        if (fontLink.href !== fontUrl) {
            fontLink.href = fontUrl;
        }
    } else {
        // Create and append a new link element if it does not exist
        fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = fontUrl;
        document.head.appendChild(fontLink);
    }
};

// Example usage: Change the default font to any of the following
// Uncomment the line below to test different fonts
// changeFont('Roboto:wght@400;700'); // Roboto – Clean and modern
// changeFont('Lora:wght@400;700');   // Lora – Elegant with a touch of sophistication
changeFont('Poppins:wght@300;400;600'); // Poppins – Geometric and modern
// changeFont('Montserrat:wght@400;700'); // Montserrat – Bold and contemporary
// changeFont('Playfair+Display:wght@400;700'); // Playfair Display – Elegant with a classic touch
// changeFont('Raleway:wght@400;700'); // Raleway – Sleek and stylish
// changeFont('Open+Sans:wght@300;400;600'); // Open Sans – Clean and versatile
// changeFont('Source+Sans+Pro:wght@400;700'); // Source Sans Pro – Modern and legible
// changeFont('Merriweather:wght@400;700'); // Merriweather – Classic and readable
// changeFont('Lato:wght@300;400;700'); // Lato – Friendly and approachable
