// loadFont.js



console.log("got here");
document.addEventListener('DOMContentLoaded', function () {
    const feelingLuckyButton = document.querySelector('.logo-img'); // Use the logo as the Feeling Lucky button
    if(feelingLuckyButton){
        console.log("button herere");
    }else{
        console.log("button NOT herere");
    }
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
