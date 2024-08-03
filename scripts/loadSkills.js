document.addEventListener('DOMContentLoaded', () => {
    fetch('about/skills.json')
        .then(response => response.json())
        .then(data => {
            const languagesContainer = document.getElementById('languages');
            const frameworksContainer = document.getElementById('frameworks');
            const technologiesContainer = document.getElementById('tech');

            data.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill-bar');

                const skillName = document.createElement('div');
                skillName.classList.add('skill-name');
                skillName.textContent = skill.name;

                const proficiencyBar = document.createElement('div');
                proficiencyBar.classList.add('bar');
                proficiencyBar.innerHTML = `<div class="fill proficiency" style="width: ${skill.proficiency}%;"></div>`;

                const durationBar = document.createElement('div');
                durationBar.classList.add('bar');
                durationBar.innerHTML = `<div class="fill duration" style="width: ${skill.duration}%;"></div>`;

                skillDiv.appendChild(skillName);
                skillDiv.appendChild(proficiencyBar);
                skillDiv.appendChild(durationBar);

                if (skill.projectUrl) {
                    const button = document.createElement('button');
                    button.textContent = 'See Details';
                    button.onclick = () => window.location.href = skill.projectUrl;
                    skillDiv.appendChild(button);
                }

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
