export const INIT = 'INIT';
export const SET_APP_STATE = 'SET_APP_STATE';

export const init = () => ({
  type: INIT,
});

export const setAppState = appState => ({
  type: SET_APP_STATE,
  appState,
});
