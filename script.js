"use strict";

const runSound = new Audio("run.mp3");
const jumpSound = new Audio("jump.mp3");
const deadSound = new Audio("dead.mp3");

runSound.loop = true;

const boy = document.getElementById("boy");
const background = document.getElementById("background");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");
const endScreen = document.getElementById("endScreen");
const startScreen = document.getElementById("startScreen");
const endScore = document.getElementById("endScore");
const restartButton = document.getElementById("restartButton");

const BEST_SCORE_KEY = "red-hat-runner-best";
const GROUND_TOP = 450;
const JUMP_STEPS = 12;

let running = false;
let jumping = false;
let gameOverState = false;
let runTimer = null;
let jumpTimer = null;
let backgroundTimer = null;
let scoreTimer = null;
let blockTimer = null;
let moveBlockTimer = null;
let deadTimer = null;

let runFrame = 1;
let jumpFrame = 1;
let deadFrame = 1;
let playerTop = GROUND_TOP;
let backgroundX = 0;
let score = 0;
let blockId = 0;
let nextBlockLeft = 500;

bestScoreElement.textContent = String(Number(localStorage.getItem(BEST_SCORE_KEY)) || 0);

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => undefined);
}

function stopGameTimers() {
    [runTimer, jumpTimer, backgroundTimer, scoreTimer, blockTimer, moveBlockTimer, deadTimer]
        .forEach((timer) => timer && clearInterval(timer));

    runTimer = null;
    jumpTimer = null;
    backgroundTimer = null;
    scoreTimer = null;
    blockTimer = null;
    moveBlockTimer = null;
    deadTimer = null;
}

function startGame() {
    if (running || gameOverState) return;

    running = true;
    startScreen.classList.add("hidden");
    runSound.play().catch(() => undefined);

    runTimer = setInterval(animateRun, 100);
    backgroundTimer = setInterval(moveBackground, 40);
    scoreTimer = setInterval(updateScore, 100);
    blockTimer = setInterval(createBlock, 1300);
    moveBlockTimer = setInterval(moveBlocks, 40);
}

function animateRun() {
    runFrame = runFrame === 8 ? 1 : runFrame + 1;
    boy.src = `Run (${runFrame}).png`;
}

function moveBackground() {
    backgroundX -= 8;
    background.style.backgroundPositionX = `${backgroundX}px`;
}

function updateScore() {
    score += 1;
    scoreElement.textContent = String(score);
}

function startJump() {
    if (!running || jumping || gameOverState) return;

    jumping = true;
    clearInterval(runTimer);
    runTimer = null;
    runSound.pause();
    playSound(jumpSound);

    jumpFrame = 1;
    jumpTimer = setInterval(animateJump, 70);
}

function animateJump() {
    jumpFrame += 1;

    if (jumpFrame <= 6) {
        playerTop -= 38;
    } else {
        playerTop += 38;
    }

    boy.style.top = `${playerTop}px`;
    boy.src = `Jump (${jumpFrame <= 12 ? jumpFrame : 12}).png`;

    if (jumpFrame >= JUMP_STEPS) {
        clearInterval(jumpTimer);
        jumpTimer = null;
        jumping = false;
        playerTop = GROUND_TOP;
        boy.style.top = `${GROUND_TOP}px`;
        runFrame = 1;
        boy.src = "Run (1).png";

        if (running) {
            runTimer = setInterval(animateRun, 100);
            runSound.play().catch(() => undefined);
        }
    }
}

function createBlock() {
    if (!running) return;

    const block = document.createElement("div");
    block.className = "block";
    block.id = `block-${blockId++}`;

    const gap = Math.floor(Math.random() * 600) + 400;
    nextBlockLeft += gap;
    block.style.left = `${nextBlockLeft}px`;

    background.appendChild(block);
}

function moveBlocks() {
    if (!running) return;

    const blocks = background.querySelectorAll(".block");
    const playerRect = boy.getBoundingClientRect();

    blocks.forEach((block) => {
        const currentLeft = Number.parseInt(block.style.left || "0", 10);
        const newLeft = currentLeft - 8;
        block.style.left = `${newLeft}px`;

        if (newLeft < -120) {
            block.remove();
            return;
        }

        const blockRect = block.getBoundingClientRect();
        const horizontalCollision =
            playerRect.right - 20 > blockRect.left &&
            playerRect.left + 20 < blockRect.right;

        const verticalCollision = playerRect.bottom - 25 > blockRect.top;

        if (horizontalCollision && verticalCollision) {
            finishGame();
        }
    });
}

function finishGame() {
    if (gameOverState) return;

    gameOverState = true;
    running = false;
    jumping = false;
    stopGameTimers();

    runSound.pause();
    playSound(deadSound);

    deadFrame = 1;
    deadTimer = setInterval(animateDeath, 100);
}

function animateDeath() {
    deadFrame = Math.min(deadFrame + 1, 10);
    boy.style.top = `${GROUND_TOP}px`;
    boy.src = `Dead (${deadFrame}).png`;

    if (deadFrame === 10) {
        clearInterval(deadTimer);
        deadTimer = null;

        const best = Math.max(score, Number(localStorage.getItem(BEST_SCORE_KEY)) || 0);
        localStorage.setItem(BEST_SCORE_KEY, String(best));
        bestScoreElement.textContent = String(best);
        endScore.textContent = String(score);
        endScreen.classList.add("visible");
    }
}

function restartGame() {
    window.location.reload();
}

function handleKeyDown(event) {
    if (event.code === "Enter" && !running && !gameOverState) {
        startGame();
        return;
    }

    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (!running && !gameOverState) {
            startGame();
        } else {
            startJump();
        }
    }
}

document.addEventListener("keydown", handleKeyDown);
background.addEventListener("pointerdown", () => {
    if (!running && !gameOverState) {
        startGame();
    } else {
        startJump();
    }
});
restartButton.addEventListener("click", restartGame);

boy.style.top = `${GROUND_TOP}px`;
