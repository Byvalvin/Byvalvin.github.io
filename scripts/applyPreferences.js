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
};

// Apply preferences when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', applyStoredPreferences);

