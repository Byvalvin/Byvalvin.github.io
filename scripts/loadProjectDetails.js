// loadProjectDetails.js

// Function to parse query parameters from URL
function getParameterByName(name, url = window.location.href) {
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    return results && results[2] ? decodeURIComponent(results[2].replace(/\+/g, ' ')) : null;
}


function loadProjectDetails(projectId) {
    console.log("Loading project details for ID:", projectId);
    const projectDetailsContainer = document.getElementById('project-details');

    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    // Fetch project details from JSON file
    fetch('projects/projectDetails.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const project = data[projectId];
            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                projectDetailsContainer.innerHTML = `<p>Project not found.</p>`;
                loadingScreen.style.display = 'none'; // Hide loading screen
                return;
            }

            // Generate HTML for project elements (same as your original implementation)
            const projectImages = project.images.map(image => `
                <img src="projects/${projectId}/images/${image}" alt="${project.title} image" class="project-image">
            `).join('');

            const projectVideos = project.videos.map(video => `
                <video controls aria-label="${project.title} video">
                    <source src="projects/${projectId}/videos/${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `).join('');

            const techCards = Object.entries(project.technologies).map(([tech, description]) => {
                // Handle special case for "C#"
                const techIcon = tech === 'C#' ? 
                    `projects/icons/c%23.svg` : 
                    `projects/icons/${tech.replace(/\s+/g, '').toLowerCase()}.svg`;
            
                return `
                    <div class="tech-card">
                        <div class="tech-icon">
                            <img src="${techIcon}" alt="${tech}">
                        </div>
                        <div class="tech-info">
                            <h4>${tech}</h4>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
            }).join('');

            const contrItems = project.contributions.map(contr => `
                <div class="contribution-item">
                    <p>${contr}</p>
                </div>
            `).join('');

            const buttonsHTML = `
                ${project.codeUrl ? 
                  `<a href="${project.codeUrl}" class="btn code-btn" target="_blank" rel="noopener noreferrer">
                      <i class="fab fa-github"></i>
                      <span class="btn-text">View Code</span>
                    </a>` : ''}
                ${project.tryItOutUrl ? 
                  `<a href="${project.tryItOutUrl}" class="btn try-btn" target="_blank" rel="noopener noreferrer">
                      <i class="fa-solid fa-circle-play"></i>
                      <span class="btn-text">Try It Out</span>
                  </a>` : ''}
            `;

            // Populate the project details container
            projectDetailsContainer.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="project-images">${projectImages}</div>
                <div class="project-videos">${projectVideos}</div>
                <h3 class="accordion-title" data-target="technologies" aria-controls="technologies" aria-expanded="false">
                    Technologies Used
                    <span class="chevron">&#9660;</span>
                </h3>
                <div class="accordion-body technologies-body" id="technologies">
                    ${techCards}
                </div>
                <h3>Best Features</h3>
                <p>${project.bestFeatures}</p>
                <h3>Rating</h3>
                <p>${project.rating}</p>
                <div class="project-buttons">${buttonsHTML}</div>
            `;
            loadingScreen.style.display = 'none'; // Hide loading screen

            // Add event listeners for accordion functionality
            document.querySelectorAll('.accordion-title').forEach(header => {
                header.addEventListener('click', () => {
                    const target = header.getAttribute('data-target');
                    const accordionBody = document.getElementById(target);
                    const chevron = header.querySelector('.chevron');
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';

                    // Toggle accordion body visibility
                    header.setAttribute('aria-expanded', !isExpanded);
                    accordionBody.style.display = isExpanded ? 'none' : 'block';
                    chevron.innerHTML = isExpanded ? '&#9660;' : '&#9650;';
                });
            });
        })
        .catch(error => {
            console.error('Error loading project details:', error);
            projectDetailsContainer.innerHTML = `<p>Error loading project details. Please try again later.</p>`;
            loadingScreen.style.display = 'none'; // Hide loading screen
        });
}
