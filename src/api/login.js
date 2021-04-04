import { urlHost } from './constants';
import { apiAction } from '../actions/api';
import { LOGIN, loginFailed, loginSuccess } from '../actions/login';
import AppState from '../constants/appStates';

const ROUTE = 'login/';

export const login = data => apiAction({
  url: urlHost + ROUTE,
  onSuccess: loginSuccess,
  onFailure: loginFailed,
  label: LOGIN,
  data,
  method: 'POST',
  appState: AppState.LOGGING_IN,
});
