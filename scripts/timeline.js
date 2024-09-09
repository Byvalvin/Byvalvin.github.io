document.addEventListener('DOMContentLoaded', () => {
    fetch('about/timeline.json') // Path to your JSON file
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('timeline-container');
            const wrapper = document.createElement('div');
            wrapper.classList.add('timeline-wrapper');

            data.forEach(item => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                
                const date = document.createElement('div');
                date.classList.add('timeline-date');
                date.textContent = item.date;
                
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
                accordionContent.innerHTML = item.details;
                
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
        })
        .catch(error => console.error('Error loading the timeline data:', error));
});
