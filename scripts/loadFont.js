// loadFont.js

document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
        // Create the link element
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap';
        link.rel = 'stylesheet';
        
        // Append the link element to the head
        document.head.appendChild(link);
    }
});
