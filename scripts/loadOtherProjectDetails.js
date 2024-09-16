document.addEventListener('DOMContentLoaded', () => {
    // Function to parse query parameters from URL
    const getParameterByName = (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        return results ? decodeURIComponent(results[2].replace(/\+/g, ' ')) : null;
    };

    // Retrieve project ID from URL query parameter
    const projectId = getParameterByName('id');

    // Display loading message while fetching data
    const projectDetailsContainer = document.getElementById('other-project-details');
    projectDetailsContainer.innerHTML = '<p>Loading project details...</p>';

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Find the project details from the JSON data based on projectId
            const project = data.projects.find(p => p.otherDetailsPage.includes(`id=${projectId}`));
            
            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                projectDetailsContainer.innerHTML = '<p>Project not found.</p>';
                return;
            }

            // Function to generate HTML for project details
            const generateProjectDetailsHTML = (project) => {
                // Sanitize the image and video URLs
                const projectImages = project.images.map(image => 
                    `<img src="projects/other/images/${image}" alt="${image}" />`
                ).join('');

                const projectVideos = project.videos.map(video => 
                    video.startsWith("https://") ? 
                        `<iframe src="${video}" frameborder="0" allowfullscreen></iframe>` : 
                        `<video controls><source src="projects/other/videos/${video}" type="video/mp4" /></video>`
                ).join('');

                // Render the "Code" link if GitHub link exists
                const githubLinkHTML = project.githubLink ? 
                    `<a class="code-link" href="${project.githubLink}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>` : '';

                // Render the "Try it out" link if tryItOutLink exists
                const tryItOutLinkHTML = project.tryItOutLink ? 
                    `<a class="try-it-out-link" href="${project.tryItOutLink}" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-play"></i>
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

            // Display project details on the page
            projectDetailsContainer.innerHTML = generateProjectDetailsHTML(project);
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            projectDetailsContainer.innerHTML = '<p>Sorry, we were unable to load the project details at this time. Please try again later.</p>';
        });
});
