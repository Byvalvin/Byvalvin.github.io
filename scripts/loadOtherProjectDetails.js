// loadOtherProjectDetails.js

const loadOtherProjectDetails = (projectId) => {
    const projectDetailsContainer = document.getElementById('other-project-details');
    projectDetailsContainer.innerHTML = '<p>Loading project details...</p>';

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);

            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                projectDetailsContainer.innerHTML = '<p>Project not found.</p>';
                return;
            }

            // Function to generate HTML for project details
            const generateProjectDetailsHTML = (project) => {
                const projectImages = project.images.map(image => 
                    `<img src="projects/other/images/${image}" alt="${image}" />`
                ).join('');

                const projectVideos = project.videos.map(video => 
                    video.startsWith("https://") ? 
                        `<iframe src="${video}" frameborder="0" allowfullscreen></iframe>` : 
                        `<video controls><source src="projects/other/videos/${video}" type="video/mp4" /></video>`
                ).join('');

                const githubLinkHTML = project.githubLink ? 
                    `<a class="code-link" href="${project.githubLink}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                        <span class="btn-text">View on Github</span>
                    </a>` : '';

                const tryItOutLinkHTML = project.tryItOutLink ? 
                    `<a class="try-it-out-link" href="${project.tryItOutLink}" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-play"></i>
                        <span class="btn-text">Try It Out</span>
                    </a>` : '';
                
                return `
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                    <div class="project-images">${projectImages}</div>
                    <div class="project-videos">${projectVideos}</div>
                    <div class="project-links">
                        ${githubLinkHTML}
                        ${tryItOutLinkHTML}
                    </div>
                `;
            };

            projectDetailsContainer.innerHTML = generateProjectDetailsHTML(project);
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            projectDetailsContainer.innerHTML = '<p>Sorry, we were unable to load the project details at this time. Please try again later.</p>';
        });
};

// Attach the function to the global window object for access
window.loadOtherProjectDetails = loadOtherProjectDetails;
