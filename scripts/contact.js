document.addEventListener('DOMContentLoaded', () => {
    // Form Toggle Functionality
    const showFormButton = document.getElementById('show-form-button');
    const contactForm = document.getElementById('contact-form');

    showFormButton.addEventListener('click', () => {
        if (contactForm.style.display === 'none' || contactForm.style.display === '') {
            contactForm.style.display = 'block';
        } else {
            contactForm.style.display = 'none';
        }
    });

    // Word Limit Functionality
    const messageField = document.getElementById('message');
    const wordLimit = 500; // Set your word limit here

    messageField.addEventListener('input', () => {
        const words = messageField.value.split(/\s+/).filter(Boolean);
        if (words.length > wordLimit) {
            messageField.value = words.slice(0, wordLimit).join(' ');
            alert(`You can only enter up to ${wordLimit} words.`);
        }
    });
});
