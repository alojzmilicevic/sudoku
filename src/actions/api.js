export const API = 'API';
export const API_START = 'API_START';
export const API_END = 'API_END';
export const ACCESS_DENIED = 'ACCESS_DENIED';
export const API_ERROR = 'API_ERROR';

export const apiStart = label => ({
  type: API_START,
  payload: label,
});

export const apiEnd = label => ({
  type: API_END,
  payload: label,
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = error => ({
  type: API_ERROR,
  error,
});

export function apiAction({
  url = '', method = 'GET', data = null, label = '', appState = '',
  onSuccess = () => {
  }, onFailure = () => {
  },
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      appState,
    },
  };
}
