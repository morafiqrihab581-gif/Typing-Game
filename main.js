const sentences = [
  "JavaScript is one of the most popular programming languages.",
  "Frontend developers build beautiful user interfaces.",
  "Practice typing every day to improve your speed.",
  "React makes building web applications easier.",
  "Coding is fun when you understand the logic.",
  "Web development includes HTML CSS and JavaScript."
];

const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const restartBtn = document.getElementById("restart-btn");

let currentSentence = "";
let time = 60;
let interval;

let correctChars = 0;
let totalChars = 0;

let isPlaying = false;

// Random sentence
function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

// Show sentence
function showSentence() {

    currentSentence = getRandomSentence();

    wordDisplay.innerHTML = "";

    currentSentence.split("").forEach(char => {

        const span = document.createElement("span");

        span.innerText = char;

        wordDisplay.appendChild(span);
    });
}

// Start game
function startGame() {

    isPlaying = true;

    time = 60;

    correctChars = 0;
    totalChars = 0;

    inputBox.disabled = false;

    inputBox.value = "";

    inputBox.focus();

    timeEl.textContent = time;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;

    showSentence();

    clearInterval(interval);

    interval = setInterval(updateTime, 1000);
}

// Timer
function updateTime() {

    time--;

    timeEl.textContent = time;

    updateStats();

    if (time === 0) {

        clearInterval(interval);

        isPlaying = false;

        inputBox.disabled = true;

        wordDisplay.innerHTML = "Game Over!";
    }
}

// Live WPM + Accuracy
function updateStats() {

    const elapsedMinutes = (60 - time) / 60;

    const wpm = elapsedMinutes > 0
        ? Math.round((correctChars / 5) / elapsedMinutes)
        : 0;

    const accuracy = totalChars > 0
        ? Math.round((correctChars / totalChars) * 100)
        : 100;

    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
}

// Typing logic
inputBox.addEventListener("input", () => {

    if (!isPlaying) return;

    const typedText = inputBox.value;

    const spans = wordDisplay.querySelectorAll("span");

    correctChars = 0;
    totalChars = typedText.length;

    spans.forEach((span, index) => {

        const typedChar = typedText[index];

        if (typedChar == null) {

            span.classList.remove("correct");
            span.classList.remove("incorrect");

        } else if (typedChar === span.innerText) {

            span.classList.add("correct");
            span.classList.remove("incorrect");

            correctChars++;

        } else {

            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    updateStats();

    // Sentence completed
    if (typedText === currentSentence) {

        inputBox.value = "";

        showSentence();
    }
});

// Restart
restartBtn.addEventListener("click", startGame);

// Auto start
startGame();