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

// Italian Learning Content - Organized by lessons matching modules
const lessonContent = {
    // UNIT 1 - Daily Basics & Greetings
    lesson1: {
        title: "Greetings & Introductions",
        icon: "",
        words: [
            { italian: "Ciao", english: "Hello/Bye" },
            { italian: "Buongiorno", english: "Good morning" },
            { italian: "Buonasera", english: "Good evening" },
            { italian: "Buonanotte", english: "Good night" },
            { italian: "Arrivederci", english: "Goodbye" },
            { italian: "Come stai?", english: "How are you?" },
            { italian: "Sto bene", english: "I'm fine" },
            { italian: "Come ti chiami?", english: "What's your name?" },
        ]
    },
    lesson2: {
        title: "Polite Phrases",
        icon: "",
        words: [
            { italian: "Grazie", english: "Thank you" },
            { italian: "Prego", english: "You're welcome" },
            { italian: "Per favore", english: "Please" },
            { italian: "Scusa", english: "Excuse me" },
            { italian: "Mi dispiace", english: "I'm sorry" },
            { italian: "Sì", english: "Yes" },
            { italian: "No", english: "No" },
            { italian: "Va bene", english: "Okay" },
        ]
    },
    lesson3: {
        title: "Everyday Sentences",
        icon: "",
        words: [
            { italian: "Mi chiamo", english: "My name is" },
            { italian: "Non capisco", english: "I don't understand" },
            { italian: "Parli inglese?", english: "Do you speak English?" },
            { italian: "Mi piace", english: "I like it" },
            { italian: "Non mi piace", english: "I don't like it" },
            { italian: "Vorrei...", english: "I would like..." },
            { italian: "Perfetto", english: "Perfect" },
            { italian: "Un momento", english: "One moment" },
        ]
    },
    
    // UNIT 2 - Colors & Numbers
    lesson4: {
        title: "Colors",
        icon: "",
        words: [
            { italian: "Rosso", english: "Red" },
            { italian: "Blu", english: "Blue" },
            { italian: "Verde", english: "Green" },
            { italian: "Giallo", english: "Yellow" },
            { italian: "Nero", english: "Black" },
            { italian: "Bianco", english: "White" },
            { italian: "Arancione", english: "Orange" },
            { italian: "Rosa", english: "Pink" },
        ]
    },
    lesson5: {
        title: "Numbers 1-10",
        icon: "",
        words: [
            { italian: "Uno", english: "One" },
            { italian: "Due", english: "Two" },
            { italian: "Tre", english: "Three" },
            { italian: "Quattro", english: "Four" },
            { italian: "Cinque", english: "Five" },
            { italian: "Sei", english: "Six" },
            { italian: "Sette", english: "Seven" },
            { italian: "Otto", english: "Eight" },
        ]
    },
    lesson6: {
        title: "Numbers 11-20 & Beyond",
        icon: "",
        words: [
            { italian: "Nove", english: "Nine" },
            { italian: "Dieci", english: "Ten" },
            { italian: "Undici", english: "Eleven" },
            { italian: "Dodici", english: "Twelve" },
            { italian: "Venti", english: "Twenty" },
            { italian: "Trenta", english: "Thirty" },
            { italian: "Cento", english: "One hundred" },
            { italian: "Mille", english: "One thousand" },
        ]
    },
    
    // UNIT 1 - REVIEW (Conversation)
    review1: {
        title: "Unit 1 Review - First Meeting",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "Maria", italian: "Buongiorno!", english: "Good morning!" },
            { speaker: "You", italian: "Buongiorno! Come stai?", english: "Good morning! How are you?" },
            { speaker: "Maria", italian: "Sto bene, grazie! Come ti chiami?", english: "I'm fine, thank you! What's your name?" },
            { speaker: "You", italian: "Mi chiamo [Your Name]. Piacere!", english: "My name is [Your Name]. Nice to meet you!" },
            { speaker: "Maria", italian: "Piacere! Parli italiano?", english: "Nice to meet you! Do you speak Italian?" },
            { speaker: "You", italian: "Un po'. Non capisco tutto.", english: "A little. I don't understand everything." },
            { speaker: "Maria", italian: "Va bene! Perfetto!", english: "That's okay! Perfect!" },
            { speaker: "You", italian: "Grazie per la pazienza!", english: "Thank you for your patience!" },
            { speaker: "Maria", italian: "Prego! A presto!", english: "You're welcome! See you soon!" },
            { speaker: "You", italian: "Arrivederci!", english: "Goodbye!" }
        ]
    },
    
    // UNIT 2 - REVIEW (Conversation)
    review2: {
        title: "Unit 2 Review - At the Market",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "Vendor", italian: "Buongiorno! Cosa desidera?", english: "Good morning! What would you like?" },
            { speaker: "You", italian: "Vorrei tre mele rosse, per favore.", english: "I would like three red apples, please." },
            { speaker: "Vendor", italian: "Perfetto! Altro?", english: "Perfect! Anything else?" },
            { speaker: "You", italian: "Sì, cinque banane gialle.", english: "Yes, five yellow bananas." },
            { speaker: "Vendor", italian: "Va bene. Sono otto euro.", english: "Okay. That's eight euros." },
            { speaker: "You", italian: "Ecco dieci euro.", english: "Here's ten euros." },
            { speaker: "Vendor", italian: "Grazie! Due euro di resto.", english: "Thank you! Two euros change." },
            { speaker: "You", italian: "Grazie mille! Mi piace il mercato!", english: "Thanks a lot! I like the market!" },
            { speaker: "Vendor", italian: "Mi fa piacere! Arrivederci!", english: "I'm glad! Goodbye!" },
            { speaker: "You", italian: "Arrivederci!", english: "Goodbye!" }
        ]
    },
    
    // UNIT 3 - Travel & Directions
    lesson7: {
        title: "Travel Essentials",
        icon: "",
        words: [
            { italian: "Aeroporto", english: "Airport" },
            { italian: "Stazione", english: "Station" },
            { italian: "Treno", english: "Train" },
            { italian: "Autobus", english: "Bus" },
            { italian: "Taxi", english: "Taxi" },
            { italian: "Biglietto", english: "Ticket" },
            { italian: "Valigia", english: "Suitcase" },
            { italian: "Passaporto", english: "Passport" },
        ]
    },
    lesson8: {
        title: "Directions",
        icon: "",
        words: [
            { italian: "Dov'è?", english: "Where is?" },
            { italian: "Destra", english: "Right" },
            { italian: "Sinistra", english: "Left" },
            { italian: "Dritto", english: "Straight" },
            { italian: "Vicino", english: "Near" },
            { italian: "Lontano", english: "Far" },
            { italian: "Qui", english: "Here" },
            { italian: "Là", english: "There" },
        ]
    },
    lesson9: {
        title: "Places & Travel Phrases",
        icon: "",
        words: [
            { italian: "Hotel", english: "Hotel" },
            { italian: "Ristorante", english: "Restaurant" },
            { italian: "Dov'è il bagno?", english: "Where is the bathroom?" },
            { italian: "Quanto costa?", english: "How much does it cost?" },
            { italian: "Aiuto!", english: "Help!" },
            { italian: "Fermata", english: "Stop" },
            { italian: "Centro", english: "Downtown" },
            { italian: "Entrata", english: "Entrance" },
        ]
    },
    
    // UNIT 3 - REVIEW (Conversation)
    review3: {
        title: "Unit 3 Review - Lost Tourist",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "You", italian: "Scusa, dov'è la stazione?", english: "Excuse me, where is the station?" },
            { speaker: "Local", italian: "La stazione? È vicino, a sinistra.", english: "The station? It's near, on the left." },
            { speaker: "You", italian: "Grazie! Dov'è il biglietto per il treno?", english: "Thank you! Where is the ticket for the train?" },
            { speaker: "Local", italian: "All'entrata della stazione. Dritto!", english: "At the station entrance. Straight ahead!" },
            { speaker: "You", italian: "Perfetto! Quanto costa il biglietto?", english: "Perfect! How much does the ticket cost?" },
            { speaker: "Local", italian: "Cinque euro per il centro.", english: "Five euros for downtown." },
            { speaker: "You", italian: "Va bene. Dov'è il bagno?", english: "Okay. Where is the bathroom?" },
            { speaker: "Local", italian: "Il bagno è a destra del ristorante.", english: "The bathroom is to the right of the restaurant." },
            { speaker: "You", italian: "Grazie mille! Lei è molto gentile!", english: "Thanks a lot! You are very kind!" },
            { speaker: "Local", italian: "Prego! Buon viaggio!", english: "You're welcome! Have a good trip!" }
        ]
    },
    
    // UNIT 4 - People & Family
    lesson10: {
        title: "Family Members",
        icon: "",
        words: [
            { italian: "Famiglia", english: "Family" },
            { italian: "Madre", english: "Mother" },
            { italian: "Padre", english: "Father" },
            { italian: "Sorella", english: "Sister" },
            { italian: "Fratello", english: "Brother" },
            { italian: "Nonna", english: "Grandmother" },
            { italian: "Nonno", english: "Grandfather" },
            { italian: "Figlio", english: "Son" },
        ]
    },
    lesson11: {
        title: "People & Relationships",
        icon: "",
        words: [
            { italian: "Figlia", english: "Daughter" },
            { italian: "Amico", english: "Friend" },
            { italian: "Amica", english: "Friend)" },
            { italian: "Marito", english: "Husband" },
            { italian: "Moglie", english: "Wife" },
            { italian: "Bambino", english: "Baby" },
            { italian: "Ragazzo", english: "Boy" },
            { italian: "Ragazza", english: "Girl" },
        ]
    },
    lesson12: {
        title: "Describing People",
        icon: "",
        words: [
            { italian: "Uomo", english: "Man" },
            { italian: "Donna", english: "Woman" },
            { italian: "Giovane", english: "Young" },
            { italian: "Vecchio", english: "Old" },
            { italian: "Alto", english: "Tall" },
            { italian: "Basso", english: "Short" },
            { italian: "Bello", english: "Handsome" },
            { italian: "Simpatico", english: "Friendly" },
        ]
    },
    
    // UNIT 4 - REVIEW (Conversation)
    review4: {
        title: "Unit 4 Review - Family Gathering",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "Sofia", italian: "Ciao! Questa è la tua famiglia?", english: "Hi! Is this your family?" },
            { speaker: "You", italian: "Sì! Questa è mia madre e mio padre.", english: "Yes! This is my mother and my father." },
            { speaker: "Sofia", italian: "Sono molto simpatici! E chi è lei?", english: "They are very nice! And who is she?" },
            { speaker: "You", italian: "Lei è mia sorella. È giovane e bella.", english: "She is my sister. She is young and beautiful." },
            { speaker: "Sofia", italian: "E questo ragazzo alto?", english: "And this tall boy?" },
            { speaker: "You", italian: "Lui è mio fratello. Ha venti anni.", english: "He is my brother. He is twenty years old." },
            { speaker: "Sofia", italian: "La tua famiglia è grande!", english: "Your family is big!" },
            { speaker: "You", italian: "Sì! E questa è mia nonna. Lei è molto vecchia.", english: "Yes! And this is my grandmother. She is very old." },
            { speaker: "Sofia", italian: "Che bella famiglia! Il tuo nonno dov'è?", english: "What a beautiful family! Where is your grandfather?" },
            { speaker: "You", italian: "Mio nonno è a casa con il bambino.", english: "My grandfather is at home with the baby." }
        ]
    },
    
    // UNIT 5 - Food & Dining
    lesson13: {
        title: "Common Foods",
        icon: "",
        words: [
            { italian: "il pane", english: "the bread" },
            { italian: "la pasta", english: "the pasta" },
            { italian: "la pizza", english: "the pizza" },
            { italian: "il formaggio", english: "the cheese" },
            { italian: "il pomodoro", english: "the tomato" },
            { italian: "l'acqua", english: "the water" },
            { italian: "il vino", english: "the wine" },
            { italian: "la carne", english: "the meat" },
            { italian: "il pesce", english: "the fish" },
            { italian: "l'insalata", english: "the salad" }
        ]
    },
    lesson14: {
        title: "At the Restaurant",
        icon: "",
        words: [
            { italian: "il menu", english: "the menu" },
            { italian: "il tavolo", english: "the table" },
            { italian: "il conto", english: "the bill" },
            { italian: "la prenotazione", english: "the reservation" },
            { italian: "il cameriere", english: "the waiter" },
            { italian: "la colazione", english: "the breakfast" },
            { italian: "il pranzo", english: "the lunch" },
            { italian: "la cena", english: "the dinner" },
            { italian: "delizioso", english: "delicious" },
            { italian: "piccante", english: "spicy" }
        ]
    },
    lesson15: {
        title: "Drinks & Desserts",
        icon: "",
        words: [
            { italian: "il caffè", english: "the coffee" },
            { italian: "il tè", english: "the tea" },
            { italian: "il latte", english: "the milk" },
            { italian: "il succo", english: "the juice" },
            { italian: "la birra", english: "the beer" },
            { italian: "il gelato", english: "the ice cream" },
            { italian: "la torta", english: "the cake" },
            { italian: "i biscotti", english: "the cookies" },
            { italian: "il dolce", english: "the dessert" },
            { italian: "lo zucchero", english: "the sugar" }
        ]
    },
    review5: {
        title: "Unit 5 Review - Restaurant Visit",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "Waiter", italian: "Buonasera! Avete una prenotazione?", english: "Good evening! Do you have a reservation?" },
            { speaker: "You", italian: "Sì, un tavolo per due persone.", english: "Yes, a table for two people." },
            { speaker: "Waiter", italian: "Perfetto! Ecco il menu. Cosa desiderate da bere?", english: "Perfect! Here's the menu. What would you like to drink?" },
            { speaker: "You", italian: "Vorrei un bicchiere di vino rosso, per favore.", english: "I would like a glass of red wine, please." },
            { speaker: "Waiter", italian: "Ottima scelta! E per mangiare?", english: "Excellent choice! And to eat?" },
            { speaker: "You", italian: "Prendo la pasta al pomodoro e l'insalata.", english: "I'll have the pasta with tomato and the salad." },
            { speaker: "Waiter", italian: "Benissimo! Volete anche il dolce?", english: "Very good! Would you also like dessert?" },
            { speaker: "You", italian: "Sì! Il gelato è delizioso qui?", english: "Yes! Is the ice cream delicious here?" },
            { speaker: "Waiter", italian: "È il migliore della città!", english: "It's the best in the city!" },
            { speaker: "You", italian: "Perfetto! Poi vorrei il conto, grazie.", english: "Perfect! Then I would like the bill, thank you." }
        ]
    },
    
    // UNIT 6 - Weather & Activities
    lesson16: {
        title: "Weather",
        icon: "",
        words: [
            { italian: "il sole", english: "the sun" },
            { italian: "la pioggia", english: "the rain" },
            { italian: "la neve", english: "the snow" },
            { italian: "il vento", english: "the wind" },
            { italian: "la nuvola", english: "the cloud" },
            { italian: "caldo", english: "hot" },
            { italian: "freddo", english: "cold" },
            { italian: "bello", english: "beautiful" },
            { italian: "brutto", english: "ugly" },
            { italian: "Che tempo fa?", english: "What's the weather like?" }
        ]
    },
    lesson17: {
        title: "Daily Activities",
        icon: "",
        words: [
            { italian: "lavorare", english: "to work" },
            { italian: "studiare", english: "to study" },
            { italian: "mangiare", english: "to eat" },
            { italian: "dormire", english: "to sleep" },
            { italian: "camminare", english: "to walk" },
            { italian: "correre", english: "to run" },
            { italian: "nuotare", english: "to swim" },
            { italian: "leggere", english: "to read" },
            { italian: "guardare", english: "to watch" },
            { italian: "ascoltare", english: "to listen" }
        ]
    },
    lesson18: {
        title: "Time Expressions",
        icon: "",
        words: [
            { italian: "oggi", english: "today" },
            { italian: "domani", english: "tomorrow" },
            { italian: "ieri", english: "yesterday" },
            { italian: "adesso", english: "now" },
            { italian: "dopo", english: "after" },
            { italian: "prima", english: "before" },
            { italian: "sempre", english: "always" },
            { italian: "mai", english: "never" },
            { italian: "presto", english: "early" },
            { italian: "tardi", english: "late" }
        ]
    },
    review6: {
        title: "Unit 6 Review - Making Plans",
        icon: "",
        type: "conversation",
        conversation: [
            { speaker: "Marco", italian: "Ciao! Che tempo fa oggi?", english: "Hi! What's the weather like today?" },
            { speaker: "You", italian: "C'è il sole! Fa molto caldo.", english: "It's sunny! It's very hot." },
            { speaker: "Marco", italian: "Perfetto! Vuoi andare a nuotare?", english: "Perfect! Do you want to go swimming?" },
            { speaker: "You", italian: "Sì! Adesso o dopo pranzo?", english: "Yes! Now or after lunch?" },
            { speaker: "Marco", italian: "Dopo pranzo. Prima devo studiare.", english: "After lunch. First I need to study." },
            { speaker: "You", italian: "Va bene! Io vado a correre oggi.", english: "Okay! I'm going running today." },
            { speaker: "Marco", italian: "Bravo! Sempre così attivo!", english: "Good for you! Always so active!" },
            { speaker: "You", italian: "Domani invece voglio dormire tardi.", english: "Tomorrow instead I want to sleep late." },
            { speaker: "Marco", italian: "Buona idea! E se piove?", english: "Good idea! And if it rains?" },
            { speaker: "You", italian: "Se piove, resto a casa a leggere.", english: "If it rains, I'll stay home and read." }
        ]
    }
};

// Game State
let currentQuestion = 0;
let totalQuestions = 10;
let score = 0;
let gameMode = '';
let currentAnswer = null;
let currentLesson = 'lesson1';
let allWords = [];
let isConversationMode = false;
let conversationData = null;
let incorrectQuestions = []; // Track questions answered incorrectly
let currentQuestionData = null; // Store current question data for retry

// Initialize lesson
function initLesson() {
    // Get lesson from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 'lesson1';
    
    // Load content for this specific lesson
    if (lessonContent[currentLesson]) {
        // Check if it's a conversation review
        if (lessonContent[currentLesson].type === 'conversation') {
            isConversationMode = true;
            conversationData = lessonContent[currentLesson].conversation;
            totalQuestions = conversationData.length;
        } else {
            allWords = lessonContent[currentLesson].words;
            totalQuestions = 10;
        }
    } else {
        allWords = lessonContent.lesson1.words;
        totalQuestions = 10;
    }
    
    currentQuestion = 0;
    score = 0;
    loadNextQuestion();
}

// Load next question
function loadNextQuestion() {
    // Check if we've gone through all regular questions and need to retry incorrect ones
    if (currentQuestion >= totalQuestions && incorrectQuestions.length > 0) {
        // Get the first incorrect question to retry
        const retryQuestion = incorrectQuestions.shift();
        currentQuestionData = retryQuestion;
        
        // Update progress (stay at 100% during retry phase)
        updateProgress();
        
        // Reset buttons
        const checkBtn = document.getElementById('checkButton');
        const continueBtn = document.getElementById('continueButton');
        checkBtn.classList.remove('hidden');
        continueBtn.classList.add('hidden');
        checkBtn.disabled = false;
        
        // Load the retry question based on its type
        if (retryQuestion.isConversation) {
            isConversationMode = true;
            loadConversationSlide();
        } else {
            isConversationMode = false;
            gameMode = retryQuestion.mode;
            currentAnswer = retryQuestion.answer;
            
            switch(gameMode) {
                case 'multipleChoice':
                    loadMultipleChoiceFromData(retryQuestion);
                    break;
                case 'fillBlank':
                    loadFillBlankFromData(retryQuestion);
                    break;
                case 'matchPairs':
                    loadMatchPairsFromData(retryQuestion);
                    break;
                case 'typing':
                    loadTypingFromData(retryQuestion);
                    break;
                case 'translate':
                    loadTranslateFromData(retryQuestion);
                    break;
            }
        }
        return;
    }
    
    if (currentQuestion >= totalQuestions) {
        showCompletionScreen();
        return;
    }

    // Update progress
    updateProgress();
    
    // Reset buttons at the start of each question
    const checkBtn = document.getElementById('checkButton');
    const continueBtn = document.getElementById('continueButton');
    
    // Clear any previous state
    checkBtn.classList.remove('hidden');
    continueBtn.classList.add('hidden');
    checkBtn.disabled = false;

    // If conversation mode, show conversation slide
    if (isConversationMode) {
        const line = conversationData[currentQuestion];
        currentQuestionData = {
            isConversation: true,
            questionIndex: currentQuestion,
            line: line,
            answer: line.speaker === "You" ? line.italian : null
        };
        currentAnswer = line.speaker === "You" ? line.italian : null;
        
        loadConversationSlide();
        
        if (line.speaker === "You") {
            
        } else {
            // Other person speaking - just show their dialogue with continue button
            checkBtn.classList.add('hidden');
            continueBtn.classList.remove('hidden');
            continueBtn.innerHTML = 'CONTINUE <i class="fas fa-arrow-right ml-2"></i>';
        }
    } else {
        // Random game mode selection
        const modes = ['multipleChoice', 'fillBlank', 'matchPairs', 'typing', 'translate'];
        gameMode = modes[Math.floor(Math.random() * modes.length)];
        
        // Store question data for potential retry
        const word = getRandomWord();
        currentQuestionData = {
            isConversation: false,
            mode: gameMode,
            word: word,
            answer: null // Will be set in each game mode
        };

        // Load appropriate game mode
        switch(gameMode) {
            case 'multipleChoice':
                loadMultipleChoice();
                break;
            case 'fillBlank':
                loadFillBlank();
                break;
            case 'matchPairs':
                loadMatchPairs();
                break;
            case 'typing':
                loadTyping();
                break;
            case 'translate':
                loadTranslate();
                break;
        }
        
        // For regular lessons, check button is already shown above
    }
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('lessonProgress').style.width = progress + '%';
}

// Conversation Slide
function loadConversationSlide() {
    const line = conversationData[currentQuestion];
    const isYou = line.speaker === "You";
    
    
    if (isYou) {
        currentAnswer = line.italian;
        
        // Generate wrong options from other lines in the conversation
        const choices = [line.italian];
        const otherLines = conversationData.filter((l, idx) => 
            idx !== currentQuestion && l.speaker === "You"
        );
        
        // Add wrong answers from other "You" lines
        while (choices.length < 3 && otherLines.length > 0) {
            const randomIdx = Math.floor(Math.random() * otherLines.length);
            const randomLine = otherLines.splice(randomIdx, 1)[0];
            if (!choices.includes(randomLine.italian)) {
                choices.push(randomLine.italian);
            }
        }
        
        // If we don't have enough options, add some from the previous lesson's words
        if (choices.length < 3 && allWords.length > 0) {
            while (choices.length < 3) {
                const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                if (!choices.includes(randomWord.italian)) {
                    choices.push(randomWord.italian);
                }
            }
        }
        
        shuffleArray(choices);
        
        const html = `
            <div class="text-center space-y-8">
                <div class="text-cyan-300 text-lg mb-4 font-bold flex items-center justify-center gap-3">
                    <i class="fas fa-comments text-3xl"></i>
                    <span>Conversation Practice - Your Turn!</span>
                </div>
                
                <!-- Context: What they said -->
                ${currentQuestion > 0 ? `
                <div class="glass p-6 rounded-2xl border-2 border-blue-400/30 bg-blue-500/20 text-left mb-6">
                    <div class="text-blue-300 font-bold text-sm mb-2">${conversationData[currentQuestion - 1].speaker} said:</div>
                    <div class="text-blue-100 text-xl font-semibold">"${conversationData[currentQuestion - 1].english}"</div>
                    <div class="text-blue-300 text-lg italic mt-2">${conversationData[currentQuestion - 1].italian}</div>
                </div>
                ` : ''}
                
                <!-- Prompt: What to say -->
                <div class="glass p-6 rounded-2xl border-2 border-blue-500/30 bg-cyan-500/20">
                    <div class="text-cyan-300 font-bold text-lg mb-2">How do you respond?</div>
                    <div class="text-white text-2xl font-semibold">
                        "${line.english}"
                    </div>
                </div>
                
                <!-- Answer Choices -->
                <div class="space-y-4">
                    ${choices.map(choice => {
                        return `
                        <button class="conversation-choice w-full p-6 glass rounded-2xl text-white text-left hover:bg-cyan-500/20 hover:scale-102 transition-all border-2 border-white/10 hover:border-blue-500/50 group shadow-lg" onclick="selectConversationChoice(this, '${choice.replace(/'/g, "\\'")}')">
                            <div class="text-2xl font-bold">${choice}</div>
                        </button>
                        `;
                    }).join('')}
                </div>
                
                <!-- Progress Indicator -->
                <div class="text-slate-400 text-sm mt-8">
                    Line ${currentQuestion + 1} of ${totalQuestions}
                </div>
            </div>
        `;
        
        document.getElementById('gameArea').innerHTML = html;
    } else {
        // If it's the other person speaking, just show what they said
        const html = `
            <div class="text-center space-y-8">
                <div class="text-cyan-300 text-lg mb-4 font-bold flex items-center justify-center gap-3">
                    <i class="fas fa-comments text-3xl"></i>
                    <span>Conversation Practice</span>
                </div>
                
                <!-- Speaker Badge -->
                <div class="flex justify-start mb-4">
                    <div class="glass px-6 py-3 rounded-full border-2 border-blue-400/50 bg-blue-500/20">
                        <span class="text-blue-300 font-bold text-lg">
                            ${line.speaker}
                        </span>
                    </div>
                </div>
                
                <!-- Italian Text -->
                <div class="glass p-8 rounded-3xl border-4 border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-left shadow-lg transform hover:scale-102 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        ${line.italian}
                    </div>
                    <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto mr-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${line.italian.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
                    </button>
                </div>
                
                <!-- English Translation -->
                <div class="glass p-6 rounded-2xl border-2 border-white/10 text-left bg-slate-800/50">
                    <div class="text-slate-300 text-2xl font-semibold">
                        "${line.english}"
                    </div>
                </div>
                
                <!-- Progress Indicator -->
                <div class="text-slate-400 text-sm mt-8">
                    Line ${currentQuestion + 1} of ${totalQuestions}
                </div>
            </div>
        `;

        document.getElementById('gameArea').innerHTML = html;
    }
}

// Multiple Choice Game
function loadMultipleChoice() {
    const word = getRandomWord();
    currentAnswer = word.english;
    
    // Update question data for potential retry
    if (currentQuestionData) {
        currentQuestionData.word = word;
        currentQuestionData.answer = word.english;
    }

    const choices = [word.english];
    while (choices.length < 4) {
        const randomWord = getRandomWord();
        if (!choices.includes(randomWord.english)) {
            choices.push(randomWord.english);
        }
    }
    shuffleArray(choices);

    const html = `
        <div class="text-center mb-12">
            <div class="text-cyan-300 text-lg mb-4 font-bold">What does this mean?</div>
            <div class="text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6 drop-shadow-lg">${word.italian}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <div class="space-y-4">
            ${choices.map(choice => `
                <button class="choice-button w-full p-6 glass rounded-full text-white text-xl font-bold text-center hover:bg-white/10 hover:scale-105 transition-all border-4 border-white/10 hover:border-blue-500/50 group shadow-lg" onclick="selectChoice(this, '${choice.replace(/'/g, "\\'")}')">
                    <span class="group-hover:scale-110 inline-block transition-transform">${choice}</span>
                </button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
}

// Fill in the Blank
function loadFillBlank() {
    const word = getRandomWord();
    const sentence = `Complete: "${word.italian}" means ___`;
    currentAnswer = word.english;
    
    // Update question data for potential retry
    if (currentQuestionData) {
        currentQuestionData.word = word;
        currentQuestionData.answer = word.english;
    }

    const words = [word.english];
    while (words.length < 6) {
        const randomWord = getRandomWord();
        if (!words.includes(randomWord.english)) {
            words.push(randomWord.english);
        }
    }
    shuffleArray(words);

    const html = `
        <div class="text-center mb-12">
            <div class="text-cyan-300 text-2xl mb-6 font-bold">Fill in the blank</div>
            <div class="text-center mb-8">
                <div class="text-white text-3xl font-bold mb-4">"${word.italian}" means:</div>
                <div class="inline-block min-w-[180px] px-6 py-3 border-b-4 border-dashed border-blue-500 text-center text-blue-400 font-bold text-2xl bg-blue-500/10 rounded-lg mx-2" id="blankSpace">___</div>
            </div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <div class="flex flex-wrap gap-4 justify-center mt-8">
            ${words.map(w => `
                <button class="word-chip px-8 py-4 glass rounded-full text-white text-lg font-bold hover:bg-white/10 hover:scale-105 transition-all border-4 border-white/10 hover:border-blue-500/50 shadow-lg" onclick="fillBlank(this, &quot;${w}&quot;)">${w}</button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
}

// Match Pairs Game
function loadMatchPairs() {
    const words = [];
    const usedIndices = new Set();
    
    // Get 4 unique random words
    while (words.length < 4) {
        const randomIndex = Math.floor(Math.random() * allWords.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            words.push(allWords[randomIndex]);
        }
    }

    const leftColumn = words.map(w => w.italian);
    const rightColumn = words.map(w => w.english);
    shuffleArray(rightColumn);

    currentAnswer = words; // Store for checking
    
    // Update question data for potential retry
    if (currentQuestionData) {
        currentQuestionData.words = words;
        currentQuestionData.answer = words;
    }

    const html = `
        <div class="text-center mb-12">
            <div class="text-cyan-300 text-2xl mb-8 font-bold">Match the pairs</div>
        </div>
        <div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div class="flex flex-col gap-4">
                ${leftColumn.map((word, i) => `
                    <div class="match-card px-6 py-5 glass rounded-2xl text-white text-xl font-bold cursor-pointer transition-all hover:scale-105 border-4 border-slate-700 hover:border-blue-500/50 text-center" data-italian="${word}" onclick="selectMatch(this, 'left', ${i})">
                        ${word}
                    </div>
                `).join('')}
            </div>
            <div class="flex flex-col gap-4">
                ${rightColumn.map((word, i) => `
                    <div class="match-card px-6 py-5 glass rounded-2xl text-white text-xl font-bold cursor-pointer transition-all hover:scale-105 border-4 border-slate-700 hover:border-blue-500/50 text-center" data-english="${word}" onclick="selectMatch(this, 'right', ${i})">
                        ${word}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
    window.matchState = { left: null, right: null, matches: [] };
}

// Typing Exercise
function loadTyping() {
    const word = getRandomWord();
    currentAnswer = word.italian.toLowerCase();
    
    // Update question data for potential retry
    if (currentQuestionData) {
        currentQuestionData.word = word;
        currentQuestionData.answer = word.italian.toLowerCase();
    }

    const html = `
        <div class="text-center mb-8">
            <div class="text-cyan-300 text-xl mb-4 font-bold">Type the Italian word</div>
            <div class="text-5xl font-black text-white mb-6">${word.english}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-500/30 focus:border-blue-500 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type here..." autocomplete="off">
    `;

    document.getElementById('gameArea').innerHTML = html;
    document.getElementById('typingInput').focus();
}

// Translate Question
function loadTranslate() {
    const word = getRandomWord();
    const direction = Math.random() > 0.5 ? 'toItalian' : 'toEnglish';
    
    // Update question data for potential retry
    if (currentQuestionData) {
        currentQuestionData.word = word;
        currentQuestionData.direction = direction;
    }
    
    if (direction === 'toItalian') {
        currentAnswer = word.italian.toLowerCase();
        
        // Update answer in question data
        if (currentQuestionData) {
            currentQuestionData.answer = word.italian.toLowerCase();
        }
        
        const html = `
            <div class="text-center mb-8">
                <div class="text-cyan-300 text-xl mb-4 font-bold">Translate to Italian</div>
                <div class="text-6xl font-black bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-6">${word.english}</div>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-400/30 focus:border-blue-400 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type in Italian..." autocomplete="off">
        `;
        document.getElementById('gameArea').innerHTML = html;
    } else {
        currentAnswer = word.english.toLowerCase();
        
        // Update answer in question data
        if (currentQuestionData) {
            currentQuestionData.answer = word.english.toLowerCase();
        }
        
        const html = `
            <div class="text-center mb-8">
                <div class="text-cyan-300 text-xl mb-4 font-bold">Translate to English</div>
                <div class="text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">${word.italian}</div>
                <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
                </button>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-400/30 focus:border-blue-400 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type in English..." autocomplete="off">
        `;
        document.getElementById('gameArea').innerHTML = html;
    }
    document.getElementById('typingInput').focus();
}

// Helper Functions
function getRandomWord() {
    return allWords[Math.floor(Math.random() * allWords.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function speakItalian(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    window.speechSynthesis.speak(utterance);
}

// Game Interactions
function selectChoice(button, choice) {
    // Prevent multiple clicks
    if (button.classList.contains('pointer-events-none')) return;
    
    // Disable check button for multiple choice since we auto-check
    document.getElementById('checkButton').disabled = true;
    
    // Remove previous selections and disable all choice buttons
    document.querySelectorAll('.choice-button').forEach(btn => {
        btn.classList.add('pointer-events-none');
        btn.style.pointerEvents = 'none';
    });

    if (choice === currentAnswer) {
        button.className = 'choice-button w-full p-6 rounded-full text-white text-xl font-black text-center border-4 border-blue-500 bg-gradient-to-r from-blue-500/50 to-blue-600/50 animate-correct shadow-lg pointer-events-none';
        score++;
        setTimeout(() => showFeedback(true), 500);
    } else {
        button.className = 'choice-button w-full p-6 rounded-full text-white text-xl font-black text-center border-4 border-red-500 bg-gradient-to-r from-red-500/50 to-red-600/50 animate-shake shadow-lg pointer-events-none';
        setTimeout(() => showFeedback(false), 500);
    }
}

function selectConversationChoice(button, choice) {
    // Prevent multiple clicks
    if (button.classList.contains('pointer-events-none')) return;
    
    // Disable check button since we auto-check
    document.getElementById('checkButton').disabled = true;
    
    // Disable all choice buttons
    document.querySelectorAll('.conversation-choice').forEach(btn => {
        btn.classList.add('pointer-events-none');
        btn.style.pointerEvents = 'none';
    });

    const line = conversationData[currentQuestion];
    
    if (choice === currentAnswer) {
        button.className = 'conversation-choice w-full p-6 glass rounded-2xl text-white text-left border-4 border-blue-500 bg-gradient-to-r from-blue-500/50 to-blue-600/50 animate-correct shadow-lg pointer-events-none';
        
        // Show the pronunciation and play audio
        speakItalian(choice);
        
        score++;
        setTimeout(() => showFeedback(true), 500);
    } else {
        button.className = 'conversation-choice w-full p-6 glass rounded-2xl text-white text-left border-4 border-red-500 bg-gradient-to-r from-red-500/50 to-red-600/50 animate-shake shadow-lg pointer-events-none';
        
        // Show correct answer
        setTimeout(() => {
            const buttons = document.querySelectorAll('.conversation-choice');
            buttons.forEach(btn => {
                if (btn.textContent.includes(currentAnswer)) {
                    btn.className = 'conversation-choice w-full p-6 glass rounded-2xl text-white text-left border-4 border-blue-500 bg-gradient-to-r from-blue-500/50 to-blue-600/50 shadow-lg pointer-events-none';
                }
            });
        }, 500);
        
        setTimeout(() => showFeedback(false), 1000);
    }
}

function fillBlank(button, word) {
    // Prevent multiple clicks
    if (button.disabled) return;
    
    document.getElementById('blankSpace').textContent = word;
    
    // Mark button as selected but don't disable it yet
    document.querySelectorAll('.word-chip').forEach(btn => {
        btn.classList.remove('bg-gradient-to-br', 'from-blue-400', 'to-blue-500', 'border-blue-400');
    });
    
    button.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-blue-500', 'border-blue-400');
    
    // Enable check button since user made a selection
    document.getElementById('checkButton').disabled = false;
}

function selectMatch(card, side, index) {
    if (card.classList.contains('matched')) return;

    // Deselect previous in same column
    document.querySelectorAll(`.match-card.selected`).forEach(c => {
        if (c.parentElement === card.parentElement) {
            c.classList.remove('selected', 'border-blue-500', 'bg-blue-500/30');
            c.classList.add('border-slate-700');
        }
    });

    // Select current card
    card.classList.add('selected');
    card.classList.remove('border-slate-700');
    card.classList.add('border-blue-500', 'bg-blue-500/30');
    window.matchState[side] = card;

    // Check if both sides selected
    if (window.matchState.left && window.matchState.right) {
        const italian = window.matchState.left.dataset.italian;
        const english = window.matchState.right.dataset.english;

        const match = currentAnswer.find(w => w.italian === italian && w.english === english);
        
        if (match) {
            // Mark as matched with blue styling
            window.matchState.left.classList.remove('border-blue-500', 'bg-blue-500/30', 'selected');
            window.matchState.left.classList.add('matched', 'border-blue-300', 'bg-blue-400/30', 'opacity-60', 'cursor-default');
            
            window.matchState.right.classList.remove('border-blue-500', 'bg-blue-500/30', 'selected');
            window.matchState.right.classList.add('matched', 'border-blue-300', 'bg-blue-400/30', 'opacity-60', 'cursor-default');
            
            window.matchState.matches.push(match);
            
            if (window.matchState.matches.length === 4) {
                score++;
                // Disable check button when game is complete
                document.getElementById('checkButton').disabled = true;
                setTimeout(() => showFeedback(true), 500);
            }
        } else {
            // Shake animation for wrong match
            window.matchState.left.classList.add('animate-shake');
            window.matchState.right.classList.add('animate-shake');
            
            setTimeout(() => {
                window.matchState.left.classList.remove('selected', 'border-blue-500', 'bg-blue-500/30', 'animate-shake');
                window.matchState.left.classList.add('border-slate-700');
                
                window.matchState.right.classList.remove('selected', 'border-blue-500', 'bg-blue-500/30', 'animate-shake');
                window.matchState.right.classList.add('border-slate-700');
            }, 800);
        }

        window.matchState.left = null;
        window.matchState.right = null;
    }
}

// Check Answer
function checkAnswer() {
    if (gameMode === 'typing' || gameMode === 'translate') {
        const input = document.getElementById('typingInput');
        const userAnswer = input.value.toLowerCase().trim();
        
        document.getElementById('checkButton').disabled = true;
        
        if (userAnswer === currentAnswer) {
            input.classList.remove('border-blue-500/30', 'border-blue-400/30', 'border-green-400/30');
            input.classList.add('border-green-500', 'bg-green-500/20');
            score++;
            setTimeout(() => showFeedback(true), 500);
        } else {
            input.classList.remove('border-blue-500/30', 'border-blue-400/30', 'border-green-400/30');
            input.classList.add('border-red-500', 'bg-red-500/20', 'animate-shake');
            setTimeout(() => showFeedback(false), 500);
        }
    } else if (gameMode === 'fillBlank') {
        const blankSpace = document.getElementById('blankSpace');
        const selectedAnswer = blankSpace.textContent.trim();
        
        console.log('Selected:', selectedAnswer);
        console.log('Correct:', currentAnswer);
        console.log('Match:', selectedAnswer === currentAnswer);
        
        // Disable all word chips
        document.querySelectorAll('.word-chip').forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });
        
        document.getElementById('checkButton').disabled = true;
        
        // Check if answers match (case-insensitive and trim whitespace)
        const isCorrect = selectedAnswer.toLowerCase() === currentAnswer.toLowerCase();
        
        if (isCorrect) {
            blankSpace.classList.remove('border-blue-500', 'bg-blue-500/10', 'text-blue-400');
            blankSpace.classList.add('border-green-400', 'bg-green-500/20', 'text-green-300');
            
            // Highlight the selected button as correct
            document.querySelectorAll('.word-chip').forEach(btn => {
                if (btn.textContent === currentAnswer) {
                    btn.classList.remove('from-blue-400', 'to-blue-500', 'border-blue-400');
                    btn.classList.add('bg-gradient-to-br', 'from-green-400', 'to-green-500', 'border-green-400', 'animate-correct');
                }
            });
            
            score++;
            setTimeout(() => showFeedback(true), 500);
        } else {
            blankSpace.classList.remove('border-blue-500', 'bg-blue-500/10', 'text-blue-400');
            blankSpace.classList.add('border-red-400', 'bg-red-500/20', 'text-red-400', 'animate-shake');
            
            // Highlight the selected button as wrong
            document.querySelectorAll('.word-chip').forEach(btn => {
                if (btn.textContent === selectedAnswer) {
                    btn.classList.remove('from-blue-400', 'to-blue-500', 'border-blue-400');
                    btn.classList.add('bg-gradient-to-br', 'from-red-500', 'to-red-600', 'border-red-500', 'animate-shake');
                }
                // Show correct answer
                if (btn.textContent === currentAnswer) {
                    btn.classList.add('bg-gradient-to-br', 'from-green-400', 'to-green-500', 'border-green-400');
                }
            });
            
            setTimeout(() => showFeedback(false), 500);
        }
    }
}

// Continue to next question
function continueLesson() {
    // Clear any previous game state
    if (window.matchState) {
        window.matchState = { left: null, right: null, matches: [] };
    }
    
    currentQuestion++;
    loadNextQuestion();
}

// Helper functions to load questions from saved data (for retries)
function loadMultipleChoiceFromData(questionData) {
    const word = questionData.word;
    currentAnswer = word.english;

    const choices = [word.english];
    while (choices.length < 4) {
        const randomWord = getRandomWord();
        if (!choices.includes(randomWord.english)) {
            choices.push(randomWord.english);
        }
    }
    shuffleArray(choices);

    const html = `
        <div class="text-center mb-12">
            <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
            <div class="text-cyan-300 text-lg mb-4 font-bold">What does this mean?</div>
            <div class="text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6 drop-shadow-lg">${word.italian}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <div class="space-y-4">
            ${choices.map(choice => `
                <button class="choice-button w-full p-6 glass rounded-full text-white text-xl font-bold text-center hover:bg-white/10 hover:scale-105 transition-all border-4 border-white/10 hover:border-blue-500/50 group shadow-lg" onclick="selectChoice(this, '${choice.replace(/'/g, "\\'")}')">
                    <span class="group-hover:scale-110 inline-block transition-transform">${choice}</span>
                </button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
}

function loadFillBlankFromData(questionData) {
    const word = questionData.word;
    currentAnswer = word.english;

    const words = [word.english];
    while (words.length < 6) {
        const randomWord = getRandomWord();
        if (!words.includes(randomWord.english)) {
            words.push(randomWord.english);
        }
    }
    shuffleArray(words);

    const html = `
        <div class="text-center mb-12">
            <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
            <div class="text-cyan-300 text-2xl mb-6 font-bold">Fill in the blank</div>
            <div class="text-center mb-8">
                <div class="text-white text-3xl font-bold mb-4">"${word.italian}" means:</div>
                <div class="inline-block min-w-[180px] px-6 py-3 border-b-4 border-dashed border-blue-500 text-center text-blue-400 font-bold text-2xl bg-blue-500/10 rounded-lg mx-2" id="blankSpace">___</div>
            </div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <div class="flex flex-wrap gap-4 justify-center mt-8">
            ${words.map(w => `
                <button class="word-chip px-8 py-4 glass rounded-full text-white text-lg font-bold hover:bg-white/10 hover:scale-105 transition-all border-4 border-white/10 hover:border-blue-500/50 shadow-lg" onclick="fillBlank(this, &quot;${w}&quot;)">${w}</button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
}

function loadMatchPairsFromData(questionData) {
    const words = questionData.words || [];
    
    // If we don't have stored words, generate new ones
    if (words.length === 0) {
        const usedIndices = new Set();
        while (words.length < 4) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                words.push(allWords[randomIndex]);
            }
        }
        questionData.words = words;
    }

    const leftColumn = words.map(w => w.italian);
    const rightColumn = words.map(w => w.english);
    shuffleArray(rightColumn);

    currentAnswer = words;

    const html = `
        <div class="text-center mb-12">
            <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
            <div class="text-cyan-300 text-2xl mb-8 font-bold">Match the pairs</div>
        </div>
        <div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div class="flex flex-col gap-4">
                ${leftColumn.map((word, i) => `
                    <div class="match-card px-6 py-5 glass rounded-2xl text-white text-xl font-bold cursor-pointer transition-all hover:scale-105 border-4 border-slate-700 hover:border-blue-500/50 text-center" data-italian="${word}" onclick="selectMatch(this, 'left', ${i})">
                        ${word}
                    </div>
                `).join('')}
            </div>
            <div class="flex flex-col gap-4">
                ${rightColumn.map((word, i) => `
                    <div class="match-card px-6 py-5 glass rounded-2xl text-white text-xl font-bold cursor-pointer transition-all hover:scale-105 border-4 border-slate-700 hover:border-blue-500/50 text-center" data-english="${word}" onclick="selectMatch(this, 'right', ${i})">
                        ${word}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
    window.matchState = { left: null, right: null, matches: [] };
}

function loadTypingFromData(questionData) {
    const word = questionData.word;
    currentAnswer = word.italian.toLowerCase();

    const html = `
        <div class="text-center mb-8">
            <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
            <div class="text-cyan-300 text-xl mb-4 font-bold">Type the Italian word</div>
            <div class="text-5xl font-black text-white mb-6">${word.english}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-500/30 focus:border-blue-500 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type here..." autocomplete="off">
    `;

    document.getElementById('gameArea').innerHTML = html;
    document.getElementById('typingInput').focus();
}

function loadTranslateFromData(questionData) {
    const word = questionData.word;
    const direction = questionData.direction || (Math.random() > 0.5 ? 'toItalian' : 'toEnglish');
    questionData.direction = direction;
    
    if (direction === 'toItalian') {
        currentAnswer = word.italian.toLowerCase();
        const html = `
            <div class="text-center mb-8">
                <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
                <div class="text-cyan-300 text-xl mb-4 font-bold">Translate to Italian</div>
                <div class="text-6xl font-black bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-6">${word.english}</div>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-400/30 focus:border-blue-400 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type in Italian..." autocomplete="off">
        `;
        document.getElementById('gameArea').innerHTML = html;
    } else {
        currentAnswer = word.english.toLowerCase();
        const html = `
            <div class="text-center mb-8">
                <div class="text-orange-300 text-lg mb-2 font-bold">⚠️ Try Again!</div>
                <div class="text-cyan-300 text-xl mb-4 font-bold">Translate to English</div>
                <div class="text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">${word.italian}</div>
                <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-volume-high text-2xl text-blue-400 group-hover:scale-125 transition-transform"></i>
                </button>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-400/30 focus:border-blue-400 focus:outline-none placeholder-slate-500 shadow-lg" id="typingInput" placeholder="Type in English..." autocomplete="off">
        `;
        document.getElementById('gameArea').innerHTML = html;
    }
    document.getElementById('typingInput').focus();
}

function showFeedback(correct) {
    const checkBtn = document.getElementById('checkButton');
    const continueBtn = document.getElementById('continueButton');
    
    checkBtn.classList.add('hidden');
    continueBtn.classList.remove('hidden');
    
    // Track incorrect answers for retry
    if (!correct && currentQuestionData) {
        // Store answer in question data
        if (currentQuestionData.isConversation) {
            currentQuestionData.answer = currentAnswer;
        } else {
            currentQuestionData.answer = currentAnswer;
        }
        incorrectQuestions.push(currentQuestionData);
    }
    
    // Show encouraging message
    if (correct) {
        continueBtn.innerHTML = 'AWESOME! Continue <i class="fas fa-arrow-right ml-2"></i>';
    } else {
        continueBtn.innerHTML = 'Keep Going! <i class="fas fa-arrow-right ml-2"></i>';
    }
}

// Completion Screen
function showCompletionScreen() {
    // For conversation mode, give full XP since they completed the conversation
    const finalScore = isConversationMode ? totalQuestions : score;
    const xpEarned = finalScore * 10;
    const accuracy = Math.round((finalScore / totalQuestions) * 100);

    const completionTitle = isConversationMode ? 'Conversation Complete!' : 'Lesson Complete!';
    const completionIcon = '';

    const html = `
        <div class="text-center space-y-8">
            <div class="text-8xl animate-bounce"><i class="fas fa-trophy text-yellow-400"></i></div>
            <h2 class="text-5xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">${completionTitle}</h2>
            <div class="text-6xl font-bold text-yellow-400 animate-pulse">+${xpEarned} XP</div>
            
            <div class="grid grid-cols-3 gap-4 mt-8">
                <div class="glass p-6 rounded-full border-4 border-blue-500/30 hover:scale-110 transition-transform shadow-lg">
                    <div class="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">${finalScore}/${totalQuestions}</div>
                    <div class="text-cyan-300 text-sm mt-2 font-bold">${isConversationMode ? 'Lines' : 'Correct'}</div>
                </div>
                <div class="glass p-6 rounded-full border-4 border-blue-400/30 hover:scale-110 transition-transform shadow-lg">
                    <div class="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">${accuracy}%</div>
                    <div class="text-blue-300 text-sm mt-2 font-bold">Accuracy</div>
                </div>
                <div class="glass p-6 rounded-full border-4 border-yellow-400/30 hover:scale-110 transition-transform shadow-lg">
                    <div class="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">${xpEarned}</div>
                    <div class="text-yellow-300 text-sm mt-2 font-bold">XP Earned</div>
                </div>
            </div>
            
            <button class="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-black text-xl shadow-lg hover:brightness-110 transform hover:scale-105 transition-all duration-300 mt-8 border-4 border-blue-400/30" onclick="window.location.href='modules-gameboard.html'">
                CONTINUE TO NEXT LESSON <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
    document.getElementById('checkButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
    
    // Save lesson completion and add XP using UserProgress system
    UserProgress.completeLesson(currentLesson, finalScore, totalQuestions);
    const newXP = UserProgress.addXP(xpEarned);
    
    // Log progress for debugging
    console.log('Lesson completed:', currentLesson);
    console.log('New total XP:', newXP);
    console.log('Current level:', UserProgress.getLevel());
    console.log('Progress stats:', UserProgress.getStats());
}

// Start the lesson when page loads
window.addEventListener('load', initLesson);
