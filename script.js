// Initialize the Telegram WebApp
Telegram.WebApp.ready();

const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const usernameDisplay = document.getElementById('username');

// Get Telegram User Information
let username = 'Guest';
if (Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user) {
    username = Telegram.WebApp.initDataUnsafe.user.username || 'Guest';
} else {
    console.log("Telegram WebApp data not available. Make sure you are running this inside a Telegram Web App.");
}

// Display username
usernameDisplay.textContent = `Welcome, ${username}!`;

// Retrieve saved clicks from localStorage
let clickCount = localStorage.getItem(`click_count_${username}`) || 0;
clickCount = parseInt(clickCount, 10);
clickCountDisplay.textContent = `Clicks: ${clickCount}`;

// Handle button click
clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = `Clicks: ${clickCount}`;

    // Save click count to localStorage
    localStorage.setItem(`click_count_${username}`, clickCount);
});
