// File: js/contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const formStatus = document.getElementById('form-status');
    
    // Check honeypot
    const honeypot = form.querySelector('input[name="honeypot"]');
    if (honeypot && honeypot.value) {
        return; // Bot detected
    }
    
    // Validate all fields
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
    };
    
    // Update UI
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    showFormStatus('', '');
    
    try {
        // Simulate API call (replace with actual implementation)
        await simulateFormSubmission(formData);
        
        // Success
        showFormStatus('Thanks for your message! I\'ll get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        // Error
        showFormStatus('Something went wrong. Please try again or email me directly.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
    }
}

function validateForm() {
    const form = document.getElementById('contact-form');
    let isValid = true;
    
    // Validate name
    const name = form.name.value.trim();
    if (!name) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const email = form.email.value.trim();
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Invalid email format');
        isValid = false;
    }
    
    // Validate subject
    const subject = form.subject.value.trim();
    if (!subject) {
        showFieldError('subject', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    const message = form.message.value.trim();
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(fieldName);
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError(fieldName, 'Name is required');
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(fieldName, 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError(fieldName, 'Invalid email format');
            }
            break;
            
        case 'subject':
            if (!value) {
                showFieldError(fieldName, 'Subject is required');
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(fieldName, 'Message is required');
            }
            break;
    }
}

function clearError(e) {
    const fieldName = e.target.name;
    if (e.target.value.trim()) {
        clearFieldError(fieldName);
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        if (message) {
            formStatus.style.display = 'block';
        } else {
            formStatus.style.display = 'none';
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission (replace with actual implementation)
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% chance)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// Rate limiting
let lastSubmissionTime = 0;
const RATE_LIMIT_MS = 60000; // 1 minute

function isRateLimited() {
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
        return true;
    }
    lastSubmissionTime = now;
    return false;
}
