function init() {
  const start = document.querySelector(".start");
  const grid = document.querySelector(".grid");
  const cells = [];
  const levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let frogPosition = 94;
  let guardPosition = 70;
  let maskPosition = 46;
  let bossPosition = 12;
  let goalPosition;
  let lives = 2;

  const width = 10;
  const cellCount = width * width;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute = ("data-index", i);
      grid.appendChild(cell);
      cells.push(cell);
    }
  }
  createGrid();

  function startGame() {
    start.disabled = true;
    addObj(frogPosition, "frog");
    addObj(guardPosition, "guard");
    addObj(maskPosition, "mask");
    addObj(bossPosition, "boss");
    levelComplete();
    movement(guardPosition, "guard", 79, 70, 1, 700);
    movement(maskPosition, "mask", 58, 40, 2, 100);
    movement(bossPosition, "boss", 28, 10, 2, 700);
  }
  function stopGame() {
    if (lives === 0);
    {
      const gameOverMessage = document.createElement("h1");
      gameOverMessage.textContent = "GameOver!";
    }
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
        collision(frogPosition, "guard");
        collision(frogPosition, "boss");
        collision(frogPosition, "mask");
        break;
      case 38:
        if (y > 0) frogPosition -= width;
        finishLevel();
        collision(frogPosition, "guard");
        collision(frogPosition, "boss");
        collision(frogPosition, "mask");
        break;
      case 39:
        if (x < width - 1) frogPosition++;
        finishLevel();
        collision(frogPosition, "guard");
        collision(frogPosition, "boss");
        collision(frogPosition, "mask");
        break;
      case 40:
        if (y < width - 1) frogPosition += width;
        finishLevel();
        collision(frogPosition, "guard");
        collision(frogPosition, "boss");
        collision(frogPosition, "mask");
        break;
      default:
        console.log("unidentified move");
    }
    addObj(frogPosition, "frog");
  }

  let go;
  function movement(
    position,
    item,
    endPosition,
    startPosition,
    distance,
    interval
  ) {
    go = setInterval(() => {
      if (position < endPosition) {
        position = position + distance;
        addObj(position, item);
        collision(position, "frog");
        setTimeout(() => {
          removeObj(position - distance, item);
        }, interval - 100);
      } else if (position === endPosition) {
        removeObj(position, item);
        position = startPosition;
        addObj(position, item);
        collision(position, "frog");
      }
    }, interval);
  }

  function finishLevel() {
    if (frogPosition === goalPosition) {
      alert("You've completeled the level!");
    }
  }

  function collision(position, item) {
    if (cells[position].classList.contains(item)) {
      cells[position].classList.add("collision");
      lives--;
    }
  }

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

  start.addEventListener("click", startGame);
  document.addEventListener("keyup", moveFrog);
}
window.addEventListener("DOMContentLoaded", init);
