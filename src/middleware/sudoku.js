import {
  HANDLE_KEY_DOWN,
  HANDLE_KEY_UP,
  INIT, SOLVE_SUDOKU,
} from '../actions/types';

import Client from '../libs/sudokuLib';

let sudokuClient = null;

export default store => next => (action) => {
  switch (action.type) {
    case INIT: {
      // eslint-disable-next-line no-unused-vars,no-case-declarations
      sudokuClient = new Client(
        store,
        store.dispatch,
      );
      break;
    }
    case HANDLE_KEY_DOWN: {
      sudokuClient.handleKeyDown(action.event);
      break;
    }
    case HANDLE_KEY_UP: {
      sudokuClient.handleKeyUp(action.event);
      break;
    }
    case SOLVE_SUDOKU: {
      sudokuClient.solveSudoku();
      break;
    }
    default:
      return next(action);
  }

  return false;
};
