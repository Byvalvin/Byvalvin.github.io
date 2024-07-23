// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over projects and create list items
            data.projects.forEach(project => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                `;
                // Add a click event listener to navigate to project details page
                li.addEventListener('click', () => {
                    window.location.href = project.otherDetailsPage; // Navigate to project details page
                });
                projectList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});

