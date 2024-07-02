// loadProjectDetails.js

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

    // Example data for project details (replace with actual data retrieval logic)
    const projectId = getParameterByName('id');
    const projectDetails = {
        project1: {
            title: 'Project 1 Title',
            description: 'Detailed description of Project 1.',
            images: ['project1-img1.jpg', 'project1-img2.jpg'],
            videos: ['project1-video1.mp4'],
            technologies: ['Vue.js', 'Django'],
            contributions: 'Frontend development using Vue.js, backend with Django.',
            bestFeatures: 'Excellent user interface and performance.',
            rating: 4.5
        },
        project2: {
            title: 'Project 2 Title',
            description: 'Detailed description of Project 2.',
            images: ['project2-img1.jpg', 'project2-img2.jpg'],
            videos: ['project2-video1.mp4'],
            technologies: ['React', 'Node.js'],
            contributions: 'Full-stack development with React and Node.js.',
            bestFeatures: 'Scalability and real-time updates.',
            rating: 4.8
        },
        project3: {
            title: 'Project 3 Title',
            description: 'Detailed description of Project 3.',
            images: ['project3-img1.jpg', 'project3-img2.jpg'],
            videos: [],
            technologies: ['Angular', 'Spring Boot'],
            contributions: 'Frontend using Angular, backend with Spring Boot.',
            bestFeatures: 'Security features and robust architecture.',
            rating: 4.3
        }
        // Add more projects as needed
    };

    const projectDetailsContainer = document.getElementById('project-details');

    // Function to create project details HTML
    const createProjectDetails = () => {
        const project = projectDetails[projectId];
        if (!project) {
            console.error(`Project with ID ${projectId} not found.`);
            return;
        }

        const projectImages = project.images.map(image => `<img src="projects/${projectId}/images/${image}" alt="${image}">`).join('');
        const projectVideos = project.videos.map(video => `<video controls><source src="projects/${projectId}/videos/${video}" type="video/mp4"></video>`).join('');

        projectDetailsContainer.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="project-images">${projectImages}</div>
            <div class="project-videos">${projectVideos}</div>
            <h3>Technologies Used</h3>
            <ul>
                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
            <h3>My Contributions</h3>
            <p>${project.contributions}</p>
            <h3>Best Features</h3>
            <p>${project.bestFeatures}</p>
            <h3>Rating</h3>
            <p>${project.rating}</p>
        `;
    };

    // Call function to create project details
    createProjectDetails();
});
