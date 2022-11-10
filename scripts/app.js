function init() {
  const grid = document.querySelector(".grid");
  const cells = [];

  const width = 10;
  const cellCount = width * width - 4;

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
      grid.appendChild(cell);
      cells.push(cell);
    }
  }
  createGrid();

  function frogPosition(numberOfCell) {
    cells[numberOfCell].classList.add("frog");
  }
  frogPosition(91);
}
window.addEventListener("DOMContentLoaded", init);
