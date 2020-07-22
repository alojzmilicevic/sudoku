import {
  ADD_TO_SELECTED_CELLS, CLEAR_SELECTED, CHANGE_LAST_SELECTED, SET_SELECTED_TO_LAST_SELECTED,
} from '../actions/selected';


export default function selected(state = null, action) {
  switch (action.type) {
    case ADD_TO_SELECTED_CELLS: {
      const { cell } = action;

      const selected = { ...state.selected, [cell]: true };

      return {
        ...state,
        selected,
        lastSelected: cell,
      };
    }
    case CHANGE_LAST_SELECTED: {
      return {
        ...state,
        lastSelected: action.pos,
        selected: { [action.pos]: true },
      };
    }
    case SET_SELECTED_TO_LAST_SELECTED: {
      return { ...state, selected: { [state.lastSelected]: true } };
    }
    case CLEAR_SELECTED: {
      return { ...state, selected: {} };
    }
    default:
      return state;
  }
}

export const isCellSelected = (state, id) => {
  const { selected } = state;

  return selected[id] === true;
};
export const getLastSelected = state => state.lastSelected;
export const getSelectedCells = state => state.selected;
