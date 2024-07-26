// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.getElementById('projects-list');

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over projects and create list items
            data.projects.forEach(project => {
                const div = document.createElement('div');
                div.classList.add('project-card');
                div.innerHTML = `
                    <div class="project-card-header">
                        <h2>${project.name}</h2>
                        <p>${project.description}</p>
                    </div>
                `;
                // Add a click event listener to navigate to project details page
                div.addEventListener('click', () => {
                    window.location.href = project.otherDetailsPage; // Navigate to project details page
                });
                projectsList.appendChild(div);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
