const squareCoordinates = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];

function getRow(board, row) {
  // Given a board, we can return a single row
  return board[row];
}

function getColumn(board, column) {
  // Given a board, we iterate the rows to return a column
  const col = [];
  for (let row = 0; row < 9; row++) {
    col.push(board[row][column]);
  }
  return col;
}

function getSquare(board, square) {
  const cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (square === squareCoordinates[r][c]) {
        cells.push(board[r][c]);
      }
    }
  }
  return cells;
}

function completeCell(board, r, c) {
  const used = [...getRow(board, r), ...getColumn(board, c), ...getSquare(board, squareCoordinates[r][c])];
  const possibilities = [];
  for (let p = 1; p <= 9; p++) {
    if (!used.includes(p)) {
      possibilities.push(p);
    }
  }
  if (possibilities.length === 1) {
    // If there is only one valid possibility, fill it in
    board[r][c] = possibilities[0];
    return true;
  }
  board[r][c] = possibilities;
  return false;
}

function appearsOnceOnly(board, possibilities, segment, r, c) {
  let updated = false;
  for (let i = 0; i < possibilities.length; i++) {
    const possibility = possibilities[i];
    let counter = 0;
    segment.forEach((cell) => {
      if (Array.isArray(cell)) {
        if (cell.includes(possibility)) {
          counter++;
        }
      } else if (cell === possibility) {
        counter++;
      }
    });
    if (counter === 1) {
      board[r][c] = possibility;
      updated = true;
      break;
    }
  }
  return updated;
}

function compare(expected, actual) {
  const array1 = expected.slice();
  const array2 = actual.slice();
  return array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index]);
}

function isSolved(board) {
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let valid = true;
  // Check all rows
  for (let r = 0; r < 9 && valid === true; r++) {
    if (!compare(expected, getRow(board, r))) {
      valid = false;
    }
  }
  // Check all columns
  for (let c = 0; c < 9 && valid === true; c++) {
    if (!compare(expected, getColumn(board, c))) {
      valid = false;
    }
  }
  // Check all quadrants
  for (let q = 1; q < 9 && valid === true; q++) {
    if (!compare(expected, getSquare(board, q))) {
      valid = false;
    }
  }
  return valid;
}

function backtrackBased(origBoard) {
  // Create a temporary board for our recursion.
  const board = JSON.parse(JSON.stringify(origBoard));

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      // Process each incomplete cell
      if (board[r][c] === 0) {
        completeCell(board, r, c);
        if (isSolved(board)) return board;
        const cell = board[r][c];
        // If we just created a list of possibilities, iterate them and recurse
        if (Array.isArray(cell)) {
          for (let i = 0; i < cell.length; i++) {
            // Create a temporary board for each recursion.
            const board2 = JSON.parse(JSON.stringify(board));
            // Choose a value
            board2[r][c] = cell[i];
            // Recurse again using new board
            const completedBoard = backtrackBased(board2);
            if (completedBoard) {
              return completedBoard;
            }
          }
          return false; // dead end
        }
      }
    }
  }

  return false;
}

// Constraint based pass.
// Apply the rules of Sudoku and mark up the cells we are
// 100% can only be a single value.
function oneValueCellConstraint(board) {
  // Set to false at the start of the loop
  let updated = false;

  // Convert every gap into an array of possibilities
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        updated = completeCell(board, r, c) || updated;
      }
    }
  }

  // Look out for any possibility that appears as a possibility
  // once-only in the row, column, or quadrant.
  // If it does, fill it in!
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        const possibilities = board[r][c];
        updated = appearsOnceOnly(board, possibilities, getRow(board, r), r, c)
          || appearsOnceOnly(board, possibilities, getColumn(board, c), r, c)
          || appearsOnceOnly(board, possibilities, getSquare(board, squareCoordinates[r][c]), r, c) || updated;
      }
    }
  }

  // Reinitialize gaps back to zero before ending
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        board[r][c] = 0;
      }
    }
  }

  return updated;
}

function solve(board) {
  let updated = true;
  let
    solved = false;

  /*
      Easy-Hard are solved via iterations where we look at the current
      board and fill in any 100% guaranteed cells. We keep using the
      same board, and fill in the gaps until solved.

      Always do this first.  We can make the board simpler, even if we
      are unable to crack it entirely this way.
      Tests show doing this FIRST is quicker for Hard-Evil sudoko as it
      removes the number of blank cells ahead of the brute force.
  */
  while (updated && !solved) {
    updated = oneValueCellConstraint(board);
    solved = isSolved(board);
  }

  // Hard-Evil need brute force to finish off.
  if (!solved) {
    board = backtrackBased(board);
    solved = isSolved(board);
  }

  return board;
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
