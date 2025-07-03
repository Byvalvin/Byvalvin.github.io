// loadProjects.js

document.addEventListener('DOMContentLoaded', () => {
    const projectData = [
        {
            id: 'slate',
            title: "Slate",
            description: 'A Personal Fitness guide, Progress Tracker and Accountability Partner that uses ',
            images: ['slate.png'],
            detailsPage: '#project-details?id=slate'
        },
        {
            id: 'chop',
            title: 'Chop',
            description: 'A website for recipes of the greatest African and Afro-Carribean Cuisine.',
            images: ['chop1.png'],
            detailsPage: '#project-details?id=chop'
        },

        {
            id: 'pawnspath',
            title: "Pawn's Path: An Endgame Forge",
            description: 'A tactical chess playground',
            images: ['pawnspath1.jpg'],
            detailsPage: '#project-details?id=pawnspath'
        },
        // Add more projects as needed
    ];

    const oldProjects = [
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
        },
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
                    <a href="#projectDetails?id=${project.id}" class="btn btn-primary" onclick="showSection(event, 'projectDetails', 'projects', '${project.id}');">View Details</a>
                </div>
            `;
        
            // Add a click event listener to navigate to project details page
            // Add a click event listener for the entire section
            projectSection.addEventListener('click', (event) => {
                if (event.target.tagName !== 'A') { // If not clicking on the link
                    showSection(event, 'projectDetails', 'projects', project.id); // Show project details section
                }
            });

            projectList.appendChild(projectSection);
        });
    };

    // Call function to create project elements
    createProjectElements();
});
