// Italian Learning Content - Organized by lessons matching modules
const lessonContent = {
    // UNIT 1 - Daily Basics & Greetings
    lesson1: {
        title: "Greetings & Introductions",
        icon: "👋",
        words: [
            { italian: "Ciao", english: "Hello/Bye", pronunciation: "chow" },
            { italian: "Buongiorno", english: "Good morning", pronunciation: "bwon-JOR-no" },
            { italian: "Buonasera", english: "Good evening", pronunciation: "bwon-ah-SEH-rah" },
            { italian: "Buonanotte", english: "Good night", pronunciation: "bwon-ah-NOT-teh" },
            { italian: "Arrivederci", english: "Goodbye", pronunciation: "ah-ree-veh-DAIR-chee" },
            { italian: "Come stai?", english: "How are you?", pronunciation: "KO-meh STAI" },
            { italian: "Sto bene", english: "I'm fine", pronunciation: "sto BEH-neh" },
            { italian: "Come ti chiami?", english: "What's your name?", pronunciation: "KO-meh tee KYAH-mee" },
        ]
    },
    lesson2: {
        title: "Polite Phrases",
        icon: "🙏",
        words: [
            { italian: "Grazie", english: "Thank you", pronunciation: "GRAHT-see-eh" },
            { italian: "Prego", english: "You're welcome", pronunciation: "PREH-go" },
            { italian: "Per favore", english: "Please", pronunciation: "pehr fah-VOH-reh" },
            { italian: "Scusa", english: "Excuse me/Sorry", pronunciation: "SKOO-zah" },
            { italian: "Mi dispiace", english: "I'm sorry", pronunciation: "mee dee-SPYAH-cheh" },
            { italian: "Sì", english: "Yes", pronunciation: "see" },
            { italian: "No", english: "No", pronunciation: "no" },
            { italian: "Va bene", english: "Okay/Alright", pronunciation: "vah BEH-neh" },
        ]
    },
    lesson3: {
        title: "Everyday Sentences",
        icon: "💭",
        words: [
            { italian: "Mi chiamo...", english: "My name is...", pronunciation: "mee KYAH-mo" },
            { italian: "Non capisco", english: "I don't understand", pronunciation: "non kah-PEE-sko" },
            { italian: "Parli inglese?", english: "Do you speak English?", pronunciation: "PAR-lee een-GLEH-zeh" },
            { italian: "Mi piace", english: "I like it", pronunciation: "mee PYAH-cheh" },
            { italian: "Non mi piace", english: "I don't like it", pronunciation: "non mee PYAH-cheh" },
            { italian: "Vorrei...", english: "I would like...", pronunciation: "vor-RAY" },
            { italian: "Perfetto", english: "Perfect", pronunciation: "per-FET-to" },
            { italian: "Un momento", english: "One moment", pronunciation: "oon mo-MEN-to" },
        ]
    },
    
    // UNIT 2 - Colors & Numbers
    lesson4: {
        title: "Numbers 1-10",
        icon: "🔢",
        words: [
            { italian: "Uno", english: "One", pronunciation: "OO-no" },
            { italian: "Due", english: "Two", pronunciation: "DOO-eh" },
            { italian: "Tre", english: "Three", pronunciation: "treh" },
            { italian: "Quattro", english: "Four", pronunciation: "KWAH-tro" },
            { italian: "Cinque", english: "Five", pronunciation: "CHEEN-kweh" },
            { italian: "Sei", english: "Six", pronunciation: "say" },
            { italian: "Sette", english: "Seven", pronunciation: "SET-teh" },
            { italian: "Otto", english: "Eight", pronunciation: "OH-toh" },
        ]
    },
    lesson5: {
        title: "Numbers 11-20 & Beyond",
        icon: "🔢",
        words: [
            { italian: "Nove", english: "Nine", pronunciation: "NOH-veh" },
            { italian: "Dieci", english: "Ten", pronunciation: "DYEH-chee" },
            { italian: "Undici", english: "Eleven", pronunciation: "OON-dee-chee" },
            { italian: "Dodici", english: "Twelve", pronunciation: "DOH-dee-chee" },
            { italian: "Venti", english: "Twenty", pronunciation: "VEN-tee" },
            { italian: "Trenta", english: "Thirty", pronunciation: "TREN-tah" },
            { italian: "Cento", english: "One hundred", pronunciation: "CHEN-to" },
            { italian: "Mille", english: "One thousand", pronunciation: "MEE-leh" },
        ]
    },
    lesson6: {
        title: "Colors",
        icon: "🎨",
        words: [
            { italian: "Rosso", english: "Red", pronunciation: "ROH-so" },
            { italian: "Blu", english: "Blue", pronunciation: "bloo" },
            { italian: "Verde", english: "Green", pronunciation: "VER-deh" },
            { italian: "Giallo", english: "Yellow", pronunciation: "JAH-lo" },
            { italian: "Nero", english: "Black", pronunciation: "NEH-ro" },
            { italian: "Bianco", english: "White", pronunciation: "BYAN-ko" },
            { italian: "Arancione", english: "Orange", pronunciation: "ah-rahn-CHO-neh" },
            { italian: "Rosa", english: "Pink", pronunciation: "ROH-zah" },
        ]
    },
    
    // UNIT 3 - Travel & Directions
    lesson7: {
        title: "Travel Essentials",
        icon: "✈️",
        words: [
            { italian: "Aeroporto", english: "Airport", pronunciation: "ah-eh-ro-POR-to" },
            { italian: "Stazione", english: "Station", pronunciation: "stah-tsee-OH-neh" },
            { italian: "Treno", english: "Train", pronunciation: "TREH-no" },
            { italian: "Autobus", english: "Bus", pronunciation: "ow-to-BOOS" },
            { italian: "Taxi", english: "Taxi", pronunciation: "TAK-see" },
            { italian: "Biglietto", english: "Ticket", pronunciation: "beel-YET-to" },
            { italian: "Valigia", english: "Suitcase", pronunciation: "vah-LEE-jah" },
            { italian: "Passaporto", english: "Passport", pronunciation: "pah-sah-POR-to" },
        ]
    },
    lesson8: {
        title: "Directions",
        icon: "🧭",
        words: [
            { italian: "Dov'è?", english: "Where is?", pronunciation: "do-VEH" },
            { italian: "Destra", english: "Right", pronunciation: "DEH-strah" },
            { italian: "Sinistra", english: "Left", pronunciation: "see-NEE-strah" },
            { italian: "Dritto", english: "Straight", pronunciation: "DREE-toh" },
            { italian: "Vicino", english: "Near", pronunciation: "vee-CHEE-no" },
            { italian: "Lontano", english: "Far", pronunciation: "lon-TAH-no" },
            { italian: "Qui", english: "Here", pronunciation: "kwee" },
            { italian: "Là", english: "There", pronunciation: "lah" },
        ]
    },
    lesson9: {
        title: "Places & Travel Phrases",
        icon: "🗺️",
        words: [
            { italian: "Hotel", english: "Hotel", pronunciation: "o-TEL" },
            { italian: "Ristorante", english: "Restaurant", pronunciation: "ree-sto-RAHN-teh" },
            { italian: "Dov'è il bagno?", english: "Where is the bathroom?", pronunciation: "do-VEH eel BAHN-yo" },
            { italian: "Quanto costa?", english: "How much does it cost?", pronunciation: "KWAN-to KO-stah" },
            { italian: "Aiuto!", english: "Help!", pronunciation: "eye-OO-to" },
            { italian: "Fermata", english: "Stop (bus/train)", pronunciation: "fer-MAH-tah" },
            { italian: "Centro", english: "Center/Downtown", pronunciation: "CHEN-tro" },
            { italian: "Entrata", english: "Entrance", pronunciation: "en-TRAH-tah" },
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

// Initialize lesson
function initLesson() {
    // Get lesson from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentLesson = urlParams.get('lesson') || 'lesson1';
    
    // Load words for this specific lesson
    if (lessonContent[currentLesson]) {
        allWords = lessonContent[currentLesson].words;
    } else {
        allWords = lessonContent.lesson1.words;
    }
    
    totalQuestions = 10;
    currentQuestion = 0;
    score = 0;
    loadNextQuestion();
}

// Load next question
function loadNextQuestion() {
    if (currentQuestion >= totalQuestions) {
        showCompletionScreen();
        return;
    }

    // Random game mode selection
    const modes = ['multipleChoice', 'fillBlank', 'matchPairs', 'typing', 'translate'];
    gameMode = modes[Math.floor(Math.random() * modes.length)];

    // Update progress
    updateProgress();

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

    // Reset buttons
    document.getElementById('checkButton').classList.remove('hidden');
    document.getElementById('continueButton').classList.add('hidden');
    document.getElementById('checkButton').disabled = false;
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('lessonProgress').style.width = progress + '%';
}

// Multiple Choice Game
function loadMultipleChoice() {
    const word = getRandomWord();
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
            <div class="text-cyan-300 text-lg mb-4 font-bold">What does this mean? 🤔</div>
            <div class="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">${word.italian}</div>
            <div class="text-blue-200 text-xl italic mb-6">${word.pronunciation}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian}')">
                <i class="fa-solid fa-volume-high text-2xl text-cyan-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <div class="space-y-4">
            ${choices.map(choice => `
                <button class="w-full p-6 glass rounded-full text-white text-xl font-bold text-center hover:bg-white/10 hover:scale-105 transition-all border-4 border-white/10 hover:border-cyan-400/50 group shadow-lg" onclick="selectChoice(this, '${choice}')">
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

    const words = [word.english];
    while (words.length < 6) {
        const randomWord = getRandomWord();
        if (!words.includes(randomWord.english)) {
            words.push(randomWord.english);
        }
    }
    shuffleArray(words);

    const html = `
        <div class="question-container">
            <div class="question-prompt">Fill in the blank</div>
            <div class="sentence-container">
                <div class="question-text">"${word.italian}" means:</div>
                <div class="blank-space" id="blankSpace">___</div>
            </div>
            <div class="pronunciation">${word.pronunciation}</div>
        </div>
        <div class="word-bank">
            ${words.map(w => `
                <button class="word-chip" onclick="fillBlank(this, '${w}')">${w}</button>
            `).join('')}
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
}

// Match Pairs Game
function loadMatchPairs() {
    const words = [];
    for (let i = 0; i < 4; i++) {
        words.push(getRandomWord());
    }

    const leftColumn = words.map(w => w.italian);
    const rightColumn = words.map(w => w.english);
    shuffleArray(rightColumn);

    currentAnswer = words; // Store for checking

    const html = `
        <div class="question-container">
            <div class="question-prompt">Match the pairs</div>
        </div>
        <div class="match-container">
            <div class="match-column">
                ${leftColumn.map((word, i) => `
                    <div class="match-card" data-italian="${word}" onclick="selectMatch(this, 'left', ${i})">
                        ${word}
                    </div>
                `).join('')}
            </div>
            <div class="match-column">
                ${rightColumn.map((word, i) => `
                    <div class="match-card" data-english="${word}" onclick="selectMatch(this, 'right', ${i})">
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

    const html = `
        <div class="text-center mb-8">
            <div class="text-cyan-300 text-xl mb-4 font-bold">⌨️ Type the Italian word ⌨️</div>
            <div class="text-5xl font-black text-white mb-4">${word.english}</div>
            <div class="text-blue-300 text-lg italic mb-6">Pronunciation: ${word.pronunciation}</div>
            <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian}')">
                <i class="fa-solid fa-volume-high text-2xl text-cyan-400 group-hover:scale-125 transition-transform"></i>
            </button>
        </div>
        <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-cyan-400/30 focus:border-cyan-400 focus:outline-none placeholder-slate-500 shadow-2xl" id="typingInput" placeholder="Type here..." autocomplete="off">
    `;

    document.getElementById('gameArea').innerHTML = html;
    document.getElementById('typingInput').focus();
}

// Translate Question
function loadTranslate() {
    const word = getRandomWord();
    const direction = Math.random() > 0.5 ? 'toItalian' : 'toEnglish';
    
    if (direction === 'toItalian') {
        currentAnswer = word.italian.toLowerCase();
        const html = `
            <div class="text-center mb-8">
                <div class="text-cyan-300 text-xl mb-4 font-bold">🇮🇹 Translate to Italian 🇮🇹</div>
                <div class="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">${word.english}</div>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-green-400/30 focus:border-green-400 focus:outline-none placeholder-slate-500 shadow-2xl" id="typingInput" placeholder="Type in Italian..." autocomplete="off">
        `;
        document.getElementById('gameArea').innerHTML = html;
    } else {
        currentAnswer = word.english.toLowerCase();
        const html = `
            <div class="text-center mb-8">
                <div class="text-cyan-300 text-xl mb-4 font-bold">🇬🇧 Translate to English 🇬🇧</div>
                <div class="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">${word.italian}</div>
                <div class="text-blue-300 text-lg italic mb-6">${word.pronunciation}</div>
                <button class="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all mx-auto group border-2 border-blue-400/30 shadow-lg" onclick="speakItalian('${word.italian}')">
                    <i class="fa-solid fa-volume-high text-2xl text-cyan-400 group-hover:scale-125 transition-transform"></i>
                </button>
            </div>
            <input type="text" class="w-full p-6 glass rounded-full text-white text-2xl text-center font-bold border-4 border-blue-400/30 focus:border-blue-400 focus:outline-none placeholder-slate-500 shadow-2xl" id="typingInput" placeholder="Type in English..." autocomplete="off">
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
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

// Game Interactions
function selectChoice(button, choice) {
    // Disable check button for multiple choice since we auto-check
    document.getElementById('checkButton').disabled = true;
    
    // Remove previous selections
    document.querySelectorAll('button').forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes('selectChoice')) {
            btn.style.pointerEvents = 'none';
        }
    });

    if (choice === currentAnswer) {
        button.className = 'w-full p-6 rounded-full text-white text-xl font-black text-center border-4 border-green-500 bg-gradient-to-r from-green-500/50 to-emerald-600/50 animate-correct shadow-2xl shadow-green-500/50';
        score++;
        setTimeout(() => showFeedback(true), 500);
    } else {
        button.className = 'w-full p-6 rounded-full text-white text-xl font-black text-center border-4 border-red-500 bg-gradient-to-r from-red-500/50 to-red-600/50 animate-shake shadow-2xl shadow-red-500/50';
        setTimeout(() => showFeedback(false), 500);
    }
}

function fillBlank(button, word) {
    document.getElementById('blankSpace').textContent = word;
    button.classList.add('used');
    
    // Disable check button
    document.getElementById('checkButton').disabled = true;
    
    if (word === currentAnswer) {
        button.classList.add('bg-green-500/30', 'border-green-500');
        score++;
        setTimeout(() => showFeedback(true), 500);
    } else {
        button.classList.add('bg-red-500/30', 'border-red-500');
        setTimeout(() => showFeedback(false), 500);
    }
}

function selectMatch(card, side, index) {
    if (card.classList.contains('matched')) return;
    
    // Disable check button during match pairs
    document.getElementById('checkButton').disabled = true;

    // Deselect previous in same column
    document.querySelectorAll(`.match-column .match-card.selected`).forEach(c => {
        if (c.parentElement === card.parentElement) {
            c.classList.remove('selected');
        }
    });

    card.classList.add('selected');
    window.matchState[side] = card;

    // Check if both sides selected
    if (window.matchState.left && window.matchState.right) {
        const italian = window.matchState.left.dataset.italian;
        const english = window.matchState.right.dataset.english;

        const match = currentAnswer.find(w => w.italian === italian && w.english === english);
        
        if (match) {
            window.matchState.left.classList.add('matched');
            window.matchState.right.classList.add('matched');
            window.matchState.matches.push(match);
            
            if (window.matchState.matches.length === 4) {
                score++;
                setTimeout(() => showFeedback(true), 500);
            }
        } else {
            setTimeout(() => {
                window.matchState.left.classList.remove('selected');
                window.matchState.right.classList.remove('selected');
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
            input.classList.remove('border-cyan-400/30', 'border-blue-400/30', 'border-green-400/30');
            input.classList.add('border-green-500', 'bg-green-500/20');
            score++;
            setTimeout(() => showFeedback(true), 500);
        } else {
            input.classList.remove('border-cyan-400/30', 'border-blue-400/30', 'border-green-400/30');
            input.classList.add('border-red-500', 'bg-red-500/20', 'animate-shake');
            setTimeout(() => showFeedback(false), 500);
        }
    }
}

// Continue to next question
function continueLesson() {
    currentQuestion++;
    loadNextQuestion();
}

function showFeedback(correct) {
    const checkBtn = document.getElementById('checkButton');
    const continueBtn = document.getElementById('continueButton');
    
    checkBtn.classList.add('hidden');
    continueBtn.classList.remove('hidden');
    
    // Show encouraging message
    if (correct) {
        continueBtn.innerHTML = '🎉 AWESOME! Continue <i class="fas fa-arrow-right ml-2"></i>';
    } else {
        continueBtn.innerHTML = '💪 Keep Going! <i class="fas fa-arrow-right ml-2"></i>';
    }
}

// Completion Screen
function showCompletionScreen() {
    const xpEarned = score * 10;
    const accuracy = Math.round((score / totalQuestions) * 100);

    const html = `
        <div class="text-center space-y-8">
            <div class="text-8xl animate-bounce">🎉</div>
            <h2 class="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">Lesson Complete!</h2>
            <div class="text-6xl font-bold text-yellow-400 animate-pulse">+${xpEarned} XP ⭐</div>
            
            <div class="grid grid-cols-3 gap-4 mt-8">
                <div class="glass p-6 rounded-full border-4 border-cyan-400/30 hover:scale-110 transition-transform shadow-lg">
                    <div class="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">${score}/${totalQuestions}</div>
                    <div class="text-cyan-300 text-sm mt-2 font-bold">Correct</div>
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
            
            <button class="w-full py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-black text-xl shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 mt-8 border-4 border-green-400/30" onclick="window.location.href='modules-gameboard.html'">
                CONTINUE TO NEXT LESSON 🚀 <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    `;

    document.getElementById('gameArea').innerHTML = html;
    document.getElementById('checkButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
    
    // Update XP in localStorage
    const currentXP = parseInt(localStorage.getItem('userXP') || '0');
    localStorage.setItem('userXP', currentXP + xpEarned);
}

// Start the lesson when page loads
window.addEventListener('load', initLesson);
