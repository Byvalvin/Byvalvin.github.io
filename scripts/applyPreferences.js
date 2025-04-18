// scripts/applyPreferences.js

const applyStoredPreferences = () => {
    const body = document.body;

    // Retrieve stored preferences from localStorage
    const storedTheme = localStorage.getItem('selectedTheme');
    const storedFont = localStorage.getItem('selectedFont');

    // Check current time
    const currentHour = new Date().getHours();
    const lightTime = 12;
    const lightThemes = ['0','1','2','3','7', '9', '10', '11', '13', '14', '15', '17', '18', '19','21','22', '23', '24', '26', '29'];
    const darkTime = 18;
    const darkThemes = ['4', '5', '6', '8', '9', '12', '16', '20', '22', '27', '28'];

    // Apply dark theme if it's 6 PM or later
    if (currentHour >= darkTime && !storedTheme) {
        // Set to a default dark theme (e.g., '8')
        const randDarkThemeIndex = Math.floor(Math.random()*darkThemes.length);
        body.setAttribute('data-theme', darkThemes[randDarkThemeIndex]); // Choose one of your darker themes
        localStorage.setItem('selectedTheme', darkThemes[randDarkThemeIndex]); // Save this preference
        console.log('Dark theme applied by default: ', darkThemes[randDarkThemeIndex]);
    } else if (storedTheme) {
        // Apply stored theme if available
        body.setAttribute('data-theme', storedTheme);
        console.log(`Theme applied: ${storedTheme}`);
    } else {
        console.log('No theme preference found.');
        // Set light theme
        const randLightThemeIndex = Math.floor(Math.random()*lightThemes.length);
        body.setAttribute('data-theme', lightThemes[randLightThemeIndex]); // Choose one of your darker themes
        localStorage.setItem('selectedTheme', lightThemes[randLightThemeIndex]); // Save this preference
        console.log('Dark theme applied by default: ', lightThemes[randLightThemeIndex]); 
    }

    // Apply stored font if available
    if (storedFont) {
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
    }
};

// Apply preferences when the DOM content is fully loaded
applyStoredPreferences();
