document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline');
    const timelineContent = document.querySelector('.timeline-content');
    const timelineDots = document.querySelector('.timeline-dots');
    const navButtons = {
        left: document.querySelector('.nav-button.left'),
        right: document.querySelector('.nav-button.right')
    };
    let items = [];
    let currentIndex = 0; // Start at the first item

    // Fetch and load timeline data
    fetch('about/timeline.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            populateTimeline();
            updateTimeline();
        })
        .catch(error => console.error('Error loading timeline data:', error));

    function populateTimeline() {
        timelineDots.innerHTML = '';
        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateTimeline();
            });
            timelineDots.appendChild(dot);
        });
    }

    function updateTimeline() {
        const itemWidth = 80; // Adjust based on item size
        timelineContainer.scrollLeft = currentIndex * itemWidth - (timelineContainer.clientWidth / 2 - itemWidth / 2);

        // Update dot states
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        const currentItem = items[currentIndex];
        timelineContent.innerHTML = `
            <h3>${currentItem.title}</h3>
            <p>${currentItem.date}</p>
            <p>${currentItem.description}</p>
            <p>${currentItem.details}</p>
        `;
    }

    navButtons.left.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTimeline();
        }
    });

    navButtons.right.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateTimeline();
        }
    });
});
