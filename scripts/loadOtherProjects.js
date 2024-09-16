// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('other-project-list');
    const descriptionLength = 100; // Adjust as needed

    // Function to create project card HTML
    const createProjectCard = (project) => {
        // Truncate description if it's too long
        const truncatedDescription = project.description.length > descriptionLength 
            ? project.description.substring(0, descriptionLength) + '...' 
            : project.description;

        // Create a new card element
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <div class="project-card-header" role="button" tabindex="0" aria-label="${project.name}">
                <h2>${project.name}</h2>
                <p>${truncatedDescription}</p>
            </div>
        `;

        // Add event listeners for navigation and accessibility
        card.addEventListener('click', () => {
            window.location.href = project.otherDetailsPage;
        });
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = project.otherDetailsPage;
            }
        });

        return card;
    };

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if the data structure is correct
            const projects = data.projects;
            if (!Array.isArray(projects) || projects.length === 0) {
                throw new Error('No projects found or invalid data structure');
            }

            // Create and append project cards
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);

            // Display an error message to the user
            projectList.innerHTML = '<p>Sorry, we were unable to load the projects at this time. Please try again later.</p>';
        });
});
