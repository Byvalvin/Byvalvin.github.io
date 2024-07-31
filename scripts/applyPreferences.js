// scripts/applyPreferences.js

const applyStoredPreferences = () => {
    const body = document.body;
    const storedTheme = localStorage.getItem('selectedTheme');
    const storedFont = localStorage.getItem('selectedFont');
    
    if (storedTheme) {
        body.setAttribute('data-theme', storedTheme);
    }
    
    if (storedFont) {
        body.style.fontFamily = storedFont;
    }
};

// Apply preferences when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', applyStoredPreferences);
