const inputBox = document.getElementById('inputBox');
const overlayText = document.getElementById('overlay-text');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const resultElement = document.getElementById('result');
const liveSpeedElement = document.getElementById('wpm');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const paragraphs = [
    "Typing speed tests are essential to improving your accuracy and efficiency. Practice makes perfect!",
    "Developing good typing skills helps increase productivity and save time in daily tasks.",
    "Typing tests measure your ability to type quickly and accurately, making them great for skill-building."
];

let currentText = "";
let timeLeft = 30;
let timer;
let startTime = null;
let typedWords = 0;

// Theme toggle functionality
function toggleTheme() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.src = isDark ? 'sun-icon.png' : 'moon-icon.png';
}

themeToggle.addEventListener('click', toggleTheme);

function startTimer() {
    if (startTime) return;
    startTime = new Date();

    timer = setInterval(() => {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        timeLeft = 30 - elapsed;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            inputBox.disabled = true;
            resultElement.textContent = "Time is up!";
            alert("Time is up!");
        }
    }, 1000);
}

function resetTest() {
    inputBox.value = "";
    inputBox.disabled = false;
    timeLeft = 30;
    startTime = null;
    timerElement.textContent = timeLeft;
    resultElement.textContent = "";
    currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    renderOverlay();
    clearInterval(timer);
    liveSpeedElement.textContent = "0";
    typedWords = 0;
}

function renderOverlay() {
    overlayText.innerHTML = currentText
        .split("")
        .map((char, i) => `<span>${char}</span>`)
        .join("");
}

function updateTyping() {
    startTimer();

    const userInput = inputBox.value;
    let overlayHTML = "";
    let nextIndex = userInput.length;

    for (let i = 0; i < currentText.length; i++) {
        if (i < userInput.length) {
            if (userInput[i] === currentText[i]) {
                overlayHTML += `<span class="correct">${currentText[i]}</span>`;
            } else {
                overlayHTML += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else if (i === nextIndex) {
            overlayHTML += `<span class="next-char">${currentText[i]}</span>`;
        } else {
            overlayHTML += `<span>${currentText[i]}</span>`;
        }
    }

    overlayText.innerHTML = overlayHTML;

    const words = userInput.trim().split(/\s+/).length;
    const elapsed = (new Date() - startTime) / 1000;
    liveSpeedElement.textContent = elapsed > 0 ? Math.floor((words / elapsed) * 60) : 0;
}

inputBox.addEventListener('input', updateTyping);
restartButton.addEventListener('click', resetTest);

resetTest();
