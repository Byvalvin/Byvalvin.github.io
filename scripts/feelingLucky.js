// loadFont.js



//console.log("got to feel lucky");
const feelingLuckyButton = document.querySelector('.logo-img'); // Use the logo as the Feeling Lucky button
/*
if(feelingLuckyButton){
    console.log("button herere");
}else{
    console.log("button NOT herere");
}
*/

// Roboto – Clean and modern
// changeFont('Roboto:wght@400;700');

// Lora – Elegant with a touch of sophistication
// changeFont('Lora:wght@400;700');

// Poppins – Geometric and modern
// changeFont('Poppins:wght@300;400;600');

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


const body = document.body;
const fonts = ['Poppins:wght@300;400;600', 'Roboto:wght@400;700', 'Lora:wght@400;700', 'Lato:wght@300;400;700',
               'Merriweather:wght@400;700','Playfair+Display:wght@400;700', 'Montserrat:wght@400;700',  'Arial', 'Verdana'
              ];
const themes = ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19','20','21','22','23','24','25',
               '26',
               ];

if (feelingLuckyButton) {
    feelingLuckyButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Change the color scheme
        const currentTheme = body.getAttribute('data-theme') || 'default';
        const newTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
        body.setAttribute('data-theme', newTheme);
        
        // Store the selected theme in localStorage
        localStorage.setItem('selectedTheme', newTheme);        
        
        // Change the font
        const currentFont = window.getComputedStyle(body).fontFamily.split(',')[0].replace(/['"]/g, '');
        const newFont = fonts[(fonts.indexOf(currentFont) + 1) % fonts.length];
        changeFont(newFont); // Use the function from loadFont.js
        
        // Store the selected font in localStorage
        localStorage.setItem('selectedFont', newFont);
    });
}

