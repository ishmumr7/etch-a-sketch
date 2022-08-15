const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'color';

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

let clear = document.querySelector('#clear');
let gridSize = document.querySelector('#grid-size');

clear.addEventListener('click', clearGrid)
gridSize.addEventListener('click', changeSize);

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
    sketchpad.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr)`);
    // sketchpad.setAttribute('style', `grid-template-rows: repeat(${size}, 1fr)`);

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
    
}

function emptyGrid() {
    let container = document.querySelector('.sketchpad-container');
    container.innerText = '';
}

function clearGrid() {
    let grids = document.querySelectorAll('.sketchpad .pixel');
    grids.forEach(grid => {
        grid.style.backgroundColor = 'white';
    });
}

function changeSize() {
    let input;
    while (true) {
        input = prompt('Enter number of squares: ');
        if (isNaN(input)) {
            alert("Not a number!");
        } else if (input > 0 && input <= 100) {
            size = parseInt(input);
            break;
        } else {
            alert("Number must be between 1 and 100!");
        }
    }
    console.log(size);
    emptyGrid();
    createGrid(size);
}

createGrid(size);