import { setAppState } from '../actions/client';
import { getAppState } from '../reducers/client';

export default class Client {
  constructor(store, dispatch) {
    this.store = store;
    this.dispatch = dispatch;
  }

  setAppState(appState) {
    // const oldAppState = this.getAppState();
    this.dispatch(setAppState(appState));
  }

  onLoginSuccess(session) {
    console.log('Log in success');
    console.log('session:', session);

    this.setAppState('');
  }

  onLoginFailed(error) {
    console.log('Login failed');
    console.log(error);
  }

  getAppState() {
    return getAppState(this.store.getState());
  }
}
