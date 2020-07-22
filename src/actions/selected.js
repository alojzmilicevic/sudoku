export const ADD_TO_SELECTED_CELLS = 'ADD_TO_SELECTED_CELLS';
export const CHANGE_LAST_SELECTED = 'CHANGE_LAST_SELECTED';
export const SET_SELECTED_TO_LAST_SELECTED = 'SET_SELECTED_TO_LAST_SELECTED';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

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

export const clearSelectedCells = () => ({
  type: CLEAR_SELECTED,
});
