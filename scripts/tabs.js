document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to remove active class and ARIA attributes from all tabs and contents
    const deactivateAllTabs = () => {
        tabLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(content => content.classList.remove('active'));
    };

    // Function to activate a specific tab and its content
    const activateTab = (clickedTab) => {
        const tabId = clickedTab.dataset.tab;

        if (!tabId) {
            console.error('No tab ID found for the clicked tab.');
            return;
        }

        const targetTab = document.querySelector(`#${tabId}`);

        if (targetTab) {
            clickedTab.classList.add('active');
            clickedTab.setAttribute('aria-selected', 'true');
            targetTab.classList.add('active');
        } else {
            console.error(`No tab content found for ID: ${tabId}`);
        }
    };

    // Function to handle tab click
    const handleTabClick = (e) => {
        e.preventDefault();
        const clickedTab = e.currentTarget;
        deactivateAllTabs();
        activateTab(clickedTab);
    };

    // Function to handle keyboard navigation
    const handleKeyDown = (e) => {
        deactivateAllTabs();
        if (e.key === 'Tab') {
            e.preventDefault();
            const index = Array.from(tabLinks).indexOf(e.target);
            const nextIndex = (index + 1) % tabLinks.length;
            tabLinks[nextIndex].focus();
            activateTab(tabLinks[nextIndex]);
        }
    };

    // Attach event listeners
    tabLinks.forEach(link => {
        link.addEventListener('click', handleTabClick);
        link.addEventListener('keydown', handleKeyDown);
    });

    // Initialize the first tab as active
    if (tabLinks.length > 0) {
        tabLinks[0].click();
    }
});
