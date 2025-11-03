const colorPickerEl = document.querySelector("#color-picker");
const colorEl = document.querySelector("#color");
const eraserbutton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");
const sketchBoardEl = document.querySelector("#sketch-board");

function getSketchBoardSize() {
  const innerWidth = window.innerWidth;

  if (innerWidth >= 1024) return 52;
  else if (innerWidth >= 768) return 40;
  return 28;
}

function createSketchBoardGrid(size) {
  for (let i = 0; i < size; i++) {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    rowEl.style.display = "grid";
    rowEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let j = 0; j < size; j++) {
      const colEl = document.createElement("div");
      colEl.classList.add("col");
      rowEl.appendChild(colEl);
    }

    sketchBoardEl.appendChild(rowEl);
  }
}

const sketchBoardSize = getSketchBoardSize();
let isEraserSelected = false;

createSketchBoardGrid(sketchBoardSize);

colorPickerEl.style.backgroundColor = colorEl.value;
colorEl.addEventListener("input", (e) => {
  colorPickerEl.style.backgroundColor = colorEl.value;
});

eraserbutton.addEventListener("click", (e) => {
  e.stopPropagation();

  eraserbutton.classList.toggle("selected");
  isEraserSelected = !isEraserSelected;
});

clearButton.addEventListener("click", (e) => {
  e.stopPropagation();

  const coloredColEls = document.querySelectorAll(".col[style]");
  coloredColEls.forEach((colEl) => (colEl.removeAttribute("style")));
});

sketchBoardEl.addEventListener("mousedown", (e) => {
  e.stopPropagation();

  const targetEl = e.target;
  if (e.button === 0 && targetEl.classList.contains("col")) {
    if (isEraserSelected) {
      targetEl.removeAttribute("style");
    } else {
      targetEl.style.backgroundColor = colorEl.value;
    }
  }
});

sketchBoardEl.addEventListener("contextmenu", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const targetEl = e.target;

  if (targetEl.classList.contains("col")) {
    targetEl.removeAttribute("style");
  }
});

