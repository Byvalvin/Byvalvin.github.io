// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('other-project-list');
    const descriptionLength = 100; // Adjust as needed

    // Function to create project card HTML
    const createProjectCard = (project) => {
        const projectId = project.otherDetailsPage.split('=')[1];
        const truncatedDescription = project.description.length > descriptionLength 
            ? project.description.substring(0, descriptionLength) + '...' 
            : project.description;

        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <div class="project-card-header" role="button" tabindex="0" aria-label="${project.name}">
                <div class="project-card-header-content">
                    <h2>${project.name}</h2>
                    ${project.images && project.images.length > 0 
                        ? `<img src="projects/other/headerImages/${project.name}" alt="${project.name} image" class="project-card-image">`
                        : ''}
                </div>
                <p>${truncatedDescription}</p>
            </div>
        `;

        // Add event listeners for navigation
        card.addEventListener('click', (event) => {
            console.log("clicked card"+projectId);  
            showSection(event, 'otherProjectDetails', 'otherProjects', projectId); // Show other project details section

        });

        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                showSection(e, 'otherProjectDetails', 'otherProjects', projectId); // Show other project details section
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
