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

        const visibleCount = 3;
        const start = Math.max(0, currentIndex - 1);
        const end = Math.min(timelineData.length, currentIndex + 2);

        // Show items to the left and right of the current index
        for (let i = start; i < end; i++) {
            const timelineItem = document.createElement('div');
            
            if (i === currentIndex) {
                timelineItem.classList.add('timeline-item', 'focus');
                timelineItem.innerHTML = `
                    <div class="timeline-date">${timelineData[i].date}</div>
                    <div class="timeline-title">${timelineData[i].title}</div>
                    <div class="timeline-description">${timelineData[i].description}</div>
                `;
            } else {
                timelineItem.classList.add('dot');
            }

            timelineContainer.appendChild(timelineItem);
        }

        // Adjust the container width to fit all visible items
        const totalWidth = (end - start) * 120; // Adjust based on item width and margin
        timelineContainer.style.width = `${totalWidth}px`;
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
