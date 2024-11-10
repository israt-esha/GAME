const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      statusText.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
    statusText.textContent = 'It\'s a draw!';
  }
}

function handleClick(event) {
  const cellIndex = Array.from(cells).indexOf(event.target);

  if (gameOver || board[cellIndex]) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();

  if (!gameOver) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
