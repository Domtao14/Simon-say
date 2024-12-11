// Array of square elements
const squares = [
    document.getElementById('square-1'),
    document.getElementById('square-2'),
    document.getElementById('square-3'),
    document.getElementById('square-4'),
    document.getElementById('square-5'),
    document.getElementById('square-6'),
    document.getElementById('square-7'),
    document.getElementById('square-8'),
    document.getElementById('square-9')
];

let sequence = [];
let userSequence = [];
let gameActive = false;
let score = 0; // ตัวแปรเก็บคะแนน

// Start Button
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);

// Message display
const messageDisplay = document.getElementById('message');

// Score display
const scoreDisplay = document.getElementById('score-display');

// Start Game Function
function startGame() {
    if (gameActive) return; // Avoid starting a new game if one is active
    gameActive = true;
    sequence = [];
    userSequence = [];
    score = 0; // รีเซ็ตคะแนนเมื่อเริ่มเกมใหม่
    scoreDisplay.textContent = `Score: ${score}`; // แสดงคะแนนที่รีเซ็ต
    messageDisplay.textContent = "Watch the sequence!";
    startButton.disabled = true; // Disable the start button during the game
    nextRound();
}

// Function to add a new square to the sequence and show the flashing pattern
function nextRound() {
    userSequence = [];
    const randomSquare = Math.floor(Math.random() * 9); // Random square index (0-8)
    sequence.push(randomSquare);
    console.log("Current sequence: ", sequence); // Log sequence for debugging
    flashSequence();
}

// Function to flash the sequence
function flashSequence() {
    let delay = 0;
    sequence.forEach((squareIndex, index) => {
        setTimeout(() => {
            flashSquare(squareIndex);
        }, delay);
        delay += 1000; // Add delay between flashes
    });
}

// Function to flash a single square
function flashSquare(index) {
    squares[index].classList.add('active');
    setTimeout(() => {
        squares[index].classList.remove('active');
    }, 500); // Flash duration
}

// Function to handle user click
squares.forEach((square, index) => {
    square.addEventListener('click', () => handleUserClick(index));
});

// Function to handle user's click
function handleUserClick(index) {
    if (!gameActive) return; // Ignore clicks if game is not active
    userSequence.push(index);
    flashSquare(index);

    // Check if the user's click is correct
    if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
        gameOver();
    } else {
        // If user sequence matches the game sequence
        if (userSequence.length === sequence.length) {
            score += 1; // เพิ่มคะแนนเมื่อผู้เล่นทำถูกต้อง
            scoreDisplay.textContent = `Score: ${score}`; // อัปเดตคะแนน
            setTimeout(() => {
                messageDisplay.textContent = "Correct! Next round!";
                nextRound();
            }, 1000);
        }
    }
}

// Function to end the game
function gameOver() {
    messageDisplay.textContent = "Game Over! You lost.";
    gameActive = false;
    startButton.disabled = false; // Enable the start button again
}
