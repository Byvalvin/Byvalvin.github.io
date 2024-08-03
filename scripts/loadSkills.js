document.addEventListener('DOMContentLoaded', () => {
    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            populateSkills(data);
        })
        .catch(error => {
            console.error('Error loading skills data:', error);
        });
});

function populateSkills(data) {
    // Helper function to create a skill bar
    function createSkillBar(name, proficiency, experience, type) {
        // Create skill bar container
        const skillBar = document.createElement('div');
        skillBar.classList.add('skill-bar', `${type}-bar`);
        
        // Create and append skill name
        const skillName = document.createElement('div');
        skillName.classList.add('skill-name');
        skillName.textContent = name;
        skillBar.appendChild(skillName);
        
        // Create and append proficiency bar
        const proficiencyBar = document.createElement('div');
        proficiencyBar.classList.add('bar');
        const proficiencyFill = document.createElement('div');
        proficiencyFill.classList.add('fill');
        proficiencyFill.style.width = `${proficiency}%`;
        proficiencyFill.style.backgroundColor = getColor(type, 'proficiency');
        proficiencyBar.appendChild(proficiencyFill);
        skillBar.appendChild(proficiencyBar);
        
        // Create and append experience bar
        const experienceBar = document.createElement('div');
        experienceBar.classList.add('bar');
        const experienceFill = document.createElement('div');
        experienceFill.classList.add('fill');
        experienceFill.style.width = `${experience}%`;
        experienceFill.style.backgroundColor = getColor(type, 'experience');
        experienceBar.appendChild(experienceFill);
        skillBar.appendChild(experienceBar);
        
        return skillBar;
    }
    
    // Helper function to get color based on type and bar
    function getColor(type, barType) {
        if (barType === 'proficiency') {
            switch (type) {
                case 'language':
                    return '#4caf50'; // Green for languages
                case 'framework':
                    return '#2196f3'; // Blue for frameworks
                case 'tech':
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
                case 'tech':
                    return '#ffcc80'; // Light orange for experience
                default:
                    return '#ccc'; // Default color
            }
        }
    }

    // Find and populate skill sections
    data.forEach(skill => {
        const skillElement = createSkillBar(
            skill.name,
            skill.proficiency,    // percentage of how good you are
            skill.experience,     // percentage of time used
            skill.type            // type: language, framework, tech
        );

        const container = document.getElementById(skill.type);
        if (container) {
            container.appendChild(skillElement);
        }
    });
}
