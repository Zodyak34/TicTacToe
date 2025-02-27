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
let cellArray = ["", "", "", "", "", "", "", "", ""]

function cellClicked(cellId) {
    const clickedCell = cellId.target; // save the clicked cell
    const clickedCellId = clickedCell.parseInt(clickedCell.getAttribute("id")); // save cell id as a number

    if (clickedCellId !== "" || !gameActive) { // check that the game is active and the cell has not been played before
        return;
    }

    playerTurn(clickedCell, clickedCellId);
    checkForWinner();
}

function playerTurn(clickedCell, clickedCellId) {
    cellArray[clickedCellId] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    switchTurn();
}

function switchTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
}

function computerTurn() {

    switchTurn();
}

function checkForWinner() {

}

function newGame() {
    status.innerText = `It is ${currentPlayer}'s turn`;
    gameActive = true;
}

document.querySelectorAll(".cell").forEach(cell => { //adds click handler to get the cell the player clicked
    cell.addEventListener("click", playerTurn);
});

document.querySelector("#newGame").addEventListener("click", newGame); //adds an event handler to start a new game when new game button is clicked