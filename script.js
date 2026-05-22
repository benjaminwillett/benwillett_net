const data = window.siteData;

const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node) {
        node.textContent = value;
    }
};

const setLink = (id, config) => {
    const node = document.getElementById(id);
    if (!node || !config) {
        return;
    }
    node.textContent = config.label;
    node.setAttribute("href", config.href);
};

const setImage = (id, config) => {
    const node = document.getElementById(id);
    if (!node || !config || !config.image) {
        return;
    }
    node.setAttribute("src", config.image);
    node.setAttribute("alt", config.imageAlt || "");
};

const renderSignals = () => {
    const list = document.getElementById("hero-signals");
    if (!list) {
        return;
    }
    list.innerHTML = data.hero.signals
        .map((item) => `<li>${item}</li>`)
        .join("");
};

const renderStats = () => {
    const grid = document.getElementById("stats-grid");
    if (!grid) {
        return;
    }
    grid.innerHTML = data.stats
        .map(
            (item) => `
                <article class="stat-card">
                    <strong>${item.value}</strong>
                    <span>${item.label}</span>
                </article>
            `
        )
        .join("");
};

const renderHeroVentures = () => {
    const container = document.getElementById("hero-ventures");
    if (!container) {
        return;
    }
    container.innerHTML = data.ventures
        .slice(0, 6)
        .map(
            (venture) => `
                <a class="venture-tile venture-tile-${venture.accent}" href="${venture.url}" target="_blank" rel="noreferrer">
                    <img class="venture-tile-image" src="${venture.image}" alt="${venture.name} preview artwork">
                    <span>${venture.name}</span>
                    <small>${venture.url.replace("https://", "")}</small>
                </a>
            `
        )
        .join("");
};

const renderTimeline = () => {
    const timeline = document.getElementById("timeline");
    if (!timeline) {
        return;
    }
    timeline.innerHTML = data.timeline
        .map(
            (item) => `
                <article class="timeline-item">
                    <span class="timeline-period">${item.period}</span>
                    <h3>${item.title}</h3>
                    <p>${item.detail}</p>
                </article>
            `
        )
        .join("");
};

const renderVentures = () => {
    const grid = document.getElementById("ventures-grid");
    if (!grid) {
        return;
    }
    grid.innerHTML = data.ventures
        .map(
            (venture) => `
                <article class="content-card venture-card venture-card-${venture.accent}">
                    <img class="venture-card-image" src="${venture.image}" alt="${venture.name} feature artwork">
                    <div>
                        <p class="card-label">${venture.name}</p>
                        <h3>${venture.description}</h3>
                        <p>${venture.tone}</p>
                    </div>
                    <a class="inline-link" href="${venture.url}" target="_blank" rel="noreferrer">Visit site</a>
                </article>
            `
        )
        .join("");
};

const renderProjects = () => {
    const grid = document.getElementById("projects-grid");
    if (!grid) {
        return;
    }
    grid.innerHTML = data.projects
        .map(
            (project) => `
                <article class="content-card project-card">
                    <p class="card-label">Selected Work</p>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tag-row">
                        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
                    </div>
                </article>
            `
        )
        .join("");
};

const renderSkills = () => {
    const list = document.getElementById("skills-list");
    if (!list) {
        return;
    }
    list.innerHTML = data.skills
        .map(
            (skill) => `
                <article class="skill-row">
                    <div class="skill-copy">
                        <strong>${skill.name}</strong>
                        <span>${skill.level}</span>
                    </div>
                    <div class="skill-bar">
                        <span style="width: ${skill.level};"></span>
                    </div>
                </article>
            `
        )
        .join("");
};

const renderPrinciples = () => {
    const list = document.getElementById("principles-list");
    if (!list) {
        return;
    }
    list.innerHTML = data.principles.map((item) => `<li>${item}</li>`).join("");
};

const renderContacts = () => {
    const list = document.getElementById("contact-list");
    if (!list) {
        return;
    }
    list.innerHTML = data.contact.items
        .filter((item) => item.value)
        .map((item) => {
            if (item.href) {
                return `<a class="contact-item" href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}><span>${item.label}</span><strong>${item.value}</strong></a>`;
            }
            return `<div class="contact-item"><span>${item.label}</span><strong>${item.value}</strong></div>`;
        })
        .join("");
};

const configureContactForm = () => {
    const form = document.getElementById("contact-form");
    const note = document.getElementById("contact-form-note");
    const submit = document.getElementById("contact-submit");
    if (!form || !note || !submit) {
        return;
    }
    if (data.contact.formEmail) {
        form.setAttribute("action", `mailto:${data.contact.formEmail}`);
        note.textContent = `Messages will open in your default mail client to ${data.contact.formEmail}.`;
        submit.removeAttribute("disabled");
        return;
    }
    form.setAttribute("action", "#contact");
    note.textContent = "Set contact.formEmail in site-data.js to enable the contact form.";
    submit.setAttribute("disabled", "disabled");
};

const bindMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) {
        return;
    }
    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-open");
        });
    });
};

const bindScrollSpy = () => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const links = [...document.querySelectorAll(".site-nav a[href^='#']")];
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                const id = entry.target.getAttribute("id");
                links.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
                });
            });
        },
        { threshold: 0.4 }
    );
    sections.forEach((section) => observer.observe(section));
};

const bindReveal = () => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );
    nodes.forEach((node) => observer.observe(node));
};

const hydrate = () => {
    setText("brand-name", data.brand.name);
    setText("brand-tagline", data.brand.tagline);
    setText("hero-eyebrow", data.hero.eyebrow);
    setText("hero-micro-tag", data.hero.microTag);
    setText("hero-heading", data.hero.heading);
    setText("hero-description", data.hero.description);
    setText("hero-visual-kicker", data.hero.visual.kicker);
    setText("hero-visual-heading", data.hero.visual.heading);
    setText("hero-visual-description", data.hero.visual.description);
    setText("about-heading", data.about.heading);
    setText("about-body", data.about.body);
    setText("about-quote", data.about.quote);
    setText("ventures-heading", data.venturesHeading);
    setText("projects-heading", data.projectsHeading);
    setText("contact-heading", data.contact.heading);
    setText("contact-copy", data.contact.copy);
    setText("footer-copy", data.footer);
    setLink("hero-primary-cta", data.hero.primaryCta);
    setLink("hero-secondary-cta", data.hero.secondaryCta);
    setImage("hero-portrait", data.hero.visual);
    renderSignals();
    renderStats();
    renderHeroVentures();
    renderTimeline();
    renderVentures();
    renderProjects();
    renderSkills();
    renderPrinciples();
    renderContacts();
    configureContactForm();
    bindMenu();
    bindScrollSpy();
    bindReveal();
};

hydrate();