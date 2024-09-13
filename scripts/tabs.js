document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to handle tab switching
    const handleTabClick = (e) => {
        e.preventDefault();
        
        const clickedTab = e.currentTarget; // Use e.currentTarget instead of e.target
        const tabId = clickedTab.dataset.tab;

        if (!tabId) {
            console.error('No tab ID found for the clicked tab.');
            return; // Exit early if no tab ID is found
        }

        // Remove active class and ARIA attributes from all tabs and contents
        tabLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class and ARIA attributes to the clicked tab and its content
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');

        const targetTab = document.querySelector(`#${tabId}`);
        if (targetTab) {
            targetTab.classList.add('active');
        } else {
            console.error(`No tab content found for ID: ${tabId}`);
            return; // Exit early if no target tab is found
        }
    };

     // Function to handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const index = Array.from(tabLinks).indexOf(e.target);
            const nextIndex = (index + 1) % tabLinks.length;
            tabLinks[nextIndex].focus();
            handleTabClick({ currentTarget: tabLinks[nextIndex] });
        }
    };

    // Attach click and keyboard event listeners to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
        link.addEventListener('keydown', handleKeyDown);
    });

    // Initialize the first tab as active
    if (tabLinks.length > 0) {
        tabLinks[0].click();
    }
});
