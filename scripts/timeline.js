// timeline.js
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    let timelineData = [];
    let currentIndex = 0;

    function fetchTimelineData() {
        fetch('about/timeline.json')
            .then(response => response.json())
            .then(data => {
                timelineData = data;
                renderTimeline();
                updateArrows();
            })
            .catch(error => {
                console.error('Error fetching timeline data:', error);
            });
    }

    function renderTimeline() {
        timelineContainer.innerHTML = ''; // Clear existing content

        // Calculate the number of items to show (2 or 3)
        const visibleCount = 3;
        const start = Math.max(0, currentIndex - Math.floor(visibleCount / 2));
        const end = Math.min(timelineData.length, start + visibleCount);

        for (let i = start; i < end; i++) {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            if (i === currentIndex) {
                timelineItem.classList.add('focus');
            } else {
                timelineItem.classList.add('dot');
            }

            timelineItem.innerHTML = `
                <div class="timeline-date">${timelineData[i].date}</div>
                <div class="timeline-title">${timelineData[i].title}</div>
                <div class="timeline-description">${timelineData[i].description}</div>
            `;

            timelineContainer.appendChild(timelineItem);
        }
    }

    function updateArrows() {
        leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
        rightArrow.style.display = currentIndex < timelineData.length - 1 ? 'block' : 'none';
    }

    function navigateTimeline(direction) {
        if (direction === 'left' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'right' && currentIndex < timelineData.length - 1) {
            currentIndex++;
        }
        renderTimeline();
        updateArrows();
    }

    leftArrow.addEventListener('click', () => navigateTimeline('left'));
    rightArrow.addEventListener('click', () => navigateTimeline('right'));

    // Fetch and render timeline data on page load
    fetchTimelineData();
});
