document.addEventListener('DOMContentLoaded', () => {
    // Form Toggle Functionality
    const showFormButton = document.getElementById('show-form-button');
    const contactForm = document.getElementById('contact-form');
    const contactFormWrapper = document.getElementById('contact-form-wrapper');

    showFormButton.addEventListener('click', () => {
        if (contactForm.style.display === 'none' || contactForm.style.display === '') {
            contactForm.style.display = 'block';
            contactFormWrapper.style.backgroundColor = 'var(--body-light-text-color)'; // Ensure background color is set
        } else {
            contactForm.style.display = 'none';
            contactFormWrapper.style.backgroundColor = ''; // Reset background color
        }
    });

    // Word Limit Functionality
    const messageField = document.getElementById('message');
    const wordCountSpan = document.getElementById('word-count');
    const wordLimit = 500; // Set your word limit here

    messageField.addEventListener('input', () => {
        const words = messageField.value.split(/\s+/).filter(Boolean);
        wordCountSpan.textContent = words.length;
        
        if (words.length > wordLimit) {
            messageField.value = words.slice(0, wordLimit).join(' ');
            wordCountSpan.textContent = wordLimit;
            alert(`You can only enter up to ${wordLimit} words.`);
        }
    });
});
