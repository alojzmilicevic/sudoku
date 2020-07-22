import {
  ADD_TO_SELECTED_CELLS, CLEAR_SELECTED, CHANGE_LAST_SELECTED, SET_SELECTED_TO_LAST_SELECTED,
} from '../actions/selected';

export default function selected(state = null, action) {
  switch (action.type) {
    case ADD_TO_SELECTED_CELLS: {
      const { id } = action;
      const { selected } = state;

      if (!(id in selected)) {
        return {
          ...state,
          selected: { ...selected, [id]: true },
          lastSelected: id,
        };
      }

      return state;
    }
    case CHANGE_LAST_SELECTED: {
      const { id } = action;

      return {
        ...state,
        lastSelected: id,
        selected: { [id]: true },
      };
    }
    case SET_SELECTED_TO_LAST_SELECTED: {
      const { lastSelected } = state;

      return { ...state, selected: { [lastSelected]: true } };
    }
    case CLEAR_SELECTED: {
      return { ...state, selected: {}, lastSelected: 0 };
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
