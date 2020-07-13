import {
  INIT,
} from '../actions/types';

import Client from '../lib'

export default store => next => (action) => {
  switch (action.type) {
    case INIT:
      new Client(
        store,
        store.dispatch,
        action.sudokuId,
      );
      break;
    default:
      return next(action);
  }

  return false;
};
