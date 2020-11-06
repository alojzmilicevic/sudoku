import { INIT } from '../actions/client';
import Client from '../libs/sudokuLib';
import { HANDLE_KEY_DOWN, HANDLE_KEY_UP } from '../actions/keys';
import { SET_SUDOKU_DATA, SOLVE_CELL, SOLVE_SUDOKU } from '../actions/sudoku';

let sudokuClient = null;

export default store => next => (action) => {
  const { modalType } = store.getState();
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
      if (modalType === null) {
        sudokuClient.handleKeyDown(action.event, action.modifiers);
      }
      break;
    }
    case HANDLE_KEY_UP: {
      if (modalType === null) {
        sudokuClient.handleKeyUp(action.event);
      }
      break;
    }
    case SET_SUDOKU_DATA: {
      next(action);
      sudokuClient.solveSudoku();
      break;
    }
    case SOLVE_SUDOKU: {
      sudokuClient.onSolveSudoku();
      break;
    }
    case SOLVE_CELL: {
      sudokuClient.onSolveCell();
      break;
    }
    default:
      return next(action);
  }

  return false;
};
