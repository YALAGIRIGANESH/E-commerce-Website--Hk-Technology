// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Call Now functionality for all call buttons
document.querySelectorAll('.call-now-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Create a link element
        const callLink = document.createElement('a');
        callLink.href = 'tel:+917569934038';
        callLink.style.display = 'none';
        document.body.appendChild(callLink);
        
        // Trigger click on the link
        callLink.click();
        
        // Remove the link element
        document.body.removeChild(callLink);
        
        // Show notification
        showNotification('Initiating call...');
    });
});

// Callback Modal Functionality for all callback buttons
const callbackModal = document.getElementById('callback-modal');
const callbackForm = document.getElementById('callback-form');

document.querySelectorAll('.callback-btn').forEach(button => {
    button.addEventListener('click', () => {
        callbackModal.style.display = 'block';
    });
});

// Close modal when clicking the close button
document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        callbackModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === callbackModal) {
        callbackModal.style.display = 'none';
    }
});

callbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('callback-name').value;
    const phone = document.getElementById('callback-phone').value;
    const time = document.getElementById('callback-time').value;

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Set a timeout to ensure the modal closes even if there's a delay
    const timeoutId = setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Request';
        callbackModal.style.display = 'none';
        showNotification('Request submitted successfully! We will contact you soon.');
    }, 2000);
    
    try {
        const response = await fetch('https://formsubmit.co/ajax/ganeshgana630032@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                preferred_time: time,
                _subject: "New Callback Request!"
            })
        });

        const result = await response.json();
        
        if (result.success === "true") {
            clearTimeout(timeoutId);
            showNotification('Request submitted successfully! We will contact you soon.');
            callbackForm.reset();
            callbackModal.style.display = 'none';
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        clearTimeout(timeoutId);
        showNotification('Error submitting form. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Request';
    }
});

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        data._captcha = false;
        data._template = 'table';
        data._subject = 'New Contact Form Message';

        fetch('https://formsubmit.co/ajax/ganeshgana630032@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Message sent successfully! We will contact you soon.');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Error sending message. Please try again.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    });
}

// Get all More Info buttons
const moreInfoButtons = document.querySelectorAll('.more-info-btn');
const moreInfoModals = document.querySelectorAll('.more-info-modal');
const closeButtons = document.querySelectorAll('.more-info-modal .close');

// Add click event to More Info buttons
moreInfoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        const modal = document.getElementById(`more-info-modal-${productId}`);
        modal.style.display = 'block';
    });
});

// Add click event to close buttons
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    moreInfoModals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


