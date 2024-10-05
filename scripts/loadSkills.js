const categories = {
    language: ['General-Purpose', 'Specialised', 'Math & Data Analysis'],
    framework: ['Frontend', 'Backend', 'Other'],
    technology: ['DevTools', 'Database', 'DevOps', 'Other']
};

const defaultCategory = {
    language: 'General-Purpose',
    framework: 'Other',
    technology: 'Other'
};

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

document.addEventListener('DOMContentLoaded', () => {
    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            const containers = {
                language: document.getElementById('languages-columns'),
                framework: document.getElementById('frameworks-columns'),
                technology: document.getElementById('tech-columns')
            };

            const createdCategories = {
                language: {},
                framework: {},
                technology: {}
            };

            data.forEach(skill => {
                const skillDiv = createSkillBar(skill);
                const type = skill.type;
                let category = skill.category || defaultCategory[type];

                if (!categories[type].includes(category)) {
                    console.warn(`Category "${category}" not found for type "${type}". Using default category.`);
                    category = defaultCategory[type];
                }

                if (!createdCategories[type][category]) {
                    const categoryContainer = document.createElement('div');
                    categoryContainer.classList.add('category-container', `${type}-column`); // classList.add(items) add items in order of apperanace
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.textContent = category;
                    categoryContainer.appendChild(categoryTitle);
                    containers[type].appendChild(categoryContainer);

                    createdCategories[type][category] = categoryContainer;
                }

                createdCategories[type][category].appendChild(skillDiv);
            });

            // Create legends dynamically
            createLegends();
        })
        .catch(error => console.error('Error loading skills:', error));
});

function createSkillBar(skill) {
    const validTypes = ['language', 'framework', 'technology'];
    if (!validTypes.includes(skill.type)) {
        console.error(`Invalid skill type: ${skill.type}`);
        return;
    }

    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill-bar', `${skill.type}-bar`);

    const skillHeader = document.createElement('div');
    skillHeader.classList.add('skill-header');

    const skillName = document.createElement('div');
    skillName.classList.add('skill-name');
    skillName.textContent = skill.name;
    skillHeader.appendChild(skillName);

    if (skill.projectUrl) {
        let button = null;
        if(skill.projectUrl.includes('#')){ // is it a link to a portfolio page?
            button = document.createElement('button'); // Create a button instead of an anchor(more control over onclick. This is needed to call showSection)
            button.classList.add('button');
            button.textContent = 'Example'; // Can change this text as needed
            button.onclick = (event) => {
                const url = new URL(skill.projectUrl);
                const hash = url.hash ? url.hash.substring(1) : ''; // Get the part after the hash
                const projectId = hash.split('=')[1]; // manual way is tried and true
                const targetPage = hash.split('?')[0];
                showSection(event, targetPage, 'about', projectId);
                //window.open(skill.projectUrl, '_blank'); // Open in a new tab
            };
        }else{ // a regular link 
            button = document.createElement('a');
            button.classList.add('button');
            button.href = skill.projectUrl; // Set the URL from the skill object
            button.textContent = 'Example';
            button.target = '_blank'; // Open in a new tab
            button.rel = 'noopener noreferrer'; // Security best practice
        }
        
        skillHeader.appendChild(button); // Append the button to the skill header
    }

    skillDiv.appendChild(skillHeader);

    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');

    barContainer.appendChild(createBar('proficiency', skill.proficiency, skill.type));
    barContainer.appendChild(createBar('experience', skill.duration, skill.type));

    skillDiv.appendChild(barContainer);

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
    return colors[type]?.[barType] || '#ccc';
}

function createLegends() {
    const legendContainers = {
        language: document.querySelector('#languages .legend'),
        framework: document.querySelector('#frameworks .legend'),
        technology: document.querySelector('#tech .legend')
    };

    Object.keys(legendContainers).forEach(type => {
        const legendContainer = legendContainers[type];

        if (legendContainer) {
            // Clear previous legends if any
            legendContainer.innerHTML = '';

            Object.keys(colors[type]).forEach(barType => {
                const legendItem = document.createElement('div');
                legendItem.classList.add('legend-item');

                const colorBox = document.createElement('div');
                colorBox.classList.add('color-box');
                colorBox.style.backgroundColor = colors[type][barType];

                const label = document.createElement('span');
                label.textContent = barType.charAt(0).toUpperCase() + barType.slice(1);

                legendItem.appendChild(colorBox);
                legendItem.appendChild(label);

                legendContainer.appendChild(legendItem);
            });
        }
    });
}

