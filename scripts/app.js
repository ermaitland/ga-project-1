function init() {
  // ***** VARIABLES *****
  const beginner = document.querySelector(".beginner");
  const intermediate = document.querySelector(".intermediate");
  const expert = document.querySelector(".expert");
  const timed = document.querySelector(".against-clock");
  const grid = document.querySelector(".grid");
  const pageSetUp = document.querySelector(".page-layout");
  const infoBox = document.querySelector(".infomation-box");
  const changeableInfo = document.querySelector(".phase-in-out-info");
  const screen = document.querySelector(".timer-screen");
  const numberOfLives = document.querySelector(".lives");
  const reload = document.querySelector(".reload");
  const currentLevel = document.querySelector(".current-level");
  const musicCountdown = document.querySelector("#timer-music");
  const loadMusic = document.querySelector("#load-music");
  const audioElement = document.querySelector("#game-playing");
  const frogJump = document.querySelector("#frog-move");
  const collideNoise = document.querySelector("#explosion");
  const logoAndMusic = document.querySelector(".logo");
  const cells = [];
  const levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const glassFloor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let frogPosition = 94;
  let goalPosition;
  let fallThroughGlass;
  let lives = 2;
  numberOfLives.textContent = lives;
  const width = 10;
  const cellCount = width * width;

  // ***** CREATE GRID *****
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute = ("data-index", i);
      grid.appendChild(cell);
      cells.push(cell);
      pageSetUp.style.flexDirection = "row";
      pageSetUp.classList.add("play-grid");
      infoBox.classList.add("playing");
      logoAndMusic.style.display = "none";
    }
  }

  // ***** FUNCTIONS TO START GAME, RELOAD & MUSIC *****
  function startGame() {
    createGrid();
    addObj(frogPosition, "frog");
    levelCompleteGoal();
    weakGlass();
    beginner.disabled = true;
    intermediate.disabled = true;
    expert.disabled = true;
    timed.disabled = true;
    reload.innerHTML = "Back to Home!";
    reload.style.border = "1px white solid";
    backgroundPlayingMusic();
  }

  function reloadPage() {
    window.location.reload();
  }

  function reloadPageOnEnter(e) {
    switch (e.keyCode) {
      case 13:
        window.location.reload();
        break;
      default:
        console.log("No comand found");
    }
  }

  function homeMusic() {
    loadMusic.src = "./music/592876__sandermotions__green-light-red-light.mp3";
    loadMusic.play();
  }
  function backgroundPlayingMusic() {
    audioElement.src =
      "./music/592617__fnaf657ultimate__squid-game-pink-soldiers-music.wav";
    audioElement.play();
  }
  function countdownMusic() {
    musicCountdown.src =
      "./music/651011__therandomsoundbyte2637__final-countdown-timer.wav";
    musicCountdown.play();
  }
  function frogMusic() {
    frogJump.src = "./music/347167__davidsraba__bleep-sound.wav";
    frogJump.play();
  }
  function collisionMusic() {
    collideNoise.src = "./music/55819__sergenious__boom2.wav";
    collideNoise.play();
  }
  function stopMusic() {
    audioElement.pause();
    musicCountdown.pause();
  }

  // ***** CREATE THE OBJECTS/REMOVE THE OBJECTS *****
  function levelCompleteGoal() {
    goalPosition = Math.floor(Math.random() * levelGoal.length);
    cells[goalPosition].classList.add("goal");
  }

  function weakGlass() {
    fallThroughGlass = Math.floor(Math.random() * glassFloor.length);
    cells[fallThroughGlass + 50].classList.add("weakGlass");
  }

  function addObj(position, item) {
    cells[position].classList.add(item);
  }

  function removeObj(position, item) {
    cells[position].classList.remove(item);
  }

  // ***** MOVE THE OBJECTS *****
  function moveFrog(e) {
    frogMusic();
    removeObj(frogPosition, "frog");
    const x = frogPosition % width;
    const y = Math.floor(frogPosition / width);
    switch (e.keyCode) {
      case 37:
        if (x > 0) frogPosition--;
        finishLevel();
        frogCollision();
        break;
      case 38:
        if (y > 0) frogPosition -= width;
        finishLevel();
        frogCollision();
        break;
      case 39:
        if (x < width - 1) frogPosition++;
        finishLevel();
        frogCollision();
        break;
      case 40:
        if (y < width - 1) frogPosition += width;
        finishLevel();
        frogCollision();
        break;
      default:
        console.log("unidentified move");
    }
    addObj(frogPosition, "frog");
  }

  function movement(
    position,
    item,
    endPosition,
    startPosition,
    distance,
    interval
  ) {
    setInterval(() => {
      if (position <= endPosition - distance) {
        addObj(position, item);
        position = position + distance;
        addObj(position, item);
        collision(position, "frog");
        setTimeout(() => {
          removeObj(position - distance, item);
        }, interval - 50);
      } else {
        removeObj(position, item);
        position = startPosition;
        addObj(position, item);
        collision(position, "frog");
      }
    }, interval);
  }

  // ***** FUNCTIONS FOR DIFFERENT LEVELS *****
  function beginnerLevel() {
    startGame();
    currentLevel.textContent = "Beginner";
    movement(70, "guard", 79, 70, 1, 700);
    movement(72, "guard", 79, 70, 1, 700);
    movement(36, "mask", 49, 30, 1, 200);
    movement(41, "mask", 49, 30, 1, 200);
    movement(12, "boss", 28, 10, 2, 700);
  }

  function intermediateLevel() {
    beginnerLevel();
    currentLevel.textContent = "Intermediate";
    movement(86, "guard", 89, 80, 1, 500);
    movement(87, "guard", 89, 80, 1, 500);
    movement(60, "mask", 69, 60, 1, 100);
  }

  function expertLevel() {
    currentLevel.textContent = "Expert!";
    startGame();
    movement(64, "guard", 79, 60, 1, 300);
    movement(78, "guard", 79, 60, 1, 300);
    movement(71, "guard", 79, 60, 1, 300);
    movement(80, "mask", 89, 80, 1, 400);
    movement(86, "mask", 89, 80, 1, 400);
    movement(19, "boss", 19, 10, 1, 650);
    movement(15, "boss", 19, 10, 1, 650);
    movement(22, "boss", 29, 20, 1, 650);
    movement(47, "doll", 49, 30, 1, 100);
  }

  let count = 10;
  let counter;
  function againstTheClock() {
    currentLevel.textContent = "Beat the Clock!";
    intermediateLevel();
    countdownMusic();
    screen.innerHTML = `${count}`;
    counter = setInterval(() => {
      if (count >= 1) {
        count--;
        screen.innerHTML = `${count}`;
      } else {
        lives = 0;
        stopGame();
        clearInterval(counter);
      }
    }, 1000);
  }

  // ***** COLLISIONS / COMPLETE GAME *****
  function collision(position, item) {
    if (cells[position].classList.contains(item)) {
      cells[position].classList.remove(item);
      cells[position].classList.add("collision");
      collisionMusic();
      setTimeout(() => {
        cells[position].classList.remove("collision");
      }, 700);
      lives--;
      numberOfLives.textContent = lives;
      if (lives === 0) {
        stopGame();
      } else {
        removeObj(frogPosition, "frog");
        frogPosition = 94;
        addObj(frogPosition, "frog");
      }
    }
  }
  function frogCollision() {
    collision(frogPosition, "guard");
    collision(frogPosition, "doll");
    collision(frogPosition, "mask");
    collision(frogPosition, "boss");
    collision(frogPosition, "weakGlass");
  }

  function noLives() {
    if (lives === 0) {
      const gameOverMessage = document.createElement("h1");
      pageSetUp.appendChild(gameOverMessage);
      gameOverMessage.classList.add("alert");
      gameOverMessage.textContent = "GameOver!";
      pageSetUp.classList.add("doll-img");
      reload.classList.add("home-btn");
      reload.innerHTML = "Unlucky - Try again!";
      homeMusic();
    }
  }

  function winGame() {
    if (frogPosition === goalPosition) {
      const completedMsg = document.createElement("h1");
      pageSetUp.appendChild(completedMsg);
      completedMsg.classList.add("alert-win");
      completedMsg.textContent = "Congratulations! You completed the level!";
      pageSetUp.classList.add("celebrate");
      reload.classList.add("home-btn-win");
      reload.textContent = "Well done! See if you can win again!";
      homeMusic();
      clearInterval(counter);
    }
  }

  function stopGame() {
    grid.classList.remove("grid");
    changeableInfo.style.display = "none";
    stopMusic();
    noLives();
    winGame();
  }
  function finishLevel() {
    if (frogPosition === goalPosition) {
      stopGame();
      clearInterval(counter);
    }
  }

  // ***** ASSIGN EVENT LISTENER *****
  logoAndMusic.addEventListener("click", homeMusic);
  reload.addEventListener("click", reloadPage);
  document.addEventListener("keyup", reloadPageOnEnter);
  beginner.addEventListener("click", beginnerLevel);
  intermediate.addEventListener("click", intermediateLevel);
  expert.addEventListener("click", expertLevel);
  timed.addEventListener("click", againstTheClock);
  document.addEventListener("keyup", moveFrog);
}
window.addEventListener("DOMContentLoaded", init);
