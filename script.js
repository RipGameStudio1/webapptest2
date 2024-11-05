let currentUsername = null;
let clickCount = 0;
const dinoElement = document.getElementById('dino');
const clickCountElement = document.getElementById('click-count-number');
const usernameDisplay = document.getElementById('username-display');

// Initialize Telegram Login Button
window.TelegramLoginWidget = {
    data: {
        bot: 'YOUR_BOT_USERNAME', // e.g., MyClickerBot
        // You can also specify the element to render the widget in
        // element: document.getElementById('telegram-login-btn'),
        // ... Other config options (lang, etc.) ...
    }
};

// Handle User Data from Telegram
function onTelegramAuth(user) {
    currentUsername = user.username;
    usernameDisplay.innerText = `Logged in as: @${currentUsername}`;
    document.getElementById('telegram-login-btn').style.display = 'none';
    loadUserData();
    setupClicker();
}

function setupClicker() {
    dinoElement.addEventListener('click', () => {
        clickCount++;
        clickCountElement.innerText = clickCount;
        saveUserData();
    });
}

function loadUserData() {
    const storedData = localStorage.getItem(`clickerData_${currentUsername}`);
    if (storedData) {
        clickCount = parseInt(storedData);
        clickCountElement.innerText = clickCount;
    }
}

function saveUserData() {
    if (currentUsername) {
        localStorage.setItem(`clickerData_${currentUsername}`, clickCount);
    }
}

// Example: Simulate a click on the dino to start the game
// dinoElement.click(); // Uncomment to auto-start

// Handle Telegram Login Authorization
document.addEventListener('TelegramAuth', onTelegramAuth);

// Initialize without waiting for the library to load
if (window.Telegram) {
    const telegramAuth = new window.TelegramAuth(
        'YOUR_BOT_USERNAME', // Replace with your bot's username
        { 
            // Other initialization options if needed
        }
    );
}
