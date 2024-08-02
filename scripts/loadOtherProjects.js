// loadOtherProjects.js

document.addEventListener('DOMContentLoaded', function() {
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

        // Add event listeners for accessibility and navigation
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
        .then(response => response.json())
        .then(data => {
            // Check if the data is valid
            if (!data.projects || !Array.isArray(data.projects)) {
                throw new Error('Invalid project data');
            }

            // Create and append project cards
            data.projects.forEach(project => {
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
