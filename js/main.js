/**
 * Keeps navigation, filters, animations, and the contact form isolated by section.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const navigationHeader = document.querySelector('nav');
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

    const revealPortfolio = () => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';  
            loadingScreen.style.visibility = 'hidden';
        }

        if (mainContent) {
            mainContent.style.opacity = '1';
        }
    };

    window.addEventListener('load', () => window.setTimeout(revealPortfolio, 650));
    window.setTimeout(revealPortfolio, 1800);

    mobileMenuButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu?.classList.add('hidden');
        });
    });

    const updateNavigation = () => {
        if (navigationHeader) {
            const hasScrolled = window.scrollY > 50;
            navigationHeader.classList.toggle('bg-primary/95', hasScrolled);
            navigationHeader.classList.toggle('bg-primary/80', !hasScrolled);
        }

        const sections = ['hero', 'skills', 'projects', 'achievements', 'contact']
            .map(id => document.getElementById(id))
            .filter(Boolean);
        const marker = window.scrollY + 140;
        let currentSection = sections[0]?.id;

        sections.forEach(section => {
            if (section.offsetTop <= marker) currentSection = section.id;
        });

        navigationLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    };

    window.addEventListener('scroll', updateNavigation, { passive: true });
    updateNavigation();

    // Present skills in the same compact expandable tree as projects.
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        const categories = [
            { id: 'programming', label: 'Programming Languages', icon: '💻' },
            { id: 'web', label: 'Web Technologies', icon: '🌐' },
            { id: 'database', label: 'Databases', icon: '🗄️' },
            { id: 'tools', label: 'Developer Tools', icon: '🛠️' },
            { id: 'sap', label: 'SAP / ERP', icon: '⚙️' }
        ];
        const skillCards = Array.from(skillsGrid.querySelectorAll('.skill-card'))
            .filter(card => card.dataset.category !== 'languages');

        skillsGrid.className = 'projects-tree skills-tree mb-16';
        skillsGrid.replaceChildren();

        const root = document.createElement('div');
        root.className = 'projects-tree-root';
        root.innerHTML = `
            <span class="projects-tree-root-icon" aria-hidden="true">&lt;/&gt;</span>
            <span>Skills</span>`;
        skillsGrid.appendChild(root);

        const branches = document.createElement('div');
        branches.className = 'projects-tree-branches';
        skillsGrid.appendChild(branches);

        categories.forEach(category => {
            const categoryCards = skillCards.filter(card => card.dataset.category === category.id);
            if (!categoryCards.length) return;

            const branch = document.createElement('section');
            branch.className = 'projects-tree-branch project-category';

            const trigger = document.createElement('button');
            const contentId = `skills-${category.id}`;
            trigger.type = 'button';
            trigger.className = 'skill-category-trigger';
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-controls', contentId);
            trigger.innerHTML = `
                <span class="skill-category-title">
                    <span class="skill-category-icon" aria-hidden="true">${category.icon}</span>
                    <span>${category.label}</span>
                </span>`;

            const content = document.createElement('div');
            content.id = contentId;
            content.className = 'project-tree-leaves project-category-content skills-tree-leaves';

            categoryCards.forEach(card => {
                const skillName = card.querySelector('h3')?.textContent?.trim();
                if (!skillName) return;

                const skillNode = document.createElement('div');
                skillNode.className = 'project-tree-node';
                skillNode.innerHTML = `
                    <div class="project-tree-project">
                        <button type="button" class="project-tree-project-trigger" aria-label="View ${skillName}">
                            <span class="project-tree-project-dot" aria-hidden="true"></span>
                            <span>${skillName}</span>
                        </button>
                    </div>`;
                content.appendChild(skillNode);
            });

            trigger.addEventListener('click', () => {
                const willOpen = !branch.classList.contains('is-open');
                skillsGrid.querySelectorAll('.project-category.is-open').forEach(openPanel => {
                    openPanel.classList.remove('is-open');
                    openPanel.querySelector('.skill-category-trigger')?.setAttribute('aria-expanded', 'false');
                });
                branch.classList.toggle('is-open', willOpen);
                trigger.setAttribute('aria-expanded', String(willOpen));
            });

            branch.addEventListener('keydown', event => {
                if (event.key !== 'Escape') return;
                branch.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            });

            branch.append(trigger, content);
            branches.appendChild(branch);
        });
    }

    // Organize projects as a visual tree: Projects -> category -> project.
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = document.querySelectorAll('#projects .project-card');
    if (projectsGrid) {
        const projectCategories = [
            { id: 'fullstack', label: 'Full Stack Projects', icon: '🚀' },
            { id: 'algorithms', label: 'Algorithms & Problem Solving', icon: '🧠' },
            { id: 'collaborative', label: 'Collaborative Projects', icon: '🤝' }
        ];
        const cards = Array.from(projectCards);

        projectsGrid.className = 'projects-tree mb-16';
        projectsGrid.replaceChildren();

        const root = document.createElement('div');
        root.className = 'projects-tree-root';
        root.innerHTML = `
            <span class="projects-tree-root-icon" aria-hidden="true">&lt;/&gt;</span>
            <span>Projects</span>`;
        projectsGrid.appendChild(root);

        const branches = document.createElement('div');
        branches.className = 'projects-tree-branches';
        projectsGrid.appendChild(branches);

        projectCategories.forEach(category => {
            const categoryCards = cards.filter(card => card.dataset.category === category.id);
            if (!categoryCards.length) return;

            const branch = document.createElement('section');
            branch.className = 'projects-tree-branch project-category';

            const trigger = document.createElement('button');
            const contentId = `projects-${category.id}`;
            trigger.type = 'button';
            trigger.className = 'skill-category-trigger';
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-controls', contentId);
            trigger.innerHTML = `
                <span class="skill-category-title">
                    <span class="skill-category-icon" aria-hidden="true">${category.icon}</span>
                    <span>${category.label}</span>
                </span>`;

            const content = document.createElement('div');
            content.id = contentId;
            content.className = 'project-tree-leaves project-category-content';
            categoryCards.forEach(card => {
                const projectNode = document.createElement('div');
                projectNode.className = 'project-tree-node';

                const projectName = card.querySelector('h3')?.textContent?.trim() || 'View project';
                const projectRow = document.createElement('div');
                projectRow.className = 'project-tree-project';

                const projectTrigger = document.createElement('button');
                projectTrigger.type = 'button';
                projectTrigger.className = 'project-tree-project-trigger';
                projectTrigger.setAttribute('aria-label', `Preview ${projectName}`);
                projectTrigger.setAttribute('aria-expanded', 'false');
                projectTrigger.innerHTML = `
                    <span class="project-tree-project-dot" aria-hidden="true"></span>
                    <span>${projectName}</span>`;

                projectRow.appendChild(projectTrigger);

                const repositoryHref = card.querySelector('a[href*="github.com"]')?.getAttribute('href');
                if (repositoryHref) {
                    const repositoryLink = document.createElement('a');
                    repositoryLink.className = 'project-tree-github-link';
                    repositoryLink.href = repositoryHref;
                    repositoryLink.target = '_blank';
                    repositoryLink.rel = 'noopener noreferrer';
                    repositoryLink.setAttribute('aria-label', `Open ${projectName} repository on GitHub`);
                    repositoryLink.innerHTML = `
                        <span>GitHub</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.23.68-.5v-1.77c-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1.01.08 1.54 1.07 1.54 1.07.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0112 8.17c.85 0 1.7.12 2.5.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.95.68 1.92v1.44c0 .27.18.6.69.5A10.23 10.23 0 0022 12.22C22 6.58 17.52 2 12 2z" />
                        </svg>`;
                    projectRow.appendChild(repositoryLink);
                }

                const preview = document.createElement('div');
                preview.className = 'project-tree-preview';
                preview.appendChild(card);

                projectTrigger.addEventListener('click', () => {
                    const isOpen = projectNode.classList.contains('is-preview-open');
                    content.querySelectorAll('.project-tree-node.is-preview-open').forEach(openNode => {
                        openNode.classList.remove('is-preview-open');
                        openNode.querySelector('.project-tree-project-trigger')?.setAttribute('aria-expanded', 'false');
                    });
                    projectNode.classList.toggle('is-preview-open', !isOpen);
                    projectTrigger.setAttribute('aria-expanded', String(!isOpen));
                });

                projectNode.append(projectRow, preview);
                content.appendChild(projectNode);
            });

            trigger.addEventListener('click', () => {
                const willOpen = !branch.classList.contains('is-open');
                projectsGrid.querySelectorAll('.project-category.is-open').forEach(openPanel => {
                    openPanel.classList.remove('is-open');
                    openPanel.querySelector('.skill-category-trigger')?.setAttribute('aria-expanded', 'false');
                });
                branch.classList.toggle('is-open', willOpen);
                trigger.setAttribute('aria-expanded', String(willOpen));
            });

            branch.addEventListener('keydown', event => {
                if (event.key !== 'Escape') return;
                branch.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            });

            branch.append(trigger, content);
            branches.appendChild(branch);
        });
    }

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.style.transition = 'all 0.6s ease-out';
            } else {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            }

            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('#skills .skill-card, #projects .project-card, .timeline-item')
        .forEach((item, index) => {
            if (item.classList.contains('timeline-item')) {
                item.style.transitionDelay = `${index * 0.05}s`;
            }
            revealObserver.observe(item);
        });

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name || !data.email || !data.message) {
            window.alert('Please fill in all required fields.');
            return;
        }

        if (!emailPattern.test(data.email)) {
            window.alert('Please enter a valid email address.');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            if (!window.emailjs) throw new Error('The email service could not be loaded.');

            await window.emailjs.sendForm(
                'service_5ad2acg',
                'template_qqhofs1',
                contactForm,
                'PrtNx4nYQl_hu7ww3'
            );

            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            window.alert("Thank you for your message! I'll get back to you within 24 hours.");
        } catch (error) {
            console.error('Contact form submission failed:', error);
            window.alert('The message could not be sent. Please email me directly at work.vamsidhar76@gmail.com.');
        } finally {
            window.setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
            }, 2500);
        }
    });

    document.querySelectorAll('#contact input, #contact select, #contact textarea').forEach(input => {
        input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
        input.addEventListener('blur', () => input.parentElement?.classList.remove('focused'));

        if (input.type === 'email') {
            input.addEventListener('input', () => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                input.classList.toggle('border-error', Boolean(input.value) && !isValid);
                input.classList.toggle('border-success', Boolean(input.value) && isValid);
            });
        }
    });
});
