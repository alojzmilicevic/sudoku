export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginSuccess = session => ({
  type: LOGIN_SUCCESS,
  session,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  error,
});
