// loadOtherProjectDetails.js

// Function to get the project ID from the URL hash
function getOtherProjectId() {
    console.log("used this id getter")
    const hash = window.location.hash;
    const regex = /id=([^&]+)/; // Updated to capture IDs with potential additional parameters
    const match = hash.match(regex);
    return match ? match[1] : null; // Return the project ID or null if not found
};

const loadOtherProjectDetails = (projectId) => {
    const projectDetailsContainer = document.getElementById('other-project-details');

    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const project = data.projects.find(p => p.otherDetailsPage.includes(`id=${projectId}`));

            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                projectDetailsContainer.innerHTML = '<p>Project not found.</p>';
                loadingScreen.style.display = 'none'; // Hide loading screen
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
                
                // Loop through technologies and display them, handle both icon and image
                const techListHTML = project.technologies ? 
                    Object.keys(project.technologies).map((tech, index) => {
                        const techData = project.technologies[tech];
                        let techHTML = '';
                        
                        if (techData.icon) {
                            // If icon exists, display only the icon initially
                            techHTML = `
                                <div class="tech-item" data-tech="${tech}" style="--item-index: ${index + 1}">
                                    <i class="tech-icon fa ${techData.icon || 'fa-cogs'}"></i>
                                    <span class="tooltip">${tech}</span>  <!-- Tooltip shows the technology title -->
                                </div>
                            `;
                        } else if (techData.image) {
                            // If image exists, display only the image initially
                            techHTML = `
                                <div class="tech-item" data-tech="${tech}" style="--item-index: ${index + 1}">
                                    <img src="${techData.image}" alt="${tech}" class="tech-icon-img" />
                                    <span class="tooltip">${tech}</span>  <!-- Tooltip shows the technology title -->
                                </div>
                            `;
                        }
                        return techHTML;
                    }).join('') : '';


                
                return `
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                    <div class="project-images">${projectImages}</div>
                    <div class="project-videos">${projectVideos}</div>
                    <div class="technologies">
                        ${techListHTML}
                    </div>
                    <div class="project-links">
                        ${githubLinkHTML}
                        ${tryItOutLinkHTML}
                    </div>
                `;
            };

            projectDetailsContainer.innerHTML = generateProjectDetailsHTML(project);
            loadingScreen.style.display = 'none'; // Hide loading screen after loading is done
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            projectDetailsContainer.innerHTML = '<p>Sorry, we were unable to load the project details at this time. Please try again later.</p>';
            loadingScreen.style.display = 'none'; // Hide loading screen on error
        });
};

