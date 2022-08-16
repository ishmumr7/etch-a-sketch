const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'color';

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

let selectedColor = document.querySelector('#colorVal');
let colorBtn = document.querySelector('#color');
let random = document.querySelector('#random');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
let gridSize = document.querySelector('#grid-size');

selectedColor.addEventListener('change', chooseColor);
colorBtn.addEventListener('click', selectColor);
random.addEventListener('click', selectRandom);
eraser.addEventListener('click', selectEraser);
clear.addEventListener('click', clearGrid);
gridSize.addEventListener('input', changeSize);

let body = document.querySelector('.body');

let isClicked = false;
body.addEventListener('mousedown', () => {
    isClicked = true;
})
body.addEventListener('mouseup', () => {
    isClicked = false;
})

function createGrid(size) {
    const container = document.querySelector('.sketchpad-container');
    let sketchpad = document.createElement('div');
    sketchpad.setAttribute('class', 'sketchpad');
    sketchpad.setAttribute('style',
        `grid-template-columns: repeat(${size}, 1fr)`);

    for (let i = 0; i < (size * size); i++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('class', 'pixel');
        pixel.addEventListener('mouseover', paint);
        pixel.addEventListener('mousedown', paint);
        sketchpad.appendChild(pixel);
    }
    container.appendChild(sketchpad);
}

function paint(e) {
    if (e.type === "mouseover" && !isClicked) {
        return;
    }
    if (mode === 'color') {
        this.style.backgroundColor = color;
    }
    if (mode === 'random') {
        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        this.style.backgroundColor = randomColor;
    }
    if (mode === 'eraser') {
        this.style.backgroundColor = 'white';
    }
}

function emptyGrid() {
    let container = document.querySelector('.sketchpad-container');
    container.innerText = '';
}

function chooseColor() {
    color = selectedColor.value;
}

function selectColor() {
    selectCurrentMode('color');
}

function selectRandom() {
    selectCurrentMode('random');
}

function selectEraser() {
    selectCurrentMode('eraser');
}

function clearGrid() {
    let grids = document.querySelectorAll('.sketchpad .pixel');
    grids.forEach(grid => {
        grid.style.backgroundColor = 'white';
    });
}

function changeSize() {
    size = this.value;
    emptyGrid();
    createGrid(size);
    updateSizeShow();
}

function selectCurrentMode(newMode) {
    if (mode === 'color') {
        colorBtn.classList.remove('current');
    } else if (mode === 'random') {
        random.classList.remove('current');
    } else if (mode === 'eraser') {
        eraser.classList.remove('current');
    }

    mode = newMode;

    if (mode === 'color') {
        colorBtn.classList.add('current');
    } else if (mode === 'random') {
        random.classList.add('current');
    } else if (mode === 'eraser') {
        eraser.classList.add('current');
    }
}

// Update grid size display
function updateSizeShow() {
    let sizeShow = document.querySelector('#size-show');
    sizeShow.innerHTML = size + " x " + size;
    
    gridSize.value = size;
}

createGrid(size);
updateSizeShow();