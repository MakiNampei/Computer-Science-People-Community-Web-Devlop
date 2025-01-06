// Dark Mode Toggle
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode')
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';

    // Ensure fading sections are re-evaluated after dark mode toggles
    recheckFadingSections();
});

// Fading Sections
const fadeSections = document.querySelectorAll('.fade-section');

function recheckFadingSections() {
    fadeSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', recheckFadingSections);

// Initial check for fading sections
recheckFadingSections();

// Reduce Motion Button Functionality
const reduceMotionButton = document.getElementById('reduceMotionButton');
reduceMotionButton.addEventListener('click', () => {
    motionReduced = !motionReduced; // Toggle motion preference
    document.body.classList.toggle('reduce-motion', motionReduced); // Apply reduce-motion class to body

    // Update button text
    reduceMotionButton.textContent = motionReduced ? 'Enable Motion' : 'Reduce Motion';

    // If motion is reduced, ensure all sections are visible
    if (motionReduced) {
        fadeSections.forEach(section => {
            section.classList.add('visible');
        });
    }
});

// Reusable Functions
function openModal(modalElement) {
    modalElement.style.display = 'flex';
}

function closeModal(modalElement) {
    modalElement.style.display = 'none';
}

// Ensure no duplicate variable declarations
const modal = document.getElementById('modal');
const contactAuthorModal = document.getElementById('contactAuthorModal');
const suggestionBoxModal = document.getElementById('suggestionBoxModal');

// Buttons to open modals
const contactAuthorButton = document.getElementById('contactAuthorButton');
const suggestionBoxButton = document.getElementById('suggestionBoxButton');

// Close buttons
const closeModalButton = document.getElementById('closeModal');
const closeContactAuthorModalButton = document.getElementById('closeContactAuthorModal');
const closeSuggestionBoxModalButton = document.getElementById('closeSuggestionBoxModal');

// Petition form and related elements
const petitionForm = document.getElementById('petitionForm');
const signatureList = document.getElementById('signatureList');
const signatureCount = document.getElementById('signatureCount');

// Open modal function
function openModal(modalElement) {
    modalElement.style.display = 'flex';
}

// Close modal function
function closeModal(modalElement) {
    modalElement.style.display = 'none';
}

// Add event listeners to open modals
contactAuthorButton.addEventListener('click', () => openModal(contactAuthorModal));
suggestionBoxButton.addEventListener('click', () => openModal(suggestionBoxModal));

// Add event listeners to close modals
closeModalButton.addEventListener('click', () => closeModal(modal));
closeContactAuthorModalButton.addEventListener('click', () => closeModal(contactAuthorModal));
closeSuggestionBoxModalButton.addEventListener('click', () => closeModal(suggestionBoxModal));

// Close modal when clicking outside the modal
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
    if (event.target === contactAuthorModal) closeModal(contactAuthorModal);
    if (event.target === suggestionBoxModal) closeModal(suggestionBoxModal);
});

// Petition form submission
petitionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form refresh

    // Get name and email values
    const name = petitionForm.querySelector('#name').value.trim();
    const email = petitionForm.querySelector('#email').value.trim();

    if (name && validateEmail(email)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name} (${email})`;
        signatureList.appendChild(listItem);

        updateSignatureCount();
        petitionForm.reset();

        openModal(modal); // Open the Thank You modal
    } else {
        alert('Please enter a valid name and email.');
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! The author will contact you soon.');
    closeModal(contactAuthorModal);
});

// Suggestion form submission
document.getElementById('suggestionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your suggestion!');
    closeModal(suggestionBoxModal);
});

// Validate email function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update signature count
function updateSignatureCount() {
    signatureCount.textContent = signatureList.children.length;
}
