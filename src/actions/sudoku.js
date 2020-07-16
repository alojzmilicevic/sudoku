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
  SET_SUDOKU_DATA, CLEAR_SELECTED, SET_SELECTED_TO_LAST_SELECTED, CHANGE_LAST_SELECTED,
} from './types';

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

export const setSudokuData = value => ({
  type: SET_SUDOKU_DATA,
  value,
});

export const clearSelectedCells = () => ({
  type: CLEAR_SELECTED,
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

export const handleKeyDown = event => ({
  type: HANDLE_KEY_DOWN,
  event,
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
