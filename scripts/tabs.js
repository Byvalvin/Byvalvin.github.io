document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all tab links and contents
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and corresponding content
            const targetTab = document.querySelector(`#${link.dataset.tab}`);
            link.classList.add('active');
            targetTab.classList.add('active');
        });
    });

    // Initialize the first tab as active
    if (tabLinks.length > 0) {
        tabLinks[0].click();
    }
});
