// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');

    // Fetch projects data from JSON file
    fetch('otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over projects and create list items
            data.projects.forEach(project => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                `;
                projectList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});

