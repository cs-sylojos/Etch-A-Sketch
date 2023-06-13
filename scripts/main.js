const sketchPad = document.querySelector('.sketchPad');
const sizeSelection = document.querySelector('.size');

let sizeInput = "16";
let canvasSize = Number(sizeInput);
let previousSize;
let isSketchPadUpdate = true;

updateSketchPad();
hoverEffect();

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
        let gridDimension = 600 / canvasSize;
        for (let i = 0; i < size; i++) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.classList.add('default');
            grid.setAttribute('style', `height: ${gridDimension}px; width: ${gridDimension}px; border: 1px solid grey;`);
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
    }
    isSketchPadUpdate = false;
});