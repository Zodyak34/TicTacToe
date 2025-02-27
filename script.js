/*
 automatically start game when page is loaded
 function to get the cell that was clicked
 function to add an X for the player when they click a cell
 function to check for a winner
 function to start a new game
 function to have computer select a cell and add an O in it
 */
let gameActive = false;
const status = document.getElementById("#gameStatus");
let currentPlayer = "X";
let cellArray = ["", "", "", "", "", "", "", "", ""] // array of empty strings to be updated with X or O depending on currentPlayer
const winningConditions = [ // possible cell combinations to win the game
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellClicked(cellId) {
    const clickedCell = cellId.target; // save the clicked cell
    const clickedCellId = clickedCell.parseInt(clickedCell.getAttribute("id")); // save cell id as a number

    if (clickedCellId !== "" || !gameActive) { // check that the game is active and the cell has not been played before
        status.innerText = "Cell already clicked, choose another cell";
    }

    playerTurn(clickedCell, clickedCellId);
    checkForWinner();
}

function playerTurn(clickedCell, clickedCellId) {
    cellArray[clickedCellId] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    switchTurn();
}

function switchTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        computerTurn();
    }
    else {
        currentPlayer = "X";
    }
}

function computerTurn() {

}

function checkForWinner() {
    let gameWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCon = winningConditions[i];
        let a = cellArray[winCon[0]];
        let b = cellArray[winCon[1]];
        let c = cellArray[winCon[2]];
        if (a === "" || b === "" || c === "") { //checks if cells in cell array are empty and continues loop if they are
            continue;
        }
        if (a === b && b === c) { //checks if the cells in cellArray are in one of the winning patterns and declares a winner if they are
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        status.innerText = `Game Won By ${currentPlayer}!`;
        gameActive = false;
    }
    if (!cellArray.includes("") && !gameWon) { // checks to see if there are any available plays and that the game has not been won, ends game in draw
        status.innerText = "Game Ended in a Draw";
        gameActive = false;
    }
    switchTurn();
}

function newGame() {
    status.innerText = `It is ${currentPlayer}'s turn`;
    gameActive = true;
}

document.querySelectorAll(".cell").forEach(cell => { //adds click handler to get the cell the player clicked
    cell.addEventListener("click", playerTurn);
});

document.querySelector("#newGame").addEventListener("click", newGame); //adds an event handler to start a new game when new game button is clicked