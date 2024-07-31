// scripts/applyPreferences.js

const applyStoredPreferences = () => {
    const body = document.body;
    const storedTheme = localStorage.getItem('selectedTheme');
    const storedFont = localStorage.getItem('selectedFont');
    console.log(storedTheme, storedFont, "stored 3");
    
    if (storedTheme) {
        body.setAttribute('data-theme', storedTheme);
        console.log(storedTheme, "stored");
    }
    
    if (storedFont) {
        body.style.fontFamily = storedFont;
        console.log(storedFont, "stored2");
    }
};

// Apply preferences when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', applyStoredPreferences);
