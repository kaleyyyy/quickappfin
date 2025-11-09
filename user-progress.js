// Cookie Management Utility
const CookieManager = {
    // Set a cookie with name, value, and expiration days
    setCookie: function(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/;SameSite=Lax";
    },
    
    // Get a cookie by name
    getCookie: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                try {
                    return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    },
    
    // Delete a cookie
    deleteCookie: function(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    
    // Check if cookies are enabled
    areCookiesEnabled: function() {
        try {
            document.cookie = "cookietest=1";
            const cookiesEnabled = document.cookie.indexOf("cookietest=") !== -1;
            document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
            return cookiesEnabled;
        } catch (e) {
            return false;
        }
    }
};

// User Progress Manager - handles both cookies and localStorage
const UserProgress = {
    // Initialize and migrate from localStorage to cookies if needed
    init: function() {
        // Check if we should use cookies (preferred) or fallback to localStorage
        this.useCookies = CookieManager.areCookiesEnabled();
        
        // Migrate from localStorage to cookies if this is first time
        if (this.useCookies && !this.getData('migrated')) {
            this.migrateFromLocalStorage();
        }
    },
    
    // Migrate existing localStorage data to cookies
    migrateFromLocalStorage: function() {
        const xp = localStorage.getItem('userXP');
        const completedLessons = localStorage.getItem('completedLessons');
        const userLevel = localStorage.getItem('userLevel');
        
        if (xp) this.setData('userXP', parseInt(xp));
        if (completedLessons) this.setData('completedLessons', JSON.parse(completedLessons));
        if (userLevel) this.setData('userLevel', parseInt(userLevel));
        
        this.setData('migrated', true);
    },
    
    // Set data (uses cookies primarily, localStorage as fallback)
    setData: function(key, value) {
        if (this.useCookies) {
            CookieManager.setCookie(key, value);
        }
        // Always also save to localStorage as backup
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    },
    
    // Get data (tries cookies first, then localStorage)
    getData: function(key, defaultValue = null) {
        if (this.useCookies) {
            const cookieValue = CookieManager.getCookie(key);
            if (cookieValue !== null) return cookieValue;
        }
        
        // Fallback to localStorage
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },
    
    // Save lesson completion
    completeLesson: function(lessonId, score, totalQuestions) {
        const completedLessons = this.getData('completedLessons', {});
        const timestamp = new Date().toISOString();
        
        completedLessons[lessonId] = {
            score: score,
            totalQuestions: totalQuestions,
            accuracy: Math.round((score / totalQuestions) * 100),
            completedAt: timestamp,
            attempts: (completedLessons[lessonId]?.attempts || 0) + 1
        };
        
        this.setData('completedLessons', completedLessons);
    },
    
    // Check if lesson is completed
    isLessonCompleted: function(lessonId) {
        const completedLessons = this.getData('completedLessons', {});
        return !!completedLessons[lessonId];
    },
    
    // Get lesson stats
    getLessonStats: function(lessonId) {
        const completedLessons = this.getData('completedLessons', {});
        return completedLessons[lessonId] || null;
    },
    
    // Add XP
    addXP: function(amount) {
        const currentXP = this.getData('userXP', 0);
        const newXP = currentXP + amount;
        this.setData('userXP', newXP);
        
        // Update level based on XP
        this.updateLevel(newXP);
        
        return newXP;
    },
    
    // Get current XP
    getXP: function() {
        return this.getData('userXP', 0);
    },
    
    // Update user level based on XP
    updateLevel: function(xp) {
        // Simple level calculation: 100 XP per level
        const level = Math.floor(xp / 100) + 1;
        this.setData('userLevel', level);
        return level;
    },
    
    // Get current level
    getLevel: function() {
        return this.getData('userLevel', 1);
    },
    
    // Get all completed lessons
    getAllCompletedLessons: function() {
        return this.getData('completedLessons', {});
    },
    
    // Reset all progress (use with caution!)
    resetProgress: function() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.setData('userXP', 0);
            this.setData('userLevel', 1);
            this.setData('completedLessons', {});
            return true;
        }
        return false;
    },
    
    // Get summary statistics
    getStats: function() {
        const completedLessons = this.getAllCompletedLessons();
        const lessonCount = Object.keys(completedLessons).length;
        const totalScore = Object.values(completedLessons).reduce((sum, lesson) => sum + lesson.score, 0);
        const totalQuestions = Object.values(completedLessons).reduce((sum, lesson) => sum + lesson.totalQuestions, 0);
        
        return {
            xp: this.getXP(),
            level: this.getLevel(),
            lessonsCompleted: lessonCount,
            totalScore: totalScore,
            totalQuestions: totalQuestions,
            overallAccuracy: totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0
        };
    }
};

// Initialize user progress system when script loads
UserProgress.init();
