import { SET_SHOW_CLOCK } from '../actions/settings';

export const settingsInitialState = {
  showClock: true,
};

export default function settings(state = null, action) {
  switch (action.type) {
    case SET_SHOW_CLOCK:
      return {
        ...state,
        settings: { ...state.settings, showClock: action.value },
      };

    default:
      return state;
  }
}

export const getShowClock = state => state.settings.showClock;
