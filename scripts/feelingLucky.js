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
const changeFont = (fontName) => {
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
// feelingLucky.js


document.addEventListener('DOMContentLoaded', function () {
    const feelingLuckyButton = document.querySelector('.logo-img'); // Use the logo as the Feeling Lucky button
    const body = document.body;
    const fonts = ['Poppins:wght@300;400;600', 'Roboto:wght@400;700', 'Arial', 'Verdana'];
    const themes = ['default', '1', '2', '3'];

    if (feelingLuckyButton) {
        feelingLuckyButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Change the color scheme
            const currentTheme = body.getAttribute('data-theme') || 'default';
            const newTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
            body.setAttribute('data-theme', newTheme);

            // Change the font
            const currentFont = window.getComputedStyle(body).fontFamily.split(',')[0].replace(/['"]/g, '');
            const newFont = fonts[(fonts.indexOf(currentFont) + 1) % fonts.length];
            changeFont(newFont); // Use the function from loadFont.js
        });
    }
});