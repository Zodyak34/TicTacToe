let gameActive;
let gameDraw;
let currentPlayer = "X";
let computerMoveTimeout = 0;
let cellArray = ["", "", "", "", "", "", "", "", ""] // array of empty strings to be updated with X or O depending on currentPlayer
const display = document.getElementById("display");
const displayText1 = document.getElementById("start-message");
const displayText2 = document.getElementById("message");
const statusDisplay = document.getElementById("game-status-display");
const currentTurnText = document.getElementById("current-turn");
const gameStatusText = document.getElementById("game-status");

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
    const clickedCellId = parseInt(clickedCell.getAttribute("id")); // save cell id as a number

    if (!gameActive) {// check that the game is active and the cell has not been played before
        if (gameDraw) {
            currentTurnText.innerText = "Winner is:";
            gameStatusText.innerText = `Player ${currentPlayer}`;

            return;
        }
        currentTurnText.innerText = "Current Turn:";
        gameStatusText.innerText = currentPlayer;

    } else if (cellArray[clickedCellId] !== "") {
        currentTurnText.innerText = "";
        gameStatusText.innerText = "Please Choose an Empty Cell";

    }else if (currentPlayer === "X") {
        playerTurn(clickedCell, clickedCellId)
    } else {
        currentTurnText.innerText = "";
        gameStatusText.innerText = "Not Your Turn";

    }


    //checkForWinner();
}

function playerTurn(clickedCell, clickedCellId) {
    cellArray[clickedCellId] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkForWinner();
}

function switchTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        currentTurnText.innerText = "Current Turn:";
        gameStatusText.innerText = currentPlayer;

        if (gameActive) {
            computerMoveTimeout = setTimeout(computerTurn, 1000);
        }
    }
    else {
        currentPlayer = "X";
        currentTurnText.innerText = "Current Turn:";
        gameStatusText.innerText = currentPlayer;

    }
}

//added some logic to the computers moves
function computerLogic() {

    for (let i = 0; i < winningConditions.length; i++) {
        const winCon = winningConditions[i];
        let a = cellArray[winCon[0]];
        let b = cellArray[winCon[1]];
        let c = cellArray[winCon[2]];

        //check if the computer can win and return the winning cell
        if (a === "O" && b === "O" && c === "") {
            console.log("Computer can win by choosing cell:", winCon[2]);
            return winCon[2];
        } else if (a === "O" && c === "O" && b === "") {
            console.log("Computer can win by choosing cell:", winCon[1]);
            return winCon[1];
        } else if (b === "O" && c === "O" && a === "") {
            console.log("Computer can win by choosing cell:", winCon[0]);
            return winCon[0];
        }
    }

    //loop through a second time to ensure all conditions have been checked for a win before they are checked to be blocked
    for (let i = 0; i < winningConditions.length; i++) {
        const winCon = winningConditions[i];
        let a = cellArray[winCon[0]];
        let b = cellArray[winCon[1]];
        let c = cellArray[winCon[2]];

        if (a === b && c === "" && a === "X") {
            console.log("Computer needs to block cell:", winCon[2]);
            return winCon[2];
        } else if (a === c && b === "" && a === "X") {
            console.log("Computer needs to block cell:", winCon[1]);
            return winCon[1];
        } else if (b === c && a === "" && b === "X") {
            console.log("Computer needs to block cell:", winCon[0]);
            return winCon[0];
        }
    }

    //return a random available cell if neither player can win this turn
    let availableCells = [];

    for (let i = 0; i < cellArray.length; i++) {
        if (cellArray[i] === "") {
            availableCells.push(i);
        }
    }

    if (availableCells.length > 0) {
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
}

//update html and cellArray to show the computers move
function computerTurn() {
    let logicCell = computerLogic();

    if (logicCell !== null) {
        cellArray[logicCell] = currentPlayer;
        document.getElementById(logicCell).innerHTML = currentPlayer;
        checkForWinner();
    }
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
        statusDisplay.style.display = "none";
        display.style.display = "flex";
        displayText1.innerText = `Game Over! Player ${currentPlayer} Wins!`;
        displayText2.innerText = "Play Again?";
        gameActive = false;
        return;
    }
    if (!cellArray.includes("") && !gameWon) { // checks to see if there are any available plays and that the game has not been won, ends game in draw
        statusDisplay.style.display = "none";
        display.style.display = "flex";
        displayText1.innerText = "Game Ended in a Draw";
        displayText2.innerText = "Play Again?";
        gameActive = false;
        gameDraw = true;
        return;
    }
    switchTurn();
}

function newGame() {
    display.style.display = "none";
    statusDisplay.style.display = "block";
    clearTimeout(computerMoveTimeout);
    gameActive = true;
    currentPlayer = "X";
    cellArray = ["", "", "", "", "", "", "", "", ""];
    currentTurnText.innerText = "Current Turn:";
    gameStatusText.innerText = currentPlayer;
    document.querySelectorAll(".cell").forEach(cell => {cell.innerHTML = ""});
}

document.querySelectorAll(".cell").forEach(cell => { //adds click handler to get the cell the player clicked
    cell.addEventListener("click", cellClicked);
});

document.querySelector("#newGame").addEventListener("click", newGame); //adds an event handler to start a new game when new game button is clicked