document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline');
    const timelineContent = document.querySelector('.timeline-content');
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const navButtons = {
        left: document.querySelector('.nav-button.left'),
        right: document.querySelector('.nav-button.right')
    };
    let items = [];
    let currentIndex = 0; // Start at the first item

    // Fetch and load timeline data
    fetch('path/to/timeline.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            populateTimeline();
            updateTimeline();
        })
        .catch(error => console.error('Error loading timeline data:', error));

    function populateTimeline() {
        timelineContainer.innerHTML = '';
        items.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item');
            if (index !== currentIndex) {
                timelineItem.classList.add('dot');
            }
            timelineItem.dataset.index = index;
            timelineItem.innerHTML = index === currentIndex ? `
                <img src="${item.logo}" alt="${item.title}" style="width: 20px; height: 20px;">
                <div>${item.title}</div>
            ` : '';
            timelineItem.addEventListener('click', () => {
                currentIndex = index;
                updateTimeline();
            });
            timelineContainer.appendChild(timelineItem);
        });
    }

    function updateTimeline() {
        const centerIndex = Math.max(0, Math.min(items.length - 1, currentIndex));
        const itemWidth = 80; // Adjust based on item size
        timelineWrapper.scrollLeft = centerIndex * itemWidth - (timelineWrapper.clientWidth / 2 - itemWidth / 2);

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            if (index === centerIndex) {
                item.classList.add('active');
                item.classList.remove('dot');
                item.innerHTML = `
                    <img src="${items[index].logo}" alt="${items[index].title}" style="width: 30px; height: 30px;">
                    <div>${items[index].title}</div>
                `;
            } else {
                item.classList.remove('active');
                item.classList.add('dot');
                item.innerHTML = '';
            }
        });

        const currentItem = items[centerIndex];
        timelineContent.innerHTML = `
            <h3>${currentItem.title}</h3>
            <p>${currentItem.date}</p>
            <p>${currentItem.description}</p>
            <p>${currentItem.details}</p>
        `;
    }

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
});
