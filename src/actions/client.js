import { INIT, SET_APP_STATE } from './types';

export const init = (sudokuId) => ({
  type: INIT,
  sudokuId,
});

export const setAppState = (appState) => ({
  type: SET_APP_STATE,
  appState,
});
