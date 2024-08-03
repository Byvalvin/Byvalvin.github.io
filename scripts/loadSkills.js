document.addEventListener('DOMContentLoaded', () => {
    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            const languagesContainer = document.getElementById('languages');
            const frameworksContainer = document.getElementById('frameworks');
            const technologiesContainer = document.getElementById('tech');

            data.forEach(skill => {
                // Create skill bar container
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill-bar', `${skill.type}-bar`);

                // Create and append skill name
                const skillName = document.createElement('div');
                skillName.classList.add('skill-name');
                skillName.textContent = skill.name;
                skillDiv.appendChild(skillName);

                // Create a container for the bars
                const barContainer = document.createElement('div');
                barContainer.classList.add('bar-container');

                // Create and append proficiency bar
                const proficiencyBar = document.createElement('div');
                proficiencyBar.classList.add('bar');
                const proficiencyFill = document.createElement('div');
                proficiencyFill.classList.add('fill', 'proficiency');
                proficiencyFill.style.width = `${skill.proficiency}%`;
                proficiencyFill.style.backgroundColor = getColor(skill.type, 'proficiency');
                proficiencyBar.appendChild(proficiencyFill);

                // Create and append duration bar
                const durationBar = document.createElement('div');
                durationBar.classList.add('bar');
                const durationFill = document.createElement('div');
                durationFill.classList.add('fill', 'duration');
                durationFill.style.width = `${skill.duration}%`;
                durationFill.style.backgroundColor = getColor(skill.type, 'experience');
                durationBar.appendChild(durationFill);

                // Append bars to the container
                barContainer.appendChild(proficiencyBar);
                barContainer.appendChild(durationBar);

                // Append bar container to skillDiv
                skillDiv.appendChild(barContainer);

                // Create and append project button if URL is provided
                if (skill.projectUrl) {
                    const button = document.createElement('a');
                    button.classList.add('button');
                    button.href = skill.projectUrl;
                    button.textContent = 'See Details';
                    skillDiv.appendChild(button);
                }

                // Append skillDiv to the appropriate container based on type
                switch (skill.type) {
                    case 'language':
                        languagesContainer.appendChild(skillDiv);
                        break;
                    case 'framework':
                        frameworksContainer.appendChild(skillDiv);
                        break;
                    case 'technology':
                        technologiesContainer.appendChild(skillDiv);
                        break;
                }
            });
        })
        .catch(error => console.error('Error loading skills:', error));
});

// Helper function to get color based on type and bar
function getColor(type, barType) {
    if (barType === 'proficiency') {
        switch (type) {
            case 'language':
                return '#4caf50'; // Green for languages
            case 'framework':
                return '#2196f3'; // Blue for frameworks
            case 'technology':
                return '#ff9800'; // Orange for technologies
            default:
                return '#ccc'; // Default color
        }
    } else if (barType === 'experience') {
        switch (type) {
            case 'language':
                return '#a5d6a7'; // Light green for experience
            case 'framework':
                return '#90caf9'; // Light blue for experience
            case 'technology':
                return '#ffcc80'; // Light orange for experience
            default:
                return '#ccc'; // Default color
        }
    }
}
