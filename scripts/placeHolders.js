// placeHolders.js
// load components that will be on all pages

// navbar.js

document.addEventListener("DOMContentLoaded", function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure it to fetch the navbar.html file
    xhr.open('GET', 'components/navbar.html', true);

    // Setup onload callback
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Insert the received HTML into the placeholder
            navbarPlaceholder.innerHTML = xhr.responseText;
        } else {
            console.error('Failed to load navbar.html');
        }
    };

    // Send the request
    xhr.send();
});


// footer.js

function includeFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `<object type="text/html" data="footer.html"></object>`;
    }
}

// Call the function to include footer when the page loads
window.addEventListener('DOMContentLoaded', includeFooter);
