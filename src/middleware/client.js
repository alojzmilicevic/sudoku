import {
  INIT,
} from '../actions/types';

import Client from '../lib';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case INIT:
      // eslint-disable-next-line no-unused-vars,no-case-declarations
      const client = new Client(
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
