document.addEventListener('DOMContentLoaded', () => {
    fetch('about/timeline.json') // Path to your JSON file
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('timeline-container');
            const wrapper = document.getElementById('timeline-wrapper');
            const leftArrow = document.querySelector('.left-arrow');
            const rightArrow = document.querySelector('.right-arrow');
            
            data.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                
                const logo = document.createElement('img');
                logo.src = item.logo;
                logo.alt = item.title;
                logo.style.maxWidth = '100%';

                const content = document.createElement('div');
                content.classList.add('timeline-content');
                content.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                `;

                timelineItem.appendChild(logo);
                timelineItem.appendChild(content);
                wrapper.appendChild(timelineItem);
            });

            let currentIndex = 0;
            const items = document.querySelectorAll('.timeline-item');
            const visibleCount = 3;

            function updateTimeline() {
                const itemWidth = items[0].offsetWidth + 20; // Adjust for margin or padding
                const halfVisible = Math.floor(visibleCount / 2);
                const maxOffset = (items.length - visibleCount) * itemWidth;
                const offset = Math.max(
                    Math.min(currentIndex - halfVisible, items.length - visibleCount) * itemWidth,
                    0
                );
                wrapper.style.transform = `translateX(-${offset}px)`;

                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });

                // Show/Hide arrows based on scroll position
                leftArrow.classList.toggle('show', currentIndex > 0);
                rightArrow.classList.toggle('show', currentIndex < items.length - visibleCount);

                // Remove existing dots
                const existingDots = document.querySelectorAll('.dot');
                existingDots.forEach(dot => dot.remove());

                // Add dots for items not in view
                if (currentIndex > 0) {
                    const leftDot = document.createElement('div');
                    leftDot.className = 'dot';
                    leftDot.style.left = `${items[currentIndex - 1].offsetLeft}px`;
                    container.appendChild(leftDot);
                }

                if (currentIndex < items.length - 1) {
                    const rightDot = document.createElement('div');
                    rightDot.className = 'dot';
                    rightDot.style.left = `${items[currentIndex + 1].offsetLeft}px`;
                    container.appendChild(rightDot);
                }
            }

            leftArrow.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateTimeline();
                }
            });

            rightArrow.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateTimeline();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    leftArrow.click();
                } else if (e.key === 'ArrowRight') {
                    rightArrow.click();
                }
            });

            // Initialize
            updateTimeline();
        })
        .catch(error => console.error('Error loading the timeline data:', error));
});
