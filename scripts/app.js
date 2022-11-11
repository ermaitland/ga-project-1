function init() {
  const grid = document.querySelector(".grid");
  const cells = [];
  let frogPosition = 94;
  let obj1Position = 70;

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

  function addFrog(frogPosition) {
    cells[frogPosition].classList.add("frog");
    console.log("frog Added to" + frogPosition);
  }
  addFrog(frogPosition);

  function removeFrog(frogPosition) {
    cells[frogPosition].classList.remove("frog");
    console.log("frog removed from" + frogPosition);
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

  function addObj1(position) {
    cells[position].classList.add("guard");
  }
  addObj1(obj1Position);

  function removeObj1(position) {
    cells[position].classList.remove("guard");
  }
  // removeObj1(obj1Position1);

  function guardMovement() {
    setInterval(() => {
      if (obj1Position + 1 < 80) {
        obj1Position++;
        addObj1(obj1Position);
        setTimeout(() => {
          removeObj1(obj1Position - 1);
        }, 1990);
      } else if (obj1Position === 79) {
        obj1Position = 70;
        addObj1(obj1Position);
        setTimeout(() => {
          removeObj1(79);
        }, 2000);
      }
    }, 2000);
  }
  guardMovement();

  function collision() {
    if (frogPosition === obj1Position) {
      cells[frogPosition].classList.remove("frog");
      cells[obj1Position].classList.remove("guard");
      cells[frogPosition].classList.add("collision");
    }
  }
  collision();

  document.addEventListener("keyup", moveFrog);
}
window.addEventListener("DOMContentLoaded", init);
