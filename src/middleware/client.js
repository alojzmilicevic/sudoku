import Client from '../libs/lib';
import { INIT } from '../actions/client';

export default store => next => (action) => {
  switch (action.type) {
    case INIT:
      // eslint-disable-next-line no-unused-vars,no-case-declarations
      const client = new Client(
        store,
        store.dispatch,
        action.sudokuId,
      );
      next(action);
      break;
    default:
      return next(action);
  }

  return false;
};
