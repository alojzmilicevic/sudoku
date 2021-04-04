const AppState = {
  FETCHING_SESSION: 'FETCHING_SESSION',

  READY_TO_PLAY: 'READY_TO_PLAY',

  /*
  * Start and End of API calls,
  * in between there everything else should be put on hold.
  * [or on queue (future improvement)]
  * */
  API_START: 'API_START',
  API_END: 'API_END',

  // When sudoku game is correct and completed this will be the state.
  GAME_COMPLETED: 'GAME_COMPLETED',

  LOGGING_IN: 'LOGGING_IN',
};

export default AppState;
