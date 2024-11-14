const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        checkResult();

        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (vsComputer && currentPlayer === 'O') {
                setTimeout(computerMove, 500);  // Delay for realism
            }
        }
    }
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultDisplay.innerText = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!board.includes('')) {
        resultDisplay.innerText = 'Draw!';
        gameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.innerText = ''));
    resultDisplay.innerText = '';
    gameActive = true;
    currentPlayer = 'X';
}

function computerMove() {
    if (!gameActive) return;

    const emptyCells = board
        .map((val, index) => (val === '' ? index : null))
        .filter(val => val !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].innerText = 'O';
        checkResult();

        if (gameActive) {
            currentPlayer = 'X';
        }
    }
}

function toggleMode() {
    vsComputer = !vsComputer;
    modeToggleButton.innerText = vsComputer ? 'Switch to Player vs. Player' : 'Switch to Player vs. Computer';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
modeToggleButton.addEventListener('click', toggleMode);
