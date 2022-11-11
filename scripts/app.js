function init() {
  const start = document.querySelector(".start");
  const grid = document.querySelector(".grid");
  const cells = [];
  levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let frogPosition = 94;
  let guardPosition = 70;
  let maskPosition = 46;

  const width = 10;
  const cellCount = width * width;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
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
    levelComplete();
    movement(guardPosition, "guard", 79, 70, 700);
    movement(maskPosition, "mask", 59, 40, 100);
  }

  function levelComplete() {
    let goalPosition = Math.floor(Math.random() * levelGoal.length);
    cells[goalPosition].classList.add("goal");
  }

  function addObj(position, item) {
    cells[position].classList.add(item);
  }

  function removeObj(position, item) {
    cells[position].classList.remove(item);
  }

  function moveFrog(e) {
    removeFrog(frogPosition);
    const x = frogPosition % width;
    const y = Math.floor(frogPosition / width);
    switch (e.keyCode) {
      case 37:
        if (x > 0) frogPosition--;
        break;
      case 38:
        if (y > 0) frogPosition -= width;
        break;
      case 39:
        if (x < width - 1) frogPosition++;
        break;
      case 40:
        if (y < width - 1) frogPosition += width;
    }
    addFrog(frogPosition);
  }

  // let go;
  function movement(position, item, endPosition, startPosition, interval) {
    setInterval(() => {
      if (position < endPosition) {
        position++;
        addObj(position, item);
        setTimeout(() => {
          removeObj(position - 1, item);
        }, interval - 100);
      } else if (position === endPosition) {
        removeObj(position, item);
        position = startPosition;
        addObj(position, item);
      }
    }, interval);
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
