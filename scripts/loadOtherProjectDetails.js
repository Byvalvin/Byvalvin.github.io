document.addEventListener('DOMContentLoaded', function() {
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

    // Retrieve project ID from URL query parameter
    const projectId = getParameterByName('id');

    // Fetch projects data from JSON file
    fetch('projects/other/otherprojects.json')
        .then(response => response.json())
        .then(data => {
            // Find the project details from the JSON data based on projectId
            const project = data.projects.find(p => p.otherDetailsPage === `other-project-details.html?id=${projectId}`);

            if (!project) {
                console.error(`Project with ID ${projectId} not found.`);
                return;
            }

            // Function to generate HTML for project details
            const generateProjectDetailsHTML = (project) => {
                const projectImages = project.images.map(image => `<img src="projects/other/images/${image}" alt="${image}">`).join('');
                const projectVideos = project.videos.map(video => video.startsWith("https://") ? `<iframe src="${video}" frameborder="0" allowfullscreen></iframe>` : `<video controls><source src="projects/other/videos/${video}" type="video/mp4"></video>`).join('');
                
                // Render the "Code" link if GitHub link exists
                const githubLinkHTML = project.githubLink ? `<p><a href="${project.githubLink}" target="_blank">Code</a></p>` : '';

                // Render the "Try it out" link if tryItOutLink exists
                const tryItOutLinkHTML = project.tryItOutLink ? `<p><a href="${project.tryItOutLink}" target="_blank">Try it out</a></p>` : '';

                return `
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                    <div class="project-images">${projectImages}</div>
                    <div class="project-videos">${projectVideos}</div>
                    ${githubLinkHTML}
                    ${tryItOutLinkHTML}
                `;
            };

            // Display project details on the page
            const projectDetailsContainer = document.getElementById('other-project-details');
            projectDetailsContainer.innerHTML = generateProjectDetailsHTML(project);
        })
        .catch(error => console.error('Error loading project details:', error));
});
