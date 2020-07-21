import {
  API_START,
  API_END,
  ACCESS_DENIED,
  API_ERROR,
  API,
  HANDLE_KEY_DOWN,
  HANDLE_KEY_UP,
  SET_SUDOKU_SESSION,
  ADD_TO_SELECTED_CELLS,
  SET_SUDOKU_DATA,
  SET_SELECTED_TO_LAST_SELECTED,
  CHANGE_LAST_SELECTED,
  SOLVE_SUDOKU,
  ON_SOLVE_SUDOKU,
  ON_FAIL_SUDOKU,
  SET_DEFAULT_TOOL,
  SET_CURRENT_TOOL,
  CLEAR_SELECTED,
  CLEAR_CELL_DATA,
} from './types';

export const solveSudoku = () => ({
  type: SOLVE_SUDOKU,
});
export const setSudoku = data => ({
  type: SET_SUDOKU_SESSION,
  payload: data,
});

export const addToSelectedCells = cell => ({
  type: ADD_TO_SELECTED_CELLS,
  cell,
});

export const setSelectedToLastSelected = () => ({
  type: SET_SELECTED_TO_LAST_SELECTED,
});

export const changeLastSelected = pos => ({
  type: CHANGE_LAST_SELECTED,
  pos,
});

export const setDefaultTool = tool => ({
  type: SET_DEFAULT_TOOL,
  tool,
});

export const setCurrentTool = tool => ({
  type: SET_CURRENT_TOOL,
  tool,
});

export const clearCellData = () => ({
  type: CLEAR_CELL_DATA,
});

export const setSudokuData = value => ({
  type: SET_SUDOKU_DATA,
  value,
});

export const clearSelectedCells = () => ({
  type: CLEAR_SELECTED,
});

export const onSolveSudoku = () => ({
  type: ON_SOLVE_SUDOKU,
});

export const onFailSudoku = () => ({
  type: ON_FAIL_SUDOKU,
});

export const apiStart = label => ({
  type: API_START,
  payload: label,
});

export const apiEnd = label => ({
  type: API_END,
  payload: label,
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = error => ({
  type: API_ERROR,
  error,
});

export const handleKeyDown = (event, modifiers) => ({
  type: HANDLE_KEY_DOWN,
  event,
  modifiers,
});
export const handleKeyUp = event => ({
  type: HANDLE_KEY_UP,
  event,
});

export function apiAction({
  url = '', method = 'GET', data = null, label = '',
  onSuccess = () => {
  }, onFailure = () => {
  },
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
    },
  };
}
