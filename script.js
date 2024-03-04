const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameStatus = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
  if (gameStatus[index] !== '' || !gameActive) {
    return;
  }

  gameStatus[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    status.textContent = `${winner} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
      return gameStatus[a];
    }
  }

  return null;
}

function checkDraw() {
  return gameStatus.every(cell => cell !== '');
}

function renderBoard() {
  board.innerHTML = '';
  gameStatus.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

function handleRestart() {
  currentPlayer = 'X';
  gameStatus = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.textContent = `${currentPlayer}'s turn`;
  renderBoard();
}

status.textContent = `${currentPlayer}'s turn`;
restartButton.addEventListener('click', handleRestart);
renderBoard();
