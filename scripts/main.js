const sketchPad = document.querySelector('.sketchPad');
let size = 16 * 16;
for (let i = 0; i < size; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.classList.add('default');
    grid.setAttribute('style', `height: 37.5px; width: 37.5px; border: 1px solid grey;`);
    sketchPad.appendChild(grid);
}

const gridList = document.querySelectorAll('.grid');
gridList.forEach((squareGrid) => {
    squareGrid.addEventListener('mouseover', (e) => {
        e.target.classList.toggle('hoverColor');
    });
    squareGrid.addEventListener('mouseout', (e) => {
        e.target.classList.toggle('hoverColor');
    });
});