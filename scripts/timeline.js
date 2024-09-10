// timeline.js
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const detailsInfo = document.createElement('p');
    detailsInfo.id = 'details-info';
    detailsInfo.textContent = 'Select an item to see details.';
    document.getElementById('timeline-container').appendChild(detailsInfo);

    let timelineData = [];
    let currentIndex = 0;

    // Fetch the timeline data from the JSON file
    fetch('about/timeline.json')
        .then(response => response.json())
        .then(data => {
            timelineData = data;
            createTimelineItems();
            updateTimeline();
        })
        .catch(error => console.error('Error fetching timeline data:', error));

    function createTimelineItems() {
        timelineData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.dataset.index = index;
            div.dataset.details = item.details;
            
            // Create and append item elements
            const logo = document.createElement('img');
            logo.src = item.logo;
            logo.alt = item.title;
            logo.className = 'timeline-logo';

            const title = document.createElement('div');
            title.className = 'timeline-title';
            title.textContent = item.title;

            div.appendChild(logo);
            div.appendChild(title);
            
            div.addEventListener('click', () => {
                currentIndex = index;
                updateTimeline();
            });

            timelineContainer.appendChild(div);
        });
    }

    function updateTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
                detailsInfo.textContent = timelineData[index].details;
            } else {
                item.classList.remove('active');
            }
        });

        const offset = -currentIndex * (items[0].offsetWidth + 20); // Adjust for margin
        timelineContainer.style.transform = `translateX(${offset}px)`;

        leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
        rightArrow.style.display = currentIndex < items.length - 1 ? 'block' : 'none';
    }

    function moveLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            updateTimeline();
        }
    }

    function moveRight() {
        if (currentIndex < timelineData.length - 1) {
            currentIndex++;
            updateTimeline();
        }
    }

    leftArrow.addEventListener('click', moveLeft);
    rightArrow.addEventListener('click', moveRight);
});
