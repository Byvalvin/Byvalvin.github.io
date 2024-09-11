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
    
        const visibleCount = 3; // Number of items to show at a time
        const start = Math.max(0, currentIndex - 1);
        const end = Math.min(timelineData.length, currentIndex + 2);
    
        // Show items to the left and right of the current index
        for (let i = start; i < end; i++) {
            const timelineItem = document.createElement('div');
            const itemData = timelineData[i];

            if (i === currentIndex) {
                timelineItem.classList.add('timeline-item', 'focus');
                timelineItem.innerHTML = `
                    <img src="${itemData.logo}" alt="${itemData.title}" class="timeline-logo">
                    <div class="timeline-content">
                        <div class="timeline-date">${itemData.date}</div>
                        <div class="timeline-title">${itemData.title}</div>
                        <div class="timeline-description">${itemData.description}</div>
                    </div>
                `;
            } else {
                timelineItem.classList.add('dot');
            }
    
            timelineContainer.appendChild(timelineItem);
        }

        // Center the focused item
        const timelineItems = Array.from(timelineContainer.getElementsByClassName('timeline-item'));
        const focusedItem = timelineItems.find(item => item.classList.contains('focus'));
        
        if (focusedItem) {
            const containerWidth = timelineContainer.clientWidth;
            const itemWidth = focusedItem.offsetWidth;
            const offset = focusedItem.offsetLeft - (containerWidth / 2) + (itemWidth / 2);
            timelineContainer.scrollLeft = offset;
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
