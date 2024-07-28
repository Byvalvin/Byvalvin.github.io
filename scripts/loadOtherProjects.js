// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('other-project-list');
    const descriptionLength = 100; // Adjust as needed

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over projects and create list items
            data.projects.forEach(project => {
                const truncatedDescription = project.description.length > descriptionLength 
                    ? project.description.substring(0, descriptionLength) + '...' 
                    : project.description;

                const div = document.createElement('div');
                div.classList.add('project-card');
                div.innerHTML = `
                    <div class="project-card-header">
                        <h2>${project.name}</h2>
                        <p>${truncatedDescription}</p>
                    </div>
                `;
                // Add a click event listener to navigate to project details page
                div.addEventListener('click', () => {
                    window.location.href = project.otherDetailsPage; // Navigate to project details page
                });
                projectList.appendChild(div);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});
