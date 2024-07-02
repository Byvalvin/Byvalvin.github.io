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

    // Example data for project details (replace with actual data retrieval logic)
    const projectId = getParameterByName('id');
    console.log(projectId);
    const projectDetails = {
        qrapp: {
            title: 'QRapp',
            description: 'QRapp is designed to be a fun, engaging and social experience for users. You choose the way you play: You can design to be a casual collector of some of the highest, lowest or coolest codes or compete against friends or other QR Hunters for top positions one the many leaderboards. As you play, you might become aware of te fact that codes are everywhere! ',
            images: ['qrapp1.jpg', 'qrapp2.jpg','qrapp3.jpg', 'qrapp4.jpg','qrapp5.jpg', 'qrapp6.jpg',],
            videos: ['QRAPP.webm'],
            technologies: {
                'Android Studio': 'IDE, Frontend, business logic and connection to Backend',
                'Figma': 'Wireframing and Storyboarding',
                'Firebase/Firestore': 'Data Storage and Management',
                'Java': 'Formal programming language',
                'GitHub': 'Version Control, Documentation and Task management.'
            },
            contributions: [
                "Ensuring all our work is properly documented on github and github wiki pages",
                "Keeping meeting minutes for all meetings and documenting them",
                "Storyboarding all use cases and user experiences",
                "Business Logic for placing code on a map, Creation of the Map Page and Map UI/UX Design",
                "Integration of the Google Maps API",
                "Business logic for ranking users and Creation of the Leaderboard pages",
                "App Layout and Navigation planning and setup"
                
            ],
            bestFeatures: 'Excellent user interface and performance: The look and feel of the app is excellent. We put alot of thought an planning into catching the users attention and keep it as they use the app. I believe it is one of the more beautiful and well designed apps I have worked on.',
            rating: 4.0
        },
        aranimal: {
            title: 'AR Animal Identification',
            description: "The AR Animal Identification app is part of Aquatic Biosphere many projects designed to spread awareness and raise funds to support, uphold and maintain the Albertan Biosphere. Aquatic Biosphere is a non-profit with a singluar mission: 'To educate, inspire and empower people to play an active role in the conservation of our aquatic ecosystems.' We designed this app exactly for this reason. It is designed to accompany a trailer with a vinyl sticker illustrate the various organisms of the ALbertan Bioshpere. Users will be able to identify these organisms and learn about them from interactive games and activities. The app is also designed to allow for effortless customiztion for admin roles to add, remove and modify information presented to users. Create a profile and experience the wonders of the Albertan Biospere. ",
            images: ['aranimal1.jpg','aranimal3.jpg','aranimal4.jpg','aranimal5.jpg','aranimal6.jpg',],
            videos: ['ARANIMAL.webm'],
            technologies: {
                'Android Studio/Visual Studio': 'IDE',
                'Figma': 'Wireframing and Storyboarding',
                'Flutter': 'Frontend, Business Logic, Connection to Backend',
                'FastAPI': 'Backend, Creating API endpoints to and from Database and for Image Recognition',
                'PostgreSQL': 'Data Storage and Management',
                'Dart, Python, SQL': 'Formal programming/query languages',
                'OpenCV': 'Computer Vision Library used for Image Processing and Image Identification',
                'Poetry': 'Package Management',
                'Cybera': 'Cloud Infrastructure and services',
                'Uvicorn': 'Serve/deploy internal image recoginition and User APIs',
                'GitHub': 'Version Control, Documentation and Task management.',
                'VuePress.js': 'Creation of a simple website for Full Documentation and Project Planning'
            },
            contributions: [
                "Ensuring all our work is properly documented on github + VuePress.js and github wiki pages",
                "Keeping meeting minutes for all meetings and documenting them",
                "Storyboarding all use cases and user experiences",
                "Image Recognition process and methods using OpenCV and integration of system into app",
                "Optimisation of Image Processing",
                "Games and Activities Design and Architecture Planning",
                "All Game-related Pages and Control Logic",
                "Admin page setup",
            ],
            bestFeatures: 'Cross-Platform and Cross-Device compatability. It was important that we make the app as accessible as possible to reach as many users as possible. The app is designed to work on many different phones(tested 4 year old phones), on both Android and iOS ecosystems and on mobile devices like tablets. Accessibility at its finest',
            rating: 4.4
        },
        // project3: {
        //     title: 'Project 3 Title',
        //     description: 'Detailed description of Project 3.',
        //     images: ['project3-img1.jpg', 'project3-img2.jpg'],
        //     videos: [],
        //     technologies: ['Angular', 'Spring Boot'],
        //     contributions: 'Frontend using Angular, backend with Spring Boot.','Full-stack development with React and Node.js.',Scalability and real-time updates'.,
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
        // ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
        // const techStack = ${Object.entries(project.technologies).map(([tech, description]) => `<li><strong>${tech}:</strong> ${description}</li>`).join('');}
        projectDetailsContainer.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="project-images">${projectImages}</div>
            <div class="project-videos">${projectVideos}</div>
            <h3>Technologies Used</h3>
            <ul>
                ${Object.entries(project.technologies).map(([tech, description]) => `<li><strong>${tech}:</strong> ${description}</li>`).join('')}
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
