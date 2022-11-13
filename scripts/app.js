function init() {
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
  const cells = [];
  const levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let frogPosition = 94;
  let goalPosition;
  let lives = 2;
  numberOfLives.textContent = lives;

  const width = 10;
  const cellCount = width * width;

  function beginnerLevel() {
    function createGrid() {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.setAttribute = ("data-index", i);
        grid.appendChild(cell);
        cells.push(cell);
        pageSetUp.style.flexDirection = "row";
        infoBox.classList.add("playing");
      }
    }
    createGrid();
    disableBtns();
    currentLevel.textContent = "Beginner";
    addObj(frogPosition, "frog");
    levelComplete();
    movement(70, "guard", 79, 70, 1, 700);
    movement(46, "mask", 59, 40, 1, 200);
    movement(12, "boss", 28, 10, 2, 700);
  }

  function intermediateLevel() {
    function createGrid() {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        // could add if statement to create the data-row;
        cell.setAttribute = ("data-index", i);
        grid.appendChild(cell);
        cells.push(cell);
        pageSetUp.style.flexDirection = "row";
        infoBox.classList.add("playing");
      }
    }
    createGrid();
    currentLevel.textContent = "Intermediate";
    disableBtns();
    addObj(frogPosition, "frog");
    levelComplete();
    movement(90, "guard", 99, 80, 1, 500, go);
    movement(79, "guard", 79, 50, -1, 500, go1);
    movement(55, "mask", 99, 0, 11, 600, go2);
    movement(35, "boss", 39, 20, 2, 600, go3);
  }

  function expertLevel() {
    function createGrid() {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        // could add if statement to create the data-row;
        cell.setAttribute = ("data-index", i);
        grid.appendChild(cell);
        cells.push(cell);
        pageSetUp.style.flexDirection = "row";
        infoBox.classList.add("playing");
      }
    }
    createGrid();
    currentLevel.textContent = "Expert!";
    disableBtns();
    addObj(frogPosition, "frog");
    levelComplete();
    movement(54, "guard", 94, 4, 10, 400, go);
    movement(9, "mask", 90, 9, 9, 500, go1);
    movement(10, "boss", 19, 10, 1, 650, go2);
    movement(47, "doll", 59, 40, 4, 700, go3);
  }

  function disableBtns() {
    beginner.disabled = true;
    intermediate.disabled = true;
    expert.disabled = true;
    reload.innerHTML = "Back to Home!";
  }

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

  // let go;
  // let go1;
  // let go2;
  // let go3;
  function movement(
    position,
    item,
    endPosition,
    startPosition,
    distance,
    interval
    // variable
  ) {
    // variable =
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
      if (lives === 0 || collision(position, "frog")) {
        clearInterval(variable);
      }
    }, interval);
  }

  function collision(position, item) {
    if (cells[position].classList.contains(item)) {
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
      reload.textContent = "Well done! See if you can win again!";
    }
  }
  function finishLevel() {
    if (frogPosition === goalPosition) {
      stopGame();
    }
  }

  function reloadPage() {
    window.location.reload();
  }

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
