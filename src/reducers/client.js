import { SET_APP_STATE } from '../actions/client';

export default function client(state = null, action) {
  switch (action.type) {
    case SET_APP_STATE: {
      const { appState } = action;

      return {
        ...state,
        appState,
      };
    }

    default:
      return state;
  }
}

export const getAppState = state => state.appState;
