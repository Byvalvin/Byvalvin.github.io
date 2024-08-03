document.addEventListener('DOMContentLoaded', () => {
    // Define categories for each skill type
    const categories = {
        language: ['General-Purpose', 'Specialised', 'Math & Data Analysis'],
        framework: ['Frontend', 'Backend', 'Other'],
        technology: ['DevTools', 'Database', 'DevOps', 'Other']
    };

    // Default category if no match is found
    const defaultCategory = {
        language: 'General-Purpose',
        framework: 'Other',
        technology: 'Other'
    };

    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            const containers = {
                language: document.getElementById('languages'),
                framework: document.getElementById('frameworks'),
                technology: document.getElementById('tech')
            };

            // Keep track of created categories to avoid duplicates
            const createdCategories = {
                language: {},
                framework: {},
                technology: {}
            };

            data.forEach(skill => {
                const skillDiv = createSkillBar(skill);
                const type = skill.type;
                const category = skill.category || defaultCategory[type];
                
                // Create category section if it doesn't exist
                if (!categories[type].includes(category)) {
                    console.warn(`Category "${category}" not found for type "${type}". Using default category.`);
                    category = defaultCategory[type];
                }

                if (!createdCategories[type][category]) {
                    const categoryContainer = document.createElement('div');
                    categoryContainer.classList.add('category-container');
                    const categoryTitle = document.createElement('h3');
                    categoryTitle.textContent = category;
                    categoryContainer.appendChild(categoryTitle);
                    containers[type].appendChild(categoryContainer);

                    // Track the created category
                    createdCategories[type][category] = categoryContainer;
                }

                // Append the skill bar to the corresponding category container
                createdCategories[type][category].appendChild(skillDiv);
            });
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
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
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
