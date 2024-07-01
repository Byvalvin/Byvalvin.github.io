// placeHolders.js
// load components that will be on all pages

const addComponent = ({placeholderID,htmlURL}) =>{
    document.addEventListener("DOMContentLoaded", function() {
        const componentPlaceholder = document.getElementById({placeholderID});
    
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
    
        // Configure it to fetch the navbar.html file
        const url = `components/${htmlURL}`
        console.log(url)
        xhr.open('GET', url, true);
    
        // Setup onload callback
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Insert the received HTML into the placeholder
                componentPlaceholder.innerHTML = xhr.responseText;
            } else {
                console.error(`Failed to load ${htmlURL}`);
            }
        };
    
        // Send the request
        xhr.send();
    });
}

const components = [
    { 
        id:"navbar-placeholder", // navbar.js
        url:"navbar.html"
    },
    {
        id:"footer-placeholder", // footer.js
        url:"footer.html"
    }
]

// call it
components.forEach(({id,url})=>addComponent(id,url))
