// get main div to store grid
const container = document.getElementById("grid-container");
// initialize the dimensions of the grid
let dimensions = 32;

// creates a div for each square in the grid and append to main div
function createGrid(dimensions) {
    for (let i = 0; i < dimensions ** 2; i++) {
        let square = document.createElement("div");
        square.classList.add('grid');
        square.setAttribute('id', `square-${i}`);
        container.appendChild(square);
    }
    container.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
    addSquares();
}

// Determines the corresponding pen style after option is clicked
function addColour(square, style) {
    if (style == "black") {
        square.style.backgroundColor = "rgb(0, 0, 0)";
    } else if (style == "grey") {
        square.style.backgroundColor = "rgb(127, 127, 127)";
    } else if (style == "gradient") {
        let rnd = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${rnd}, ${rnd}, ${rnd})`;
    } else if (style == "random") {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (style == "eraser") {
        square.style.backgroundColor = "rgb(255, 255, 255)"
    } else {
        clear();
    }
}

// when Clear Drawing is pressed it erases the grid and prompts the user 
// to change the dimensions of the grid
function clear() {
    for (let i = 0; i < dimensions ** 2; i++) {
        let square = document.getElementById(`square-${i}`);
        container.removeChild(square);
    }
    dimensions = prompt("Choose the dimensions of the grid (1 - 80)");
    if (Number(dimensions) === NaN) {
        dimensions = prompt("Choose the dimensions of the grid (1 - 80)");
    } else if (Number(dimensions) > 80) {
        dimensions = prompt("Choose the dimensions of the grid (1 - 80)");
    } else {
        dimensions = Number(dimensions);
        createGrid(dimensions);
    }
}

// add event listener to all squares
function addSquares() {
    const squares = Array.from(document.querySelectorAll(".grid"));
    squares.forEach(square => square.addEventListener("mouseover", function() {
        addColour(square, penStyle);
    }));
}

// main
createGrid(dimensions);
let penStyle = "black";

// add event listener to all options
const options = Array.from(document.querySelectorAll(".option"))
options.forEach(option => option.addEventListener("click", function() {
    penStyle = option.getAttribute('id');
}));
