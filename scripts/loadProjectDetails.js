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
    console.log(projectId);
    const projectDetails = {
        qrapp: {
            title: 'QRapp',
            description: 'QRapp is designed to be a fun, engaging and social experience for users. You choose the way you play: You can design to be a casual collector of some of the highest, lowest or coolest codes or compete against friends or other QR Hunters for top positions one the many leaderboards. As you play, you might become aware of te fact that codes are everywhere! ',
            images: ['qrapp1.jpg', 'qrapp2.jpg'],
            videos: ['QRAPP.webm'],
            technologies: [
                'Android Studio: Frontend, business logic and conencting to Backend',
                'Firebase/Firestore: Data Storage and Management',
                'Java: Formal programming language',
                'Figma: Wireframing and Storyboarding',
                'GitHub: Version Control, Documentation and Task management.'
            ],
            contributions: [
                "Ensuring all our work is properly documented on github and github wiki pages",
                "Keeping meeting minutes for all meetings and documenting them",
                "Storyboarding all use cases and user experiences",
                "Business Logic and Creation of the Map Page and Map UI/UX",
                "Integration of the Google Maps API",
                "Business logic for ranking users and Creation of the Leaderboard pages",
                "App Layout and Navigation planning and setup"
                
            ],
            bestFeatures: 'Excellent user interface and performance: The look and feel of the app is excellent. We put alot of thought an planning into catching the users attention and keep it as they use the app. I believe it is one of the more beautiful and well designed apps I have worked on.',
            rating: 4.0
        },
        aranimal: {
            title: 'AR Animal Identification',
            description: 'Detailed description of Project 2.',
            images: [],
            videos: ['ARANIMAL.webm'],
            technologies: ['Flutter', 'Poetry'],
            contributions: 'Full-stack development with React and Node.js.',
            bestFeatures: 'Scalability and real-time updates.',
            rating: 4.8
        },
        // project3: {
        //     title: 'Project 3 Title',
        //     description: 'Detailed description of Project 3.',
        //     images: ['project3-img1.jpg', 'project3-img2.jpg'],
        //     videos: [],
        //     technologies: ['Angular', 'Spring Boot'],
        //     contributions: 'Frontend using Angular, backend with Spring Boot.',
        //     bestFeatures: 'Security features and robust architecture.',
        //     rating: 4.3
        // }
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
             <ul>
                ${project.contributions.map(contr => `<li>${contr}</li>`).join('')}
            </ul>
            <h3>Best Features</h3>
            <p>${project.bestFeatures}</p>
            <h3>Rating</h3>
            <p>${project.rating}</p>
        `;
    };

    // Call function to create project details
    createProjectDetails();
});
