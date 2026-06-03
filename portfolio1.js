// Mobile Menu Toggle
const menu = document.querySelector("#menu");
const nav = document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            nav.classList.remove('active');
            menu.classList.remove('bx-x');
        }
    });
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:smritigupta158@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    showNotification('Opening your email app...', 'info');
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Poppins';
        font-size: 14px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15,15,15,0.95)';
    } else {
        nav.style.background = 'rgba(15,15,15,0.8)';
    }
});

// Highlight active nav link on scroll
const sectionIds = ['home','about','skills','services','contact'];
const navLinks = Array.from(document.querySelectorAll('nav .links a'));

function setActiveLink() {
    let currentId = 'home';
    const offset = 120; // offset for fixed nav height
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
            currentId = id;
        }
    });
    navLinks.forEach(a => {
        if (a.getAttribute('href') === `#${currentId}`) {
            a.style.opacity = '1';
        } else {
            a.style.opacity = '0.7';
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Add animation to skills on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skills elements
document.querySelectorAll('.skills ul li').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(skill);
});

// Buttons: Hire Me / Contact Me (scroll and focus form)
function goToContact() {
    const target = document.querySelector('#contact');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
        const nameInput = document.getElementById('firstName');
        if (nameInput) nameInput.focus();
    }, 600);
}

const hireBtn = document.getElementById('hireMeBtn');
const contactBtn = document.getElementById('contactMeBtn');
const contactNavBtn = document.getElementById('contactMeNav');

if (hireBtn) hireBtn.addEventListener('click', goToContact);
if (contactBtn) contactBtn.addEventListener('click', goToContact);
if (contactNavBtn) contactNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    goToContact();
});
