document.addEventListener('DOMContentLoaded', () => {
    
    // --- SKILLS DATA & RENDERING ---
    const skillsData = [
        // Backend
        { name: "Java 11 / 17", category: "backend" },
        { name: "Spring Boot", category: "backend" },
        { name: "Spring MVC", category: "backend" },
        { name: "Spring Security", category: "backend" },
        { name: "Hibernate / JPA", category: "backend" },
        { name: "RESTful APIs", category: "backend" },
        { name: "Microservices", category: "backend" },
        { name: "SOAP & GraphQL", category: "backend" },
        { name: "Spring Cloud Gateway", category: "backend" },
        { name: "Service Discovery (Eureka)", category: "backend" },
        
        // Frontend
        { name: "React.js", category: "frontend" },
        { name: "Angular 16 / 17", category: "frontend" },
        { name: "TypeScript", category: "frontend" },
        { name: "JavaScript (ES6+)", category: "frontend" },
        { name: "HTML5 & CSS3", category: "frontend" },
        { name: "Redux", category: "frontend" },
        { name: "Context API", category: "frontend" },
        { name: "RxJS", category: "frontend" },
        { name: "Material UI", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "Bootstrap", category: "frontend" },
        
        // Databases & Caching
        { name: "PostgreSQL", category: "database" },
        { name: "MySQL", category: "database" },
        { name: "Oracle SQL / PLSQL", category: "database" },
        { name: "MongoDB", category: "database" },
        { name: "Cassandra", category: "database" },
        { name: "DynamoDB", category: "database" },
        { name: "Redis Cache", category: "database" },
        { name: "EhCache", category: "database" },
        { name: "Hazelcast", category: "database" },
        { name: "DB2", category: "database" },
        
        // DevOps, Cloud & Tools
        { name: "AWS (EC2, S3, RDS, Cognito)", category: "devops" },
        { name: "Docker", category: "devops" },
        { name: "Kubernetes", category: "devops" },
        { name: "Jenkins CI/CD", category: "devops" },
        { name: "GitHub Actions", category: "devops" },
        { name: "Git & GitHub", category: "devops" },
        { name: "Maven & Gradle", category: "devops" },
        { name: "Prometheus & Grafana", category: "devops" },
        { name: "ELK Stack", category: "devops" },
        { name: "Resilience4j", category: "devops" }
    ];

    const skillsGrid = document.getElementById('skills-display-grid');
    
    // Group skills by category for visual cards
    const categories = {
        backend: { title: "Backend Core", dotClass: "backend" },
        frontend: { title: "Frontend UI/UX", dotClass: "frontend" },
        database: { title: "Databases & Caching", dotClass: "database" },
        devops: { title: "DevOps & Cloud", dotClass: "devops" }
    };

    function renderSkills(filterCategory = 'all') {
        skillsGrid.innerHTML = '';
        
        // Group skills that match the filter
        const grouped = {};
        skillsData.forEach(skill => {
            if (filterCategory === 'all' || skill.category === filterCategory) {
                if (!grouped[skill.category]) {
                    grouped[skill.category] = [];
                }
                grouped[skill.category].push(skill.name);
            }
        });

        // Generate cards for each group
        Object.keys(grouped).forEach(catKey => {
            const catInfo = categories[catKey];
            const skillTagsHTML = grouped[catKey]
                .map(name => `<span class="skill-tag">${name}</span>`)
                .join('');

            const cardHTML = `
                <div class="glass-panel skill-category-card reveal active">
                    <div class="skill-card-header">
                        <div class="skill-dot ${catInfo.dotClass}"></div>
                        <h3>${catInfo.title}</h3>
                    </div>
                    <div class="skill-tags">
                        ${skillTagsHTML}
                    </div>
                </div>
            `;
            skillsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Initialize rendering
    renderSkills();

    // Skills Tab Filter Click Handler
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-tab');
            renderSkills(category);
        });
    });

    // --- ACCORDION DETAILS TOGGLE ---
    const accordionTriggers = document.querySelectorAll('.timeline-accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const timelineItem = trigger.closest('.timeline-item');
            const details = timelineItem.querySelector('.timeline-details');
            const chevron = trigger.querySelector('.icon-chevron');
            
            timelineItem.classList.toggle('expanded');
            
            if (timelineItem.classList.contains('expanded')) {
                details.style.maxHeight = details.scrollHeight + "px";
                trigger.innerHTML = `Hide Detailed Responsibilities <span class="material-symbols-outlined icon-chevron" style="transform: rotate(180deg)">expand_more</span>`;
                timelineItem.classList.add('active');
            } else {
                details.style.maxHeight = null;
                trigger.innerHTML = `Show Detailed Responsibilities <span class="material-symbols-outlined icon-chevron">expand_more</span>`;
            }
        });
    });

    // --- DARK / LIGHT THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
    } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- MOBILE MENU NAVIGATION ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        if (navMenu.classList.contains('mobile-active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    });

    // Close mobile menu on nav link click
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            const icon = menuToggle.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = 'menu';
        });
    });

    // --- ACTIVE NAVIGATION LINK ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
