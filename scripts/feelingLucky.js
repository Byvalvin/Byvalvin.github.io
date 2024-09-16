// loadFont.js



//console.log("got to feel lucky");
const feelingLuckyButton = document.querySelector('.logo-img'); // Use the logo as the Feeling Lucky button

const body = document.body;
const fonts = ['Poppins:wght@300;400;600', 'Roboto:wght@400;700', 'Lora:wght@400;700', 'Lato:wght@300;400;700',
               'Source+Sans+Pro:wght@400;700', 'Open+Sans:wght@300;400;600', 'Raleway:wght@400;700',
               'Merriweather:wght@400;700','Playfair+Display:wght@400;700', 'Montserrat:wght@400;700',  'Arial', 'Verdana'
              ];
const themes = ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19','20','21','22','23','24','25',
               ];

const applySettings = () => {
    // Change the color scheme
    const currentTheme = body.getAttribute('data-theme') || 'default';
    const newTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('selectedTheme', newTheme); 

    // Change the font
    const currentFont = window.getComputedStyle(body).fontFamily.split(',')[0].replace(/['"]/g, '');
    const newFont = fonts[(fonts.indexOf(currentFont) + 1) % fonts.length];
    changeFont(newFont); // Use the function from loadFont.js
    localStorage.setItem('selectedFont', newFont);

     // Change logo image based on theme
    const logoSrc = newTheme === '21' ? 'images/omnitrix1.jpg' : 'images/Byvalvin.jpeg';
    feelingLuckyButton.src = logoSrc;
};

if (feelingLuckyButton) {
    feelingLuckyButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        applySettings();
    });
}

