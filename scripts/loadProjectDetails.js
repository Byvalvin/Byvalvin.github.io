
// loadProjectDetails.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("woke");

    // Function to parse query parameters from URL
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const projectId = getParameterByName('id');
    console.log(projectId);

    // Fetch project details from JSON file
    fetch('projects/projectDetails.json')
        .then(response => response.json())
        .then(data => {
            const project = data[projectId];
            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                return;
            }

            const projectImages = project.images.map(image => `<img src="projects/${projectId}/images/${image}" alt="${image}">`).join('');
            const projectVideos = project.videos.map(video => `<video controls><source src="projects/${projectId}/videos/${video}" type="video/mp4"></video>`).join('');

            const techCards = Object.entries(project.technologies).map(([tech, description]) => `
                <div class="tech-card">
                    <div class="tech-icon"><img src="projects/icons/${tech.split(' ').join('').toLowerCase().replace(/ /g, '-')}.svg" alt="${tech}"></div>
                    <div class="tech-info">
                        <h4>${tech}</h4>
                        <p>${description}</p>
                    </div>
                </div>
            `).join('');

            const contrItems = project.contributions.map(contr => `
                <div class="contribution-item">
                    <p>${contr}</p>
                </div>
            `).join('');

            let buttonsHTML = '';
            if (project.codeUrl) {
                buttonsHTML += `<a href="${project.codeUrl}" class="btn code-btn" target="_blank">View Code</a>`;
            }
            if (project.tryItOutUrl) {
                buttonsHTML += `<a href="${project.tryItOutUrl}" class="btn try-btn" target="_blank">Try It Out</a>`;
            }

            const projectDetailsContainer = document.getElementById('project-details');
            projectDetailsContainer.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="project-images">${projectImages}</div>
                <div class="project-videos">${projectVideos}</div>
                <h3 class="accordion-title" data-target="technologies">
                    Technologies Used
                    <span class="chevron" data-target="technologies">&#9660;</span>
                </h3>
                <div class="accordion-body technologies-body">
                    ${techCards}
                </div>
                <h3 class="accordion-title" data-target="contributions">
                    My Contributions
                    <span class="chevron" data-target="contributions">&#9660;</span>
                </h3>
                <div class="accordion-body contributions-body">
                    ${contrItems}
                </div>
                <h3>Best Features</h3>
                <p>${project.bestFeatures}</p>
                <h3>Rating</h3>
                <p>${project.rating}</p>
                <!-- Conditionally Render Buttons -->
                <div class="project-buttons">
                    ${buttonsHTML}
                </div>
            `;

            // Add event listeners for accordion functionality
            document.querySelectorAll('.accordion-title').forEach(header => {
                header.addEventListener('click', () => {
                    const target = header.getAttribute('data-target');
                    const accordionBody = document.querySelector(`.${target}-body`);
                    const chevron = header.querySelector('.chevron');
                    const isExpanded = accordionBody.style.display === 'block';
                    
                    // Hide all accordion bodies
                    document.querySelectorAll('.accordion-body').forEach(body => {
                        body.style.display = 'none';
                        body.classList.remove('expanded');
                        body.previousElementSibling.querySelector('.chevron').innerHTML = '&#9660;';
                    });

                    // Toggle current accordion body
                    if (isExpanded) {
                        accordionBody.style.display = 'none';
                        chevron.innerHTML = '&#9660;';
                    } else {
                        accordionBody.style.display = 'block';
                        chevron.innerHTML = '&#9650;';
                        //accordionBody.classList.add('expanded');
                    }
                });
            });
        })
        .catch(error => console.error('Error loading project details:', error));
});
