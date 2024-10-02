// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('other-project-list');
    const descriptionLength = 100; // Adjust as needed

    // Function to create project card HTML
    const createProjectCard = (project) => {
        const truncatedDescription = project.description.length > descriptionLength 
            ? project.description.substring(0, descriptionLength) + '...' 
            : project.description;

        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <div class="project-card-header" role="button" tabindex="0" aria-label="${project.name}">
                <h2>${project.name}</h2>
                <p>${truncatedDescription}</p>
            </div>
        `;

        // Add event listeners for navigation
        card.addEventListener('click', () => {
            window.location.hash = `#other-project-details?id=${project.id}`; // Update URL
            loadOtherProjectDetails(project.id); // Load project details
        });
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.location.hash = `#other-project-details?id=${project.id}`;
                loadOtherProjectDetails(project.id);
            }
        });

        return card;
    };

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const otherProjects = data.projects;
            if (!Array.isArray(otherProjects) || otherProjects.length === 0) {
                throw new Error('No projects found or invalid data structure');
            }

            otherProjects.forEach(project => {
                const card = createProjectCard(project);
                projectList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectList.innerHTML = '<p>Sorry, we were unable to load the projects at this time. Please try again later.</p>';
        });
});
