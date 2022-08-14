const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'black';

let size = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;

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
    if (mode === 'black') {
        this.style.backgroundColor = DEFAULT_COLOR;
    }
    
}

createGrid(size);