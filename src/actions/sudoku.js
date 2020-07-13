import { API_START, API_END, ACCESS_DENIED, API_ERROR, API } from "./types";

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: API_ERROR,
  error
});

export function apiAction({
                            url = "", method = "GET", data = null, label = "",
                            onSuccess = () => {
                            }, onFailure = () => {
  }
                          }) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label
    }
  };
}
