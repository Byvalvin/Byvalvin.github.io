document.addEventListener('DOMContentLoaded', () => {
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const timelineContent = document.querySelector('.timeline-content');
    const timelineDots = document.querySelector('.timeline-dots');
    const navButtons = {
        left: document.querySelector('.nav-button.left'),
        right: document.querySelector('.nav-button.right')
    };
    let items = [];
    let currentIndex = 0;

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
        // Calculate item width based on dot size and spacing
        const dotSize = 10; // Width and height of the dot
        const dotSpacing = 10; // Space between dots
        const itemWidth = dotSize + dotSpacing;

        // Center the current dot in the viewport
        const totalDotsWidth = items.length * itemWidth;
        const offset = Math.min(
            (currentIndex * itemWidth) - (timelineWrapper.clientWidth / 2 - itemWidth / 2),
            totalDotsWidth - timelineWrapper.clientWidth
        );

        timelineWrapper.scrollLeft = Math.max(0, offset);

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

    // Navigation buttons
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

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                updateTimeline();
            }
        } else if (e.key === 'ArrowRight') {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateTimeline();
            }
        }
    });
});
