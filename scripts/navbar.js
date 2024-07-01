// navbar.js

document.addEventListener("DOMContentLoaded", function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure it to fetch the navbar.html file
    xhr.open('GET', 'navbar.html', true);

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
