// loadProjects.js

document.addEventListener('DOMContentLoaded', () => {
    const projectData = [
        {
            id: 'qrapp',
            title: 'QRapp',
            description: 'A QR Code Hunting App.',
            images: ['qrapp9.jpg'],
            detailsPage: '#project-details?id=qrapp'
        },
        {
            id: 'aranimal',
            title: 'AR Animal Identification',
            description: 'An educational and interactive app designed to inform and teach users about the Albertan Biosphere.',
            images: ['aranimal2.jpg'],
            detailsPage: '#project-details?id=aranimal'
        },
        {
            id: 'proquest',
            title: 'ProQuest',
            description: 'A site for Agents and Scouts to find the best teams for their players and the best players for their teams.',
            images: ['proquest1.png'],
            detailsPage: '#project-details?id=proquest'
        }
        // Add more projects as needed
    ];

    const projectList = document.getElementById('project-list');

    // Function to create project HTML elements
    const createProjectElements = () => {
        if (!projectList) {
            console.error('Project list container not found.');
            return;
        }

        projectData.forEach(project => {
            const projectSection = document.createElement('section');
            projectSection.classList.add('project');

            // Generate image HTML
            const projectImages = project.images.map(image => {
                return `<img src="projects/${project.id}/images/${image}" alt="${project.title} - ${image}" class="project-image">`;
            }).join('');

            projectSection.innerHTML = `
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="project-images">${projectImages}</div>
                    <a href="#project-details?id=${project.id}" class="btn btn-primary" onclick="showSection(event, 'projectDetails');">View Details</a>
                </div>
            `;
        
        

            // Add a click event listener to navigate to project details page
            projectSection.addEventListener('click', (event) => {
                // Avoid navigating if the click was on the link itself
                if (event.target.tagName !== 'A') {
                    showSection(event, project.id); // Use showSection to change the view without reloading
                }
            });

            projectList.appendChild(projectSection);
        });
    };

    // Call function to create project elements
    createProjectElements();
});
