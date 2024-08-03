document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Initialize the first tab as active
    if (tabs.length > 0) {
        tabs[0].click();
    }
});
