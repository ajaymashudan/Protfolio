// Custom Cursor & Trail
const cursor = document.querySelector('.custom-cursor');
const trail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.18;
  trailY += (mouseY - trailY) * 0.18;
  trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor Interactive Effects
const interactiveEls = document.querySelectorAll('a, button, .project-card');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    if (el.classList.contains('project-card') || el.classList.contains('btn')) {
      cursor.classList.add('magnetic');
    }
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active', 'magnetic');
  });
});

// Section Reveal on Scroll
const sections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
sections.forEach(section => revealObserver.observe(section));

// Parallax Effect for Hero Background
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.18}px)`;
  }
});

// Typewriter Effect (for .typewriter span)
function typewriterEffect() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }
  type();
}
window.addEventListener('DOMContentLoaded', typewriterEffect);

// Skill Bar Animation
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.classList.add('filled');
    bar.style.setProperty('--bar-width', `${level}%`);
    bar.querySelector('span').style.zIndex = 2;
    bar.querySelector('span').style.position = 'relative';
    bar.querySelector('span').style.left = '0.5rem';
    bar.querySelector('span').style.color = '#fff';
  });
}
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(skillsSection);
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Smooth Scroll for Nav Links
const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact Form Feedback (frontend only)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    alert('Thank you for reaching out! I will get back to you soon.');
  });
}

// Background Animation (Particles/Shapes)
// (Optional: For advanced, can add canvas/particles.js or SVG shapes here) 