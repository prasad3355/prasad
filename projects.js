// File: js/projects.js
// Projects data
const projectsData = [
    {
        title: 'Face detection',
        description: 'A real-time face detection system built using OpenCV and Keras. Preprocesses images, detects multiple faces in frames, and classifies them using a CNN model. Optimized for accuracy and fast performance on live video streams.',
        image: 'js/images/face detection.png',

        technologies: ['Python', 'OpenCV', 'Matplotlib', 'TensorFlow', 'Keras','Flask'],
        githubUrl: 'https://github.com/prasad3355/Face-detection',
        liveUrl: '{{Face detection_LIVE_URL}}'
    },
    {
        title: 'Upcoming Project: AI-Powered Portfolio Optimization',
        description: 'An AI-driven system that optimizes stock and crypto portfolio allocation by balancing risk and return. Uses historical market data, technical indicators, and optimization models to recommend smart investment strategies.',
        image: 'js/images/projectstock.png',
        technologies: ['Python', 'TensorFlow', 'PyPortfolioOpt', 'Plotly', 'Streamlit'],
        githubUrl: '{{_GITHUB_URL}}',
        liveUrl: '{{_LIVE_URL}}'
    },
    {
        title: 'Upcoming Project: Disease Prediction System',
        description: 'An AI-powered healthcare system that predicts potential diseases by analyzing patient health records and lifestyle data. It enables early diagnosis, risk assessment, and assists doctors in making data-driven treatment decisions to improve healthcare outcomes and reduce manual effort.',
        image: 'js/images/project3.png',
        technologies: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Flask'],
        githubUrl: '{{_GITHUB_URL}}',
        liveUrl: '{{_LIVE_URL}}'
    }
];

// Function to create project card HTML
function createProjectCard(project) {
    return `
        <div class="card project-card">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title} screenshot" class="project-image" loading="lazy">
            </div>
            
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-links">
                ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} source code">
                        <i data-lucide="github"></i>
                        Code
                    </a>
                ` : ''}
                ${project.liveUrl ? `
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} live demo">
                        <i data-lucide="external-link"></i>
                        Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Load featured projects (first 3)
function loadFeaturedProjects() {
    const featuredProjectsContainer = document.getElementById('featured-projects');
    if (featuredProjectsContainer) {
        const featuredProjects = projectsData.slice(0, 3);
        featuredProjectsContainer.innerHTML = featuredProjects
            .map(project => createProjectCard(project))
            .join('');
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Load all projects
function loadAllProjects() {
    const allProjectsContainer = document.getElementById('all-projects');
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = projectsData
            .map(project => createProjectCard(project))
            .join('');
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProjects();
    loadAllProjects();
});

