document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  const updateScrollState = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    const current = sections.reduce((active, section) => {
      return section.getBoundingClientRect().top <= 150 ? section.id : active;
    }, 'home');
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  document.querySelectorAll('.tech-icon img').forEach(image => image.loading = 'lazy');

  const projectsToggle = document.getElementById('projects-toggle');
  const hiddenProjects = [...document.querySelectorAll('.project-card-hidden')];
  projectsToggle?.addEventListener('click', () => {
    hiddenProjects.forEach(project => {
      project.hidden = false;
    });
    projectsToggle.hidden = true;
  });

  const command = document.querySelector('.typed-command');
  if (command) {
    const text = command.dataset.text || '';
    let index = 0;
    const type = () => {
      command.textContent = text.slice(0, index++);
      if (index <= text.length) window.setTimeout(type, 95);
    };
    window.setTimeout(type, 500);
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!status) return;
    status.textContent = 'Sending message...';
    const formData = new FormData(form);
    formData.set('_subject', `Portfolio message from ${formData.get('name') || 'website visitor'}`);
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');
    try {
      const response = await fetch('https://formsubmit.co/ajax/work.vamsidhar76@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || 'Message delivery failed.');
      form.reset();
      status.textContent = 'Message sent. Thanks for reaching out.';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Message delivery failed. Please email me directly.';
    }
  });
});
