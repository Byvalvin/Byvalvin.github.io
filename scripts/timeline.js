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

    // Populate timeline with logos (dots at the bottom)
    function populateTimeline() {
        timelineDots.innerHTML = ''; // Clear existing dots

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

    // Update the timeline's content and scroll position (center the item)
    function updateTimeline() {
        const dotSize = 12; // Size of each dot (logo)
        const dotSpacing = 15; // Space between the dots
        const itemWidth = dotSize + dotSpacing; // Total width for each dot
        const totalDotsWidth = items.length * itemWidth;

        // Calculate the correct scroll offset for centering the item
        const offset = Math.min(
            (currentIndex * itemWidth) - (timelineWrapper.clientWidth / 2 - itemWidth / 2),
            totalDotsWidth - timelineWrapper.clientWidth
        );
        
        // Update the scroll position to center the current item
        timelineWrapper.scrollLeft = Math.max(0, offset);

        // Update 'active' class on the clicked dot
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        const currentItem = items[currentIndex];
        timelineContent.innerHTML = `
            <div class="timeline-header">
                <img src="${currentItem.logo}" alt="${currentItem.title} Logo" class="timeline-logo">
                <h3>${currentItem.title}</h3>
            </div>
            <p>${currentItem.date}</p>
            <p>${currentItem.description}</p>
            <button class="accordion-btn">Show Details</button>
            <div class="accordion-content">
                <p>${currentItem.details}</p>
            </div>
        `;

        updatePreItems(); // Update the pre-items to the left and right
        updateNavButtonVisibility(); // Show or hide the nav buttons
    }

    // Update the pre-items (left and right items next to the center item)
    function updatePreItems() {
        // Create left pre-item if it doesn't exist
        let leftPreItem = document.querySelector('.left-pre-item');
        if (!leftPreItem) {
            leftPreItem = document.createElement('div');
            leftPreItem.classList.add('left-pre-item');
            const img = document.createElement('img');
            leftPreItem.appendChild(img);
            timelineWrapper.appendChild(leftPreItem); // Append to timelineWrapper
        }
    
        // Create right pre-item if it doesn't exist
        let rightPreItem = document.querySelector('.right-pre-item');
        if (!rightPreItem) {
            rightPreItem = document.createElement('div');
            rightPreItem.classList.add('right-pre-item');
            const img = document.createElement('img');
            rightPreItem.appendChild(img);
            timelineWrapper.appendChild(rightPreItem); // Append to timelineWrapper
        }
    
        // Get the left and right items for pre-items
        const leftItem = currentIndex > 0 ? items[currentIndex - 1] : null;
        const rightItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
    
        // Left Pre-item (logo only)
        if (leftItem) {
            leftPreItem.style.display = 'block';
            leftPreItem.querySelector('img').src = leftItem.logo;
            leftPreItem.querySelector('img').alt = leftItem.title + ' Logo';
            leftPreItem.addEventListener('click', () => {
                currentIndex--;
                updateTimeline();
            });
        } else {
            leftPreItem.style.display = 'none'; // Hide if no item to the left
        }
    
        // Right Pre-item (logo only)
        if (rightItem) {
            rightPreItem.style.display = 'block';
            rightPreItem.querySelector('img').src = rightItem.logo;
            rightPreItem.querySelector('img').alt = rightItem.title + ' Logo';
            rightPreItem.addEventListener('click', () => {
                currentIndex++;
                updateTimeline();
            });
        } else {
            rightPreItem.style.display = 'none'; // Hide if no item to the right
        }
    }


    // Update navigation button visibility (left/right arrows)
    function updateNavButtonVisibility() {
        navButtons.left.style.display = currentIndex > 0 ? 'block' : 'none';
        navButtons.right.style.display = currentIndex < items.length - 1 ? 'block' : 'none';
    }

    // Handle left and right navigation buttons
    const moveLeft = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTimeline();
        }
    }

    const moveRight = () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateTimeline();
        }
    }

    navButtons.left.addEventListener('click', moveLeft);
    navButtons.right.addEventListener('click', moveRight);

    // Keyboard navigation (Arrow keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    });
});
