function init() {
  // ! Variables
  const beginner = document.querySelector(".beginner");
  const intermediate = document.querySelector(".intermediate");
  const expert = document.querySelector(".expert");
  const grid = document.querySelector(".grid");
  const numberOfLives = document.querySelector(".lives");
  const currentLevel = document.querySelector(".current-level");
  const pageSetUp = document.querySelector(".page-layout");
  const infoBox = document.querySelector(".infomation-box");
  const changeableInfo = document.querySelector(".phase-in-out-info");
  const reload = document.querySelector(".reload");
  const loadMusic = document.querySelector("#load-music");
  const audioElement = document.querySelector("#game-playing");
  const logoMusic = document.querySelector(".logo");
  const cells = [];
  const levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let frogPosition = 94;
  let goalPosition;
  let lives = 2;
  numberOfLives.textContent = lives;

  const width = 10;
  const cellCount = width * width;

  // ! Create Grid

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute = ("data-index", i);
      grid.appendChild(cell);
      cells.push(cell);
      pageSetUp.style.flexDirection = "row";
      infoBox.classList.add("playing");
      logoMusic.style.display = "none";
    }
  }

  // ! Function to start Game

  function startGame() {
    createGrid();
    addObj(frogPosition, "frog");
    levelComplete();
    beginner.disabled = true;
    intermediate.disabled = true;
    expert.disabled = true;
    reload.innerHTML = "Back to Home!";
    backgroundPlayingMusic();
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

  // ! Create the objects

  function levelComplete() {
    goalPosition = Math.floor(Math.random() * levelGoal.length);
    cells[goalPosition].classList.add("goal");
  }

  function addObj(position, item) {
    cells[position].classList.add(item);
  }

  function removeObj(position, item) {
    cells[position].classList.remove(item);
  }

  // ! Move the Objects

  function moveFrog(e) {
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

  // ! Different Levels

  function beginnerLevel() {
    startGame();
    currentLevel.textContent = "Beginner";
    movement(70, "guard", 79, 70, 1, 700);
    movement(72, "guard", 79, 70, 1, 700);
    movement(36, "mask", 49, 30, 1, 200);
    movement(12, "boss", 28, 10, 2, 700);
  }

  function intermediateLevel() {
    beginnerLevel();
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
    movement(47, "doll", 59, 40, 1, 100);
  }

  // ! Collisions / complete game

  function collision(position, item) {
    if (cells[position].classList.contains(item)) {
      cells[position].classList.remove(item);
      cells[position].classList.add("collision");
      setTimeout(() => {
        cells[position].classList.remove("collision");
      }, 1000);
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
  }

  function stopGame() {
    grid.style.display = "none";
    changeableInfo.style.display = "none";
    if (lives === 0) {
      const gameOverMessage = document.createElement("h1");
      pageSetUp.appendChild(gameOverMessage);
      gameOverMessage.classList.add("alert");
      gameOverMessage.textContent = "GameOver!";
      pageSetUp.classList.add("doll-img");
      reload.innerHTML = "Unlucky - Try again!";
    } else {
      const completedMsg = document.createElement("h1");
      pageSetUp.appendChild(completedMsg);
      completedMsg.classList.add("alert");
      completedMsg.textContent = "Congratulations! You completed the level!";
      pageSetUp.classList.add("celebrate");
      reload.textContent = "Well done! See if you can win again!";
    }
  }
  function finishLevel() {
    if (frogPosition === goalPosition) {
      stopGame();
    }
  }

  // ! Reload page & assign Event Listeners

  function reloadPage() {
    window.location.reload();
  }

  logoMusic.addEventListener("click", homeMusic);
  reload.addEventListener("click", reloadPage);
  beginner.addEventListener("click", beginnerLevel);
  intermediate.addEventListener("click", intermediateLevel);
  expert.addEventListener("click", expertLevel);
  document.addEventListener("keyup", moveFrog);
}
window.addEventListener("DOMContentLoaded", init);

// function addObj2(position) {
//   cells[position].classList.add("mask");
// }
// addObj1(obj1Position);

// function removeObj2(position) {
//   cells[position].classList.remove("mask");
// }
// removeObj1(obj1Position1);

// function maskMovement() {
//   setInterval(() => {
//     if (obj2Position + 1 < 50) {
//       obj2Position++;
//       addObj2(obj2Position);
//       setTimeout(() => {
//         removeObj2(obj2Position - 1);
//       }, 990);
//     } else if (obj2Position === 49) {
//       obj2Position = 40;
//       addObj2(obj2Position);
//       setTimeout(() => {
//         removeObj2(49);
//       }, 1000);
//     }
//   }, 1000);
// }

// doll = [0,2,4];
//  function renderdoll(position){
//   doll.forEach(doll) => cells[doll]classList.add('doll');
//   };

//   setInterval(() => {
//     remove.doll(doll);
//     if((doll[doll.length -1] +2) >9){
//       doll.pop();
//       doll.unshift(0);
//     }else {
//       doll = doll.map((i)=> i+ 2)
//     }
//   })
