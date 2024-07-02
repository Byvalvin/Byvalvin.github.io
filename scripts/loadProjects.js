// loadProjects.js

document.addEventListener('DOMContentLoaded', function() {
    const projectData = [
        {
            id: 'project1',
            title: 'Project 1 Title',
            description: 'A short description of Project 1.',
            images: ['project1-img1.jpg', 'project1-img2.jpg'],
            detailsPage: 'project-details.html?id=project1'
        },
        {
            id: 'project2',
            title: 'Project 2 Title',
            description: 'A short description of Project 2.',
            images: ['project2-img1.jpg', 'project2-img2.jpg'],
            detailsPage: 'project-details.html?id=project2'
        },
        {
            id: 'project3',
            title: 'Project 3 Title',
            description: 'A short description of Project 3.',
            images: ['project3-img1.jpg', 'project3-img2.jpg'],
            detailsPage: 'project-details.html?id=project3'
        }
        // Add more projects as needed
    ];

    const projectList = document.getElementById('project-list');

    // Function to create project HTML elements
    const createProjectElements = () => {
        projectData.forEach(project => {
            const projectSection = document.createElement('section');
            projectSection.classList.add('project');

            const projectImages = project.images.map(image => `<img src="projects/${project.id}/images/${image}" alt="${image}">`).join('');

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
