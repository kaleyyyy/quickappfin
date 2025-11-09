# QuickLearn Italian - Cookie-Based Progress System

## Overview

QuickLearn Italian now uses a **cookie-based progress tracking system** that saves user progress without requiring a database like Firebase. This system provides persistent storage across sessions while maintaining user privacy and data portability.

## Features

### 🍪 Cookie Storage
- **Primary storage**: Uses browser cookies (1-year expiration)
- **Fallback**: localStorage for redundancy
- **Automatic migration**: Converts existing localStorage data to cookies
- **Cross-session**: Progress persists across browser sessions

### 📊 Tracked Data
- **User XP**: Total experience points earned
- **User Level**: Current level (calculated from XP)
- **Completed Lessons**: Each lesson with:
  - Score
  - Total questions
  - Accuracy percentage
  - Completion timestamp
  - Number of attempts
  
### 🔒 Privacy & Security
- No personal data collected
- All data stored locally in user's browser
- No external servers or databases
- User can export/delete data anytime

## Files Structure

```
quickappfin/
├── user-progress.js      # Cookie & progress management library
├── lesson-game.js        # Lesson game with progress tracking
├── progress.html         # Progress dashboard page
└── README_COOKIES.md     # This file
```

## Usage

### Including the Progress System

Add this to any HTML page that needs access to user progress:

```html
<script src="user-progress.js"></script>
```

### API Reference

#### UserProgress Methods

```javascript
// Initialize the system (called automatically)
UserProgress.init();

// Get user stats
const stats = UserProgress.getStats();
// Returns: { xp, level, lessonsCompleted, totalScore, totalQuestions, overallAccuracy }

// Complete a lesson
UserProgress.completeLesson('lesson1', 8, 10);

// Add XP
UserProgress.addXP(80); // Returns new total XP

// Check if lesson is completed
UserProgress.isLessonCompleted('lesson1'); // Returns boolean

// Get lesson statistics
UserProgress.getLessonStats('lesson1');
// Returns: { score, totalQuestions, accuracy, completedAt, attempts }

// Get all completed lessons
UserProgress.getAllCompletedLessons(); // Returns object

// Reset all progress (with confirmation)
UserProgress.resetProgress();

// Get current XP
UserProgress.getXP();

// Get current level
UserProgress.getLevel();
```

#### CookieManager Methods

```javascript
// Set a cookie
CookieManager.setCookie('name', value, 365); // 365 days expiration

// Get a cookie
const value = CookieManager.getCookie('name');

// Delete a cookie
CookieManager.deleteCookie('name');

// Check if cookies are enabled
CookieManager.areCookiesEnabled(); // Returns boolean
```

## How It Works

### 1. Initialization
When a page loads, `UserProgress.init()` is called automatically:
- Checks if cookies are enabled
- Migrates existing localStorage data to cookies (one-time)
- Sets up fallback to localStorage if cookies are disabled

### 2. Data Storage
Data is stored in two places for redundancy:
1. **Cookies** (primary): Persists across sessions, survives browser restarts
2. **localStorage** (backup): Used if cookies are disabled

### 3. Data Retrieval
When reading data:
1. First tries to read from cookies
2. Falls back to localStorage if cookies unavailable
3. Returns default value if neither has data

### 4. Level Calculation
- Each level requires 100 XP
- Level = Math.floor(XP / 100) + 1
- Example: 250 XP = Level 3

## Cookie Details

### Cookie Properties
- **Name format**: `userXP`, `userLevel`, `completedLessons`, etc.
- **Expiration**: 365 days
- **Path**: `/` (available site-wide)
- **SameSite**: `Lax` (security setting)
- **Storage format**: JSON-encoded

### Cookie Size
- Cookies are limited to ~4KB per cookie
- Current implementation uses multiple cookies for different data types
- Progress data typically uses < 2KB total

## Viewing Progress

Visit `/progress.html` to see:
- Total XP and current level
- Number of completed lessons
- Overall accuracy
- Detailed lesson history
- Storage system status
- Export/reset options

## Data Export

Users can export their progress as JSON:
1. Visit `/progress.html`
2. Click "Export Data"
3. Downloads `quicklearn-progress-YYYY-MM-DD.json`

Export includes:
- All statistics
- Complete lesson history
- Export timestamp

## Testing

### Test Cookie Storage
```javascript
// Check if cookies work
console.log('Cookies enabled:', CookieManager.areCookiesEnabled());

// Test setting/getting a cookie
CookieManager.setCookie('test', 'hello');
console.log('Cookie value:', CookieManager.getCookie('test'));
```

### Simulate Progress
```javascript
// Add XP
UserProgress.addXP(100);

// Complete a lesson
UserProgress.completeLesson('lesson1', 10, 10);

// View stats
console.log(UserProgress.getStats());
```

## Browser Compatibility

✅ **Supported Browsers:**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

⚠️ **Note:** Cookies must be enabled in browser settings

## Privacy Compliance

### GDPR Compliance
- No personal data collected
- All data stored locally
- User controls their data
- Easy data deletion

### User Rights
- **Right to access**: View all data in progress.html
- **Right to export**: Download data as JSON
- **Right to deletion**: Reset progress anytime
- **Right to portability**: Export/import JSON data

## Troubleshooting

### Progress Not Saving?
1. Check if cookies are enabled in browser
2. Check browser console for errors
3. Verify localStorage is not disabled
4. Try in incognito/private mode

### Data Lost After Browser Close?
1. Cookies may be set to "session only"
2. Check browser privacy settings
3. Ensure cookies aren't auto-deleted

### Can't See Progress on Progress Page?
1. Make sure `user-progress.js` is loaded
2. Check browser console for errors
3. Try refreshing the stats

## Future Enhancements

Potential improvements:
- [ ] Data compression for larger progress files
- [ ] Import progress from JSON
- [ ] Streak tracking
- [ ] Daily goals
- [ ] Achievement badges
- [ ] Cloud backup option (optional)

## Migration from localStorage

Existing users with localStorage data:
- Data automatically migrates to cookies on first load
- Both systems remain active for redundancy
- No user action required

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify cookies are enabled
3. Test with /progress.html page
4. Try clearing cookies and starting fresh

---

Made with ❤️ for language learners everywhere
