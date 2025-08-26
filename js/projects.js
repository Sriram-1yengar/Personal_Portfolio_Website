/**
 * Project showcase functionality
 * Handles project filtering, modal display, and dynamic content loading
 */

class ProjectShowcase {
    constructor() {
        this.projectsGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('project-modal');
        this.modalClose = document.querySelector('.modal-close');
        
        this.currentFilter = 'all';
        this.projects = [];
        
        this.init();
    }
    
    init() {
        this.loadProjects();
        this.setupEventListeners();
        this.renderProjects();
    }
    
    loadProjects() {
        // Sample project data - replace with your actual projects
        this.projects = [
            {
                id: 1,
                title: "GenAI Powered Cost Optimization Playbook",
                description: "This ongoing project aims to deliver significant procurement savings for businesses. I have designed a Python and PostgreSQL data ingestion pipeline and am currently fine-tuning an open-source LLM to flag high-variance SKUs. The final solution will feature a linear programming optimizer and an interactive Streamlit dashboard to guide purchasing decisions.",
                category: "ai",
                techStack: ["Python", "Streamlit", "Pandas", "Plotly", "PostgreSQL"],
                image: "images/projects/ecommerce-dashboard.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/ecommerce-dashboard",
                caseStudyLink: "assets/case-studies/ecommerce-dashboard.pdf",
                features: [
                    "Real-time sales performance tracking",
                    "Customer segmentation analysis",
                    "Predictive revenue forecasting",
                    "Interactive data visualizations",
                    "Automated report generation"
                ],
                challenges: [
                    "Processing large datasets efficiently",
                    "Real-time data synchronization",
                    "Creating intuitive user interface",
                    "Implementing predictive models"
                ]
            },
            {
                id: 2,
                title: "Bidirectional Style Translation Engine",
                description: "A creative exploration into NLP, this project involves fine-tuning a lightweight, open-source LLM to perform bidirectional translations between modern, Gen Z, and Shakespearean English. I engineered a dataset of over 10,000 linguistic examples, programmatically augmented the data using the Google Gemini API to improve translation quality, and built a scalable data workflow for fine-tuning in a resource-constrained environment (Google Colab).",
                category: "automation",
                techStack: ["Python", "Google Collab", "LLM", "Fine-tuning", "NLP", "Google Gemini API"],
                image: "images/projects/web-scraping-tool.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/web-scraping-tool",
                caseStudyLink: "assets/case-studies/web-scraping-tool.pdf",
                features: [
                    "Multi-platform data extraction",
                    "Intelligent rate limiting",
                    "Data validation and cleaning",
                    "Automated scheduling system",
                    "Error handling and recovery"
                ],
                challenges: [
                    "Handling dynamic content loading",
                    "Avoiding detection mechanisms",
                    "Scaling across multiple sites",
                    "Data quality assurance"
                ]
            },
            {
                id: 3,
                title: "Computer Vision based Land Classification",
                description: "In this academic project, I applied big data techniques to a real-world environmental problem. Using Python and PySpark, I processed and analyzed satellite imagery from Radiant-MLHub (Landsat 8, Sentinel 1 & 2). I then deployed and evaluated multiple supervised machine learning models to perform multi-class land classification with an accuracy of 73.2%, gaining hands-on experience with large-scale data handling and modeling.",
                category: "ml",
                techStack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib"],
                image: "images/projects/churn-prediction.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/churn-prediction",
                caseStudyLink: "assets/case-studies/churn-prediction.pdf",
                features: [
                    "89% prediction accuracy",
                    "Feature importance analysis",
                    "Land Classification",
                    "Open source Satellite Data",
                    "Model Metrics Dashboard"
                ],
                challenges: [
                    "Handling imbalanced datasets",
                    "Feature engineering optimization",
                    "Model interpretability requirements",
                    "Production deployment considerations"
                ]
            },
            {
                id: 4,
                title: "Real-time Marketing Analytics",
                description: "Built real-time analytics platform for marketing campaigns using Apache Kafka and Elasticsearch. Provides instant insights on campaign performance and ROI tracking.",
                category: "analytics",
                techStack: ["Python", "Apache Kafka", "Elasticsearch", "Kibana", "FastAPI"],
                image: "images/projects/marketing-analytics.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/marketing-analytics",
                caseStudyLink: "assets/case-studies/marketing-analytics.pdf",
                features: [
                    "Real-time campaign tracking",
                    "ROI calculation and optimization",
                    "Multi-channel attribution",
                    "Custom dashboard creation",
                    "Alert system for anomalies"
                ],
                challenges: [
                    "High-volume data processing",
                    "Low-latency requirements",
                    "Complex attribution modeling",
                    "Scalable architecture design"
                ]
            },
            {
                id: 5,
                title: "Social Media Sentiment Analyzer",
                description: "NLP-powered sentiment analysis tool for social media monitoring. Uses transformer models to analyze brand sentiment across multiple platforms with real-time alerts.",
                category: "ml",
                techStack: ["Python", "Transformers", "BERT", "MongoDB", "React"],
                image: "images/projects/sentiment-analyzer.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/sentiment-analyzer",
                caseStudyLink: "assets/case-studies/sentiment-analyzer.pdf",
                features: [
                    "Multi-platform sentiment tracking",
                    "Real-time alert system",
                    "Trend analysis and reporting",
                    "Custom sentiment categories",
                    "API for third-party integration"
                ],
                challenges: [
                    "Handling multilingual content",
                    "Sarcasm and context detection",
                    "Real-time processing at scale",
                    "Model accuracy optimization"
                ]
            },
            {
                id: 6,
                title: "Competitive Intelligence Platform",
                description: "Automated competitive intelligence system using web scraping and data analysis. Tracks competitor pricing, product launches, and market positioning with actionable insights.",
                category: "web",
                techStack: ["Python", "Playwright", "Streamlit", "PostgreSQL", "AWS"],
                image: "images/projects/competitive-intelligence.jpg",
                demoLink: "https://demo-link.com",
                githubLink: "https://github.com/username/competitive-intelligence",
                caseStudyLink: "assets/case-studies/competitive-intelligence.pdf",
                features: [
                    "Automated competitor monitoring",
                    "Price tracking and alerts",
                    "Market trend analysis",
                    "Competitive positioning maps",
                    "Executive summary reports"
                ],
                challenges: [
                    "Data source reliability",
                    "Anti-scraping countermeasures",
                    "Data normalization across sources",
                    "Scalable monitoring system"
                ]
            }
        ];
    }
    
    setupEventListeners() {
        // Filter button events
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilterClick(e));
        });
        
        // Modal events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }
    
    handleFilterClick(e) {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update current filter and re-render
        this.currentFilter = filter;
        this.renderProjects();
    }
    
    renderProjects() {
        if (!this.projectsGrid) return;
        
        // Clear existing projects
        this.projectsGrid.innerHTML = '';
        
        // Filter projects
        const filteredProjects = this.currentFilter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.category === this.currentFilter);
        
        // Render filtered projects
        filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            this.projectsGrid.appendChild(projectCard);
        });
        
        // Add stagger animation
        this.addStaggerAnimation();
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="project-placeholder" style="display: none;">
                    <span>Project Screenshot</span>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener">
                        Live Demo
                    </a>
                    <a href="${project.githubLink}" class="project-link" target="_blank" rel="noopener">
                        GitHub
                    </a>
                    <button class="project-link view-details-btn" data-project-id="${project.id}">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        // Add click event for modal
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', () => this.openModal(project));
        
        // Add click event for entire card
        card.addEventListener('click', (e) => {
            if (!e.target.matches('a, button')) {
                this.openModal(project);
            }
        });
        
        return card;
    }
    
    openModal(project) {
        if (!this.modal) return;
        
        // Populate modal content
        this.populateModal(project);
        
        // Show modal
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.focus();
    }
    
    populateModal(project) {
        const modalTitle = document.getElementById('modal-title');
        const modalTechStack = document.getElementById('modal-tech-stack');
        const modalImage = document.getElementById('modal-image');
        const modalDescription = document.getElementById('modal-description');
        const modalFeatures = document.getElementById('modal-features');
        const modalChallenges = document.getElementById('modal-challenges');
        const modalDemoLink = document.getElementById('modal-demo-link');
        const modalGithubLink = document.getElementById('modal-github-link');
        const modalCaseStudyLink = document.getElementById('modal-case-study-link');
        
        if (modalTitle) modalTitle.textContent = project.title;
        
        if (modalTechStack) {
            modalTechStack.innerHTML = project.techStack
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');
        }
        
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalImage.onerror = function() {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'modal-image-placeholder';
                placeholder.innerHTML = '<span>Project Screenshot</span>';
                this.parentNode.appendChild(placeholder);
            };
        }
        
        if (modalDescription) modalDescription.textContent = project.description;
        
        if (modalFeatures) {
            modalFeatures.innerHTML = project.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
        }
        
        if (modalChallenges) {
            modalChallenges.innerHTML = project.challenges
                .map(challenge => `<li>${challenge}</li>`)
                .join('');
        }
        
        if (modalDemoLink) {
            modalDemoLink.href = project.demoLink;
            modalDemoLink.style.display = project.demoLink ? 'inline-flex' : 'none';
        }
        
        if (modalGithubLink) {
            modalGithubLink.href = project.githubLink;
            modalGithubLink.style.display = project.githubLink ? 'inline-flex' : 'none';
        }
        
        if (modalCaseStudyLink) {
            modalCaseStudyLink.href = project.caseStudyLink;
            modalCaseStudyLink.style.display = project.caseStudyLink ? 'inline-flex' : 'none';
        }
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Return focus to the trigger element if possible
        const activeElement = document.activeElement;
        if (activeElement && activeElement.matches('.view-details-btn')) {
            activeElement.focus();
        }
    }
    
    addStaggerAnimation() {
        const projectCards = this.projectsGrid.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Method to add new project (for dynamic content)
    addProject(project) {
        this.projects.push(project);
        this.renderProjects();
    }
    
    // Method to update project (for dynamic content)
    updateProject(id, updatedProject) {
        const index = this.projects.findIndex(project => project.id === id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updatedProject };
            this.renderProjects();
        }
    }
    
    // Method to remove project (for dynamic content)
    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        this.renderProjects();
    }
    
    // Method to get project by ID
    getProject(id) {
        return this.projects.find(project => project.id === id);
    }
    
    // Method to get projects by category
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
}

/**
 * Project Image Lazy Loading
 */
class ProjectImageLazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver(
                (entries) => this.handleImageIntersection(entries),
                {
                    root: null,
                    rootMargin: '50px',
                    threshold: 0.1
                }
            );
            
            this.observeImages();
        }
    }
    
    observeImages() {
        const images = document.querySelectorAll('.project-image img[data-src]');
        images.forEach(img => this.imageObserver.observe(img));
    }
    
    handleImageIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                this.imageObserver.unobserve(img);
            }
        });
    }
}

/**
 * Project Search Functionality
 */
class ProjectSearch {
    constructor(projectShowcase) {
        this.projectShowcase = projectShowcase;
        this.searchInput = null;
        this.init();
    }
    
    init() {
        this.createSearchInput();
        this.setupEventListeners();
    }
    
    createSearchInput() {
        const projectFilters = document.querySelector('.project-filters');
        if (!projectFilters) return;
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'project-search';
        searchContainer.innerHTML = `
            <input 
                type="text" 
                placeholder="Search projects..." 
                class="search-input"
                aria-label="Search projects"
            >
        `;
        
        projectFilters.appendChild(searchContainer);
        this.searchInput = searchContainer.querySelector('.search-input');
    }
    
    setupEventListeners() {
        if (!this.searchInput) return;
        
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }
    
    performSearch(query) {
        const projectCards = document.querySelectorAll('.project-card');
        const normalizedQuery = query.toLowerCase().trim();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const techTags = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const isMatch = !normalizedQuery || 
                           title.includes(normalizedQuery) ||
                           description.includes(normalizedQuery) ||
                           techTags.some(tech => tech.includes(normalizedQuery));
            
            card.style.display = isMatch ? 'block' : 'none';
        });
    }
}

// Initialize project showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectShowcase = new ProjectShowcase();
    new ProjectImageLazyLoader();
    new ProjectSearch(projectShowcase);
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectShowcase, ProjectImageLazyLoader, ProjectSearch };
}
