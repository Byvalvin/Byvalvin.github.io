// loadProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectData = [
        {
            id: 'qrapp',
            title: 'QRapp',
            description: 'A QR Code Hunting App.',
            images: ['qrapp9.jpg'],
            detailsPage: 'project-details.html?id=qrapp'
        },
        {
            id: 'aranimal',
            title: 'AR Animal Identification',
            description: 'An educational and interactive app designed to inform and teach users about the Albertan Bioshpere',
            images: ['aranimal2.jpg'],
            detailsPage: 'project-details.html?id=aranimal'
        },
        {
            id: 'proquest',
            title: 'ProQuest',
            description: 'A site for Agents and Scout to find the best teams for their players and the best players for their teams.',
            images: [],
            detailsPage: 'project-details.html?id=proquest'
        }
        // Add more projects as needed
    ];

    const projectList = document.getElementById('project-list');

    // Function to create project HTML elements
    const createProjectElements = () => {
        projectData.forEach(project => {
            const projectSection = document.createElement('section');
            projectSection.classList.add('project');

            const projectImages = project.images.map(image => {
                return `<img src="projects/${project.id}/images/${image}" alt="${image}" class="project-image">`;
            }).join('');

            projectSection.innerHTML = `
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="project-images">${projectImages}</div>
                    <a href="${project.detailsPage}" class="btn">View Details</a>
                </div>
            `;

            projectList.appendChild(projectSection);
        });
    };

    // Call function to create project elements
    createProjectElements();
});
