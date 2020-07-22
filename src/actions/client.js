export const INIT = 'INIT';
export const SET_APP_STATE = 'SET_APP_STATE';

export const init = sudokuId => ({
  type: INIT,
  sudokuId,
});

export const setAppState = appState => ({
  type: SET_APP_STATE,
  appState,
});
