// User progress tracking
let userProgress = {
    xp: 0,
    streak: 0,
    completedLessons: [],
    dailyGoal: 3,
    todayCompleted: 0
};

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('quicklearnProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateUI();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('quicklearnProgress', JSON.stringify(userProgress));
}

// Update UI with current progress
function updateUI() {
    const streakElements = document.querySelectorAll('.streak-number');
    const xpElements = document.querySelectorAll('.xp-number');
    
    streakElements.forEach(el => el.textContent = userProgress.streak);
    xpElements.forEach(el => el.textContent = `${userProgress.xp} XP`);
    
    // Update progress bar if on modules page
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.querySelector('.progress-percent');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressPercent && progressText) {
        const percent = Math.min((userProgress.todayCompleted / userProgress.dailyGoal) * 100, 100);
        progressFill.style.width = `${percent}%`;
        progressPercent.textContent = `${Math.round(percent)}%`;
        progressText.textContent = `${userProgress.todayCompleted}/${userProgress.dailyGoal} lessons completed today`;
    }
}

// Module content data - EMPTY (no lessons yet)
const moduleContent = {};

// Quiz questions - EMPTY (no quizzes yet)
const quizzes = {};

// Open module modal - DISABLED (no content to show)
function openModule(moduleName) {
    console.log('Module clicked:', moduleName, '- No content available yet');
    // Don't open modal since there's no content
    return;
}

// Generate quiz HTML - DISABLED
function generateQuiz(moduleName) {
    return '';
}

// Check quiz answer - DISABLED
function checkAnswer(questionIndex, selectedOption, correctOption) {
    console.log('Quiz disabled - no content yet');
}

// Close module modal
function closeModule() {
    const modal = document.getElementById('moduleModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Complete lesson and award XP - DISABLED
function completeLesson() {
    console.log('Complete lesson disabled - no content yet');
}

// Show celebration modal
function showCelebration() {
    const celebrationModal = document.getElementById('celebrationModal');
    if (celebrationModal) {
        celebrationModal.style.display = 'block';
    }
}

// Close celebration modal
function closeCelebration() {
    const celebrationModal = document.getElementById('celebrationModal');
    if (celebrationModal) {
        celebrationModal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('moduleModal');
    const celebrationModal = document.getElementById('celebrationModal');
    
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === celebrationModal) {
        celebrationModal.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Scroll animations disabled - content shows immediately
    // Elements are visible by default for better initial loading
});
