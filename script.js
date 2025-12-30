// Intersection Observer for Scroll Animations
const observeElements = () => {
    const elements = document.querySelectorAll('.animate-fade-in-left, .animate-fade-in-right, .dash-card, .arc-card, .tech-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
};

// Simulated Dynamic Data Updates for Dashboard
const simulateLiveMetrics = () => {
    const vitals = {
        hr: document.querySelector('.vital-item:nth-child(1) .value'),
        cal: document.querySelector('.vital-item:nth-child(2) .value'),
    };

    const bars = document.querySelectorAll('.progress-bar .fill');

    if (!vitals.hr) return; // Guard clause

    setInterval(() => {
        // Human Heart Rate Variation Simulation
        const currentHR = parseInt(vitals.hr.innerText);
        const newHR = currentHR + Math.floor(Math.random() * 5) - 2;
        vitals.hr.innerHTML = `${newHR > 60 && newHR < 180 ? newHR : 120} <span class="unit">bpm</span>`;

        // Slight bar movement for "Live" feel
        bars.forEach(bar => {
            const currentWidth = parseFloat(bar.style.width);
            const newWidth = currentWidth + (Math.random() * 4 - 2);
            if (newWidth > 10 && newWidth < 100) {
                bar.style.width = `${newWidth}%`;
            }
        });

    }, 2000);
};

// Glitch Text Effect Initialization
const initGlitchText = () => {
    const glitchElement = document.querySelector('.glitch-text');
    if (glitchElement) {
        // Advanced glitch logic can be added here if CSS-only isn't enough
        // Currently handled by CSS animation in style.css (need to add keyframes)
    }
};

// Theme Toggle Logic
const toggleTheme = () => {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    const icon = btn.querySelector('i');
    const isDark = body.getAttribute('data-theme') !== 'light';

    if (isDark) {
        body.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    simulateLiveMetrics();

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Video Custom Controls
    const soundToggles = document.querySelectorAll('.sound-toggle');
    soundToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-target');
            const video = document.getElementById(videoId);
            if (video) {
                video.muted = !video.muted;
                const icon = btn.querySelector('i');
                if (video.muted) {
                    icon.classList.remove('fa-volume-up');
                    icon.classList.add('fa-volume-mute');
                } else {
                    icon.classList.remove('fa-volume-mute');
                    icon.classList.add('fa-volume-up');
                }
            }
        });
    });

    const missionPlayBtn = document.getElementById('mission-play-btn');
    if (missionPlayBtn) {
        missionPlayBtn.addEventListener('click', () => {
            const video = document.getElementById('mission-video-player');
            const overlay = document.querySelector('.video-overlay-controls');
            if (video.paused) {
                video.play();
                overlay.classList.add('playing');
                // Auto unmute on explicit play interaction if desired
                video.muted = false;
                const btn = document.querySelector('[data-target="mission-video-player"] i');
                if (btn) {
                    btn.classList.remove('fa-volume-mute');
                    btn.classList.add('fa-volume-up');
                }
            } else {
                video.pause();
                overlay.classList.remove('playing');
            }
        });
    }
});

// Add dynamic CSS classes for animations via JS if needed
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) !important;
    }
    .animate-fade-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s ease-out;
    }
    .animate-fade-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s ease-out;
    }
`;
document.head.appendChild(styleSheet);
