// scripts/applyPreferences.js

const applyStoredPreferences = () => {
    const body = document.body;

    // Retrieve stored preferences from localStorage
    const storedTheme = localStorage.getItem('selectedTheme');
    const storedFont = localStorage.getItem('selectedFont');

    // Apply stored theme if available
    if (storedTheme) {
        body.setAttribute('data-theme', storedTheme);
        console.log(`Theme applied: ${storedTheme}`);
    } else {
        console.log('No theme preference found.');
    }
    

    // Apply stored font if available
    if (storedFont) {
        // Ensure the font format is correct for applying directly to the style
        body.style.fontFamily = storedFont;
        console.log(`Font applied: ${storedFont}`);
    } else {
        console.log('No font preference found.');
    }

    // Change logo image based on theme
    const feelingLuckyButton = document.querySelector(".logo-img");
    if (storedTheme === '21') {
        feelingLuckyButton.src = 'images/omnitrix1.jpg'; // Set to Omnitrix image
    } else {
        feelingLuckyButton.src = 'images/Byvalvin.jpeg'; // Set to default logo
    }};

// Apply preferences when the DOM content is fully loaded(will be loaded by now)
applyStoredPreferences();

