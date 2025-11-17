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
        const dotSize = 12; // Size of each dot
        const dotSpacing = 15; // Space between dots
        const itemWidth = dotSize + dotSpacing; // Total width for each dot + space
    
        const totalDotsWidth = items.length * itemWidth;
        const offset = Math.min(
            (currentIndex * itemWidth) - (timelineWrapper.clientWidth / 2 - itemWidth / 2),
            totalDotsWidth - timelineWrapper.clientWidth
        );
    
        timelineWrapper.scrollLeft = Math.max(0, offset);
    
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    
        const currentItem = items[currentIndex];
        
        // Create the timeline content (using template literals to populate the timeline)
        timelineContent.innerHTML = `
            <div class="timeline-header">
                <img id="timeline-logo" class="timeline-logo" src="path/to/placeholder.avif" alt="Placeholder" />
                <h3>${currentItem.title}</h3>
            </div>
            <p>${currentItem.date}</p>
            <p>${currentItem.description}</p>
            <button class="accordion-btn">Show Details</button>
            <div class="accordion-content">
                <h4>Details</h4>
                <p>${currentItem.details}</p>
            </div>
        `;
    
        const imageElement = document.getElementById('timeline-logo');
        // Set initial image source (the placeholder or a low-res version)
        imageElement.src = currentItem.logo;
    
        // Once the image is fully loaded, you can confirm it was loaded (optional)
        imageElement.onload = () => {
            console.log(`Image loaded: ${currentItem.logo}`);
            // If needed, you can add any logic after the image loads, like changing opacity, etc.
        };
    
        // Accordion toggle logic
        const accordionBtn = document.querySelector('.accordion-btn');
        const accordionContent = document.querySelector('.accordion-content');
        if (accordionBtn && accordionContent) {
            accordionBtn.addEventListener('click', () => {
                if (accordionContent.style.display === 'none' || accordionContent.style.display === '') {
                    accordionContent.style.display = 'block';
                    accordionBtn.textContent = 'Hide Details';
                } else {
                    accordionContent.style.display = 'none';
                    accordionBtn.textContent = 'Show Details';
                }
            });
        }
        updateNavButtonVisibility();
    }


    function updateNavButtonVisibility() {
        navButtons.left.style.display = currentIndex > 0 ? 'block' : 'none';
        navButtons.right.style.display = currentIndex < items.length - 1 ? 'block' : 'none';
    }

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
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    });
    
});
