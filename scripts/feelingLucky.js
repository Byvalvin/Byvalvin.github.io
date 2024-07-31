// loadFont.js


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
