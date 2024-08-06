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

    const icon = document.createElement('img');
    icon.src = interest.icon;
    icon.alt = `${interest.name} Icon`;
    interestDiv.appendChild(icon);

    const title = document.createElement('h3');
    title.textContent = interest.name;
    interestDiv.appendChild(title);

    const description = document.createElement('p');
    description.textContent = interest.description;
    interestDiv.appendChild(description);

    return interestDiv;
}
