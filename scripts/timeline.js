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
        const dotSize = 10; // Size of each dot from CSS
        const dotSpacing = 10; // Space between dots from CSS
        const itemWidth = dotSize + dotSpacing; // Total width for each dot + space

        // Calculate the scroll position to center the current item
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
            <div class="timeline-header">
                <img src="${currentItem.logo}" alt="${currentItem.title} Logo" class="timeline-logo">
                <h3>${currentItem.title}</h3>
            </div>
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

