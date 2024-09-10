document.addEventListener('DOMContentLoaded', () => {
    fetch('about/timeline.json') // Path to your JSON file
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('timeline-container');
            const wrapper = document.createElement('div');
            wrapper.classList.add('timeline-wrapper');
            
            const line = document.createElement('div');
            line.classList.add('timeline-line');
            container.appendChild(line);

            data.forEach((item, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                if (index === 0) timelineItem.classList.add('active'); // Set the first item as active
                
                const date = document.createElement('div');
                date.classList.add('timeline-date');
                date.textContent = item.date;

                const logo = document.createElement('img');
                logo.src = item.logo; // Ensure logo field is available in JSON
                logo.alt = item.title;

                const content = document.createElement('div');
                content.classList.add('timeline-content');
                
                const title = document.createElement('h4');
                title.textContent = item.title;

                const description = document.createElement('p');
                description.textContent = item.description;

                const accordionBtn = document.createElement('button');
                accordionBtn.classList.add('accordion-btn');
                accordionBtn.textContent = 'More Details';
                
                const accordionContent = document.createElement('div');
                accordionContent.classList.add('accordion-content');
                accordionContent.textContent = item.details; // Use textContent instead of innerHTML
                
                content.appendChild(logo);
                content.appendChild(title);
                content.appendChild(description);
                content.appendChild(accordionBtn);
                content.appendChild(accordionContent);

                timelineItem.appendChild(date);
                timelineItem.appendChild(content);

                wrapper.appendChild(timelineItem);
            });

            container.appendChild(wrapper);

            // Add event listeners for the accordion buttons
            document.querySelectorAll('.accordion-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const content = button.nextElementSibling;
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });

            // Handle the carousel behavior
            const timelineWrapper = document.querySelector('.timeline-wrapper');
            const leftArrow = document.createElement('button');
            leftArrow.className = 'arrow left-arrow';
            leftArrow.innerHTML = '&lt;';
            const rightArrow = document.createElement('button');
            rightArrow.className = 'arrow right-arrow';
            rightArrow.innerHTML = '&gt;';
            container.appendChild(leftArrow);
            container.appendChild(rightArrow);

            let currentIndex = 0;
            const items = document.querySelectorAll('.timeline-item');
            const visibleCount = 1; // Number of visible items in the viewport

            function updateTimeline() {
                const itemWidth = items[0].offsetWidth + 15; // Adjust based on gap
                const maxOffset = (items.length - visibleCount) * itemWidth;
                const offset = Math.max(-currentIndex * itemWidth, -maxOffset); // Ensure offset is within bounds
                timelineWrapper.style.transform = `translateX(${offset}px)`;

                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });

                // Show/Hide arrows based on scroll position
                leftArrow.classList.toggle('show', currentIndex > 0);
                rightArrow.classList.toggle('show', currentIndex < items.length - visibleCount);

                // Position arrows to avoid overlapping timeline items
                leftArrow.style.top = `${container.offsetHeight / 2}px`;
                rightArrow.style.top = `${container.offsetHeight / 2}px`;
            }

            leftArrow.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateTimeline();
                }
            });

            rightArrow.addEventListener('click', () => {
                if (currentIndex < items.length - visibleCount) {
                    currentIndex++;
                    updateTimeline();
                }
            });

            // Optional: Handle arrow key navigation
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
