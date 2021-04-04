import Client from '../libs/lib';
import { INIT } from '../actions/client';
import { LOGIN_FAILED, LOGIN_SUCCESS } from '../actions/login';

let client;

export default store => next => (action) => {
  switch (action.type) {
    case INIT:
      client = new Client(
        store,
        store.dispatch,
      );
      next(action);
      break;

    case LOGIN_SUCCESS:
      client.onLoginSuccess();
      break;
    case LOGIN_FAILED:
      client.onLoginFailed();
      break;
    default:
      return next(action);
  }

  return false;
};
