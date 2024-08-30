document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to handle tab switching
    const handleTabClick = (e) => {
        e.preventDefault();

        // Remove active class and ARIA attributes from all tabs and contents
        tabLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class and ARIA attributes to the clicked tab and its content
        const tabId = e.target.dataset.tab;
        const targetTab = document.querySelector(`#${tabId}`);
        e.target.classList.add('active');
        e.target.setAttribute('aria-selected', 'true');

        if (targetTab) {
            targetTab.classList.add('active');
        } else {
            console.error(`No tab content found for ID: ${tabId}`);
        }
        
    };

    // Attach click and keyboard event listeners to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);

        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTabClick(e);
            }
        });
    });

    // Initialize the first tab as active
    if (tabLinks.length > 0) {
        tabLinks[0].click();
    }
});
