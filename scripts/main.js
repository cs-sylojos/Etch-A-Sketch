const sketchPad = document.querySelector('.sketchPad');
const sizeSelection = document.querySelector('.size');
const rainbowBtn = document.querySelector('.rainbowToggle');
const colorPicker = document.querySelector('#colorPicker');
const eraseBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clearBoard');
const gridBtn = document.querySelector('.gridLineToggle');

let sizeInput = "16";
let canvasSize = Number(sizeInput);
let previousSize;
let isSketchPadUpdate = true;
let mouseDown = false;
let rainbowMode = false;
let red;
let green;
let blue;
let colorSelected = "black";
let eraseMode = false;
let gridMode = true;

updateSketchPad();
hoverEffect();
paint();

function resetSketchPad() {
    if (isSketchPadUpdate) {
        let numberOfGrid = previousSize * previousSize;
        const gridToRemove = document.querySelectorAll('.grid');
        for (let j = 0; j < numberOfGrid; j++) {
            gridToRemove.forEach((elementGrid) => {
                elementGrid.remove();
            });
        }
    }
}

function updateSketchPad() {
    if (isSketchPadUpdate) {
        let size = canvasSize * canvasSize;
        let gridDimension = (((sketchPad.clientWidth / canvasSize) / sketchPad.clientWidth) * 100).toFixed(4);
        for (let i = 0; i < size; i++) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.classList.add('default');
            if (gridMode) {
                grid.setAttribute('style', `height: ${gridDimension}%; width: ${gridDimension}%; border: 1px solid grey;`);
            } else {
                grid.setAttribute('style', `height: ${gridDimension}%; width: ${gridDimension}%;`);
            }
            sketchPad.appendChild(grid);
        }
    }
}

function hoverEffect() {
    const gridList = document.querySelectorAll('.grid');
    gridList.forEach((squareGrid) => {
        squareGrid.addEventListener('mouseover', (e) => {
            e.target.classList.toggle('hoverColor');
        });
        squareGrid.addEventListener('mouseout', (e) => {
            e.target.classList.toggle('hoverColor');
        });
    });
}

function paint() {
    const areaList = document.querySelectorAll('.grid');
    areaList.forEach((squareArea) => {
        squareArea.addEventListener('mouseover', (e) => {
            if (e.type === 'mouseover' && mouseDown) {
                if (rainbowMode) {
                    red = Math.floor(Math.random() * 256);
                    green = Math.floor(Math.random() * 256);
                    blue = Math.floor(Math.random() * 256);
                    e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
                } else if (eraseMode) {
                    e.target.style.removeProperty("background-color");
                } else {
                    e.target.style.backgroundColor = colorSelected;
                }
            }
        });
        squareArea.addEventListener('mousedown', (e) => {
            if (rainbowMode) {
                red = Math.floor(Math.random() * 256);
                green = Math.floor(Math.random() * 256);
                blue = Math.floor(Math.random() * 256);
                e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            } else if (eraseMode) {
                e.target.style.removeProperty("background-color");
            } else {
                e.target.style.backgroundColor = colorSelected;
            } 
        });
    });
}

function updateColorSelect(e) {
    colorSelected = e.target.value;
}

function updateColorDismiss(e) {
    colorSelected = e.target.value;
}

sizeSelection.addEventListener('click', () => {
    sizeInput = prompt("Please enter a number from 1 to 100", "16");
    if (sizeInput === null || sizeInput === "" || sizeInput.trim() === "") {
        sizeInput = canvasSize.toString();
        isSketchPadUpdate = false;
    } else if (Number(sizeInput.trim()) > 100) {
        alert("Size too big!");
        sizeInput = canvasSize.toString();
        isSketchPadUpdate = false;
    } else if (isNaN(Number(sizeInput.trim()))) {
        alert("Enter a number!");
        sizeInput = canvasSize.toString();
        isSketchPadUpdate = false;
    } else if (!Number.isInteger(Number(sizeInput.trim()))) {
        alert("Enter a whole number!");
        sizeInput = canvasSize.toString();
        isSketchPadUpdate = false;
    } else if (Number(sizeInput.trim()) >= 1 && Number(sizeInput.trim()) <= 100) {
        sizeInput = sizeInput.trim();
        isSketchPadUpdate = true;
    }
    previousSize = canvasSize;
    canvasSize = Number(sizeInput);
    resetSketchPad();
    updateSketchPad();
    if (isSketchPadUpdate) {
        hoverEffect();
        paint();
    }
    isSketchPadUpdate = false;
});

rainbowBtn.addEventListener('click', (e) => {
    rainbowMode = !rainbowMode;
    e.target.classList.toggle('rainbowOff');
    if (eraseMode) {
        eraseMode = false;
        eraseBtn.classList.remove("eraseOn");
    }
});

eraseBtn.addEventListener('click', (e) => {
    eraseMode = !eraseMode;
    e.target.classList.toggle('eraseOn');
    if (rainbowMode) {
        rainbowMode = false;
        rainbowBtn.classList.add("rainbowOff");
    }
});

clearBtn.addEventListener('click', () => {
    const tileList = document.querySelectorAll('.grid');
    tileList.forEach((tile) => {
        tile.style.removeProperty("background-color");
    });
});

gridBtn.addEventListener('click', (e) => {
    gridMode = !gridMode;
    e.target.classList.toggle('gridOn');
    const gridTileList = document.querySelectorAll('.grid');
    if (gridMode) {
        gridTileList.forEach((gridTile) => {
            gridTile.style.border = "1px solid grey";
        });
    } else {
        gridTileList.forEach((gridTile) => {
            gridTile.style.removeProperty("border");
        });
    }
});

window.addEventListener('mousedown', () => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

colorPicker.addEventListener("input", updateColorSelect, false);
colorPicker.addEventListener("change", updateColorDismiss, false);
colorPicker.select();