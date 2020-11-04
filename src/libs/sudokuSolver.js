function nextEmptySpot(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function checkRow(board, row, value) {
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

function checkColumn(board, column, value) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

function checkSquare(board, row, column, value) {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(column / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}

function checkValue(board, row, column, value) {
  return checkRow(board, row, value)
    && checkColumn(board, column, value)
    && checkSquare(board, row, column, value);
}

function solve(grid) {
  const emptySpot = nextEmptySpot(grid);
  const row = emptySpot[0];
  const col = emptySpot[1];

  // there is no more empty spots
  if (row === -1) {
    return grid;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(grid, row, col, num)) {
      grid[row][col] = num;
      solve(grid);
    }
  }

  if (nextEmptySpot(grid)[0] !== -1) grid[row][col] = 0;

  return grid;
}

export function solveSudoku(board) {
  const grid = {};

  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      grid[i][j] = board[i][j];
    }
  }

  return solve(grid);
}
