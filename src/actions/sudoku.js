export const SET_SUDOKU_DATA = 'SET_SUDOKU_DATA';
export const SOLVE_SUDOKU = 'SOLVE_SUDOKU';
export const SOLVE_CELL = 'SOLVE_CELL';
export const ON_SOLVE_SUDOKU = 'ON_SOLVE_SUDOKU';
export const ON_FAIL_SUDOKU = 'ON_FAIL_SUDOKU';
export const CLEAR_CELL_DATA = 'CLEAR_CELL_DATA';
export const SET_SUDOKU_SESSION = 'SET_SUDOKU_SESSION';
export const SET_LEVEL = 'SET_LEVEL';
export const INCREMENT_TIME = 'INCREMENT_TIME';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const SET_CELL = 'SET_CELL';
export const LOAD_SUDOKU = 'LOAD_SUDOKU';

export const loadSudoku = () => ({
  type: LOAD_SUDOKU,
});

export const setSudoku = data => ({
  type: SET_SUDOKU_SESSION,
  payload: data,
});

export const clearCellData = () => ({
  type: CLEAR_CELL_DATA,
});

export const setSudokuData = value => ({
  type: SET_SUDOKU_DATA,
  value,
});

export const onSolveSudoku = board => ({
  type: ON_SOLVE_SUDOKU,
  board,
});

export const solveSudoku = () => ({
  type: SOLVE_SUDOKU,
});

export const solveCell = () => ({
  type: SOLVE_CELL,
});

export const onFailSudoku = () => ({
  type: ON_FAIL_SUDOKU,
});

export const setLevel = level => ({
  type: SET_LEVEL,
  level,
});

export const incrementTime = () => ({
  type: INCREMENT_TIME,
});

export const clearBoard = () => ({
  type: CLEAR_BOARD,
});

export const setCell = (pos, value) => ({
  type: SET_CELL,
  pos,
  value,
});
