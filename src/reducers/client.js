import { SET_APP_STATE } from '../actions/types';

const initialState = {
  appState: '',
};

export default function client(state = initialState, action) {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        appState: action.appState,
      };
    default:
      return state;
  }
}

export const getAppState = state => state.client.appState;
