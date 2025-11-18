document.addEventListener('DOMContentLoaded', () => {
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const timelineContent = document.querySelector('.timeline-content');
    const timelineDots = document.querySelector('.timeline-dots');
    // const navButtons = {
    //     left: document.querySelector('.nav-button.left'),
    //     right: document.querySelector('.nav-button.right')
    // };
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
        const dotSize = 12;
        const dotSpacing = 15;
        const itemWidth = dotSize + dotSpacing;

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

        // -------------------------------
        // NEW PREVIEW LOGIC
        // -------------------------------
        const leftPreview = document.querySelector('.left-preview');
        const rightPreview = document.querySelector('.right-preview');

        // Left preview
        if (currentIndex > 0) {
            leftPreview.style.backgroundImage = `url(${items[currentIndex - 1].logo})`;
            leftPreview.classList.remove('empty');
            leftPreview.onclick = () => {
                currentIndex--;
                updateTimeline();
            };
        } else {
            leftPreview.style.backgroundImage = '';
            leftPreview.classList.add('empty');
            leftPreview.onclick = null;
        }

        // Right preview
        if (currentIndex < items.length - 1) {
            rightPreview.style.backgroundImage = `url(${items[currentIndex + 1].logo})`;
            rightPreview.classList.remove('empty');
            rightPreview.onclick = () => {
                currentIndex++;
                updateTimeline();
            };
        } else {
            rightPreview.style.backgroundImage = '';
            rightPreview.classList.add('empty');
            rightPreview.onclick = null;
        }
        // -------------------------------

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

        //updateNavButtonVisibility();
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
    };

    const moveRight = () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateTimeline();
        }
    };

    // navButtons.left.addEventListener('click', moveLeft);
    // navButtons.right.addEventListener('click', moveRight);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveLeft();
        else if (e.key === 'ArrowRight') moveRight();
    });
});
