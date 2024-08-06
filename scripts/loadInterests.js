document.addEventListener('DOMContentLoaded', () => {
    loadInterests();
});

function loadInterests() {
    fetch('about/interests.json')
        .then(response => response.json())
        .then(data => {
            const interestsContainer = document.getElementById('interests-container');

            data.forEach(interest => {
                const interestItem = createInterestItem(interest);
                interestsContainer.appendChild(interestItem);
            });
        })
        .catch(error => console.error('Error loading interests:', error));
}

function createInterestItem(interest) {
    const interestDiv = document.createElement('div');
    interestDiv.classList.add('interest-item');

    // Create and add the interest icon
    const icon = document.createElement('img');
    icon.src = interest.icon;
    icon.alt = `${interest.name} Icon`;
    interestDiv.appendChild(icon);

    // Create and add the title
    const title = document.createElement('h3');
    title.textContent = interest.name;
    interestDiv.appendChild(title);

    // Create and add the description
    const description = document.createElement('p');
    description.textContent = interest.description;
    interestDiv.appendChild(description);

    // Create content area based on the type
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('example-content');
    
    switch (interest.type) {
        case 'image':
            const img = document.createElement('img');
            img.src = interest.content;
            img.alt = `${interest.name} Example`;
            img.style.maxWidth = '100%'; // Ensure the image fits within the container
            contentDiv.appendChild(img);
            break;
        case 'video':
            const video = document.createElement('video');
            video.src = interest.content;
            video.controls = true;
            video.style.maxWidth = '100%'; // Ensure the video fits within the container
            contentDiv.appendChild(video);
            break;
        case 'audio':
            const audio = document.createElement('audio');
            audio.src = interest.content;
            audio.controls = true;
            contentDiv.appendChild(audio);
            break;
        case 'text':
            const text = document.createElement('p');
            text.textContent = interest.content;
            contentDiv.appendChild(text);
            break;
        default:
            console.error(`Unknown content type: ${interest.type}`);
    }

    interestDiv.appendChild(contentDiv);

    // Add click event listener to toggle the example content
    interestDiv.addEventListener('click', () => {
        contentDiv.classList.toggle('active');
    });

    return interestDiv;
}
