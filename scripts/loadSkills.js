document.addEventListener('DOMContentLoaded', () => {
    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            const containers = {
                language: document.getElementById('languages'),
                framework: document.getElementById('frameworks'),
                technology: document.getElementById('tech')
            };

            const fragment = document.createDocumentFragment();

            data.forEach(skill => {
                const skillDiv = createSkillBar(skill);
                const container = containers[skill.type];
                if (container) {
                    fragment.appendChild(skillDiv);
                }
            });

            // Append all skill bars at once to reduce DOM reflows
            Object.values(containers).forEach(container => container.appendChild(fragment));
        })
        .catch(error => console.error('Error loading skills:', error));
});

function createSkillBar(skill) {
    //error handle
    const validTypes = ['language', 'framework', 'technology'];
    if (!validTypes.includes(skill.type)) {
        console.error(`Invalid skill type: ${skill.type}`);
        return;
    }

    // creation of skill bar
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill-bar', `${skill.type}-bar`);

    const skillName = document.createElement('div');
    skillName.classList.add('skill-name');
    skillName.textContent = skill.name;
    skillDiv.appendChild(skillName);

    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');

    barContainer.appendChild(createBar('proficiency', skill.proficiency, skill.type));
    barContainer.appendChild(createBar('experience', skill.duration, skill.type));

    skillDiv.appendChild(barContainer);

    if (skill.projectUrl) {
        const button = document.createElement('a');
        button.classList.add('button');
        button.href = skill.projectUrl;
        button.textContent = 'See Details';
        button.target = '_blank'; // Open in new tab
        button.rel = 'noopener noreferrer'; // Security best practice        
        skillDiv.appendChild(button);
    }

    return skillDiv;
}

function createBar(barType, widthPercentage, type) {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    const fill = document.createElement('div');
    fill.classList.add('fill', barType);
    fill.style.width = `${widthPercentage}%`;
    fill.style.backgroundColor = getColor(type, barType);

    bar.appendChild(fill);
    return bar;
}

function getColor(type, barType) {
    const colors = {
        language: {
            proficiency: '#4caf50',
            experience: '#a5d6a7'
        },
        framework: {
            proficiency: '#2196f3',
            experience: '#90caf9'
        },
        technology: {
            proficiency: '#ff9800',
            experience: '#ffcc80'
        }
    };

    return colors[type]?.[barType] || '#ccc';
}
