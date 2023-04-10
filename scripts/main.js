const sketchPad = document.querySelector('.sketchPad');
let gridNumber = 16;
for (let i = 0; i < gridNumber * gridNumber; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.setAttribute('style', `background-color: black; height: 37.5px; width: 37.5px; border: 1px solid white;`);
    sketchPad.appendChild(grid);
}