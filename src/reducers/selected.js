import {
  ADD_TO_SELECTED_CELLS, CLEAR_SELECTED, CHANGE_LAST_SELECTED, SET_SELECTED_TO_LAST_SELECTED,
} from '../actions/selected';

export default function selected(state = null, action) {
  switch (action.type) {
    case ADD_TO_SELECTED_CELLS: {
      const { id } = action;
      const {
        selected, totalSelected, boards, level,
      } = state;
      const { completed } = boards[level];

      if (completed || selected[id]) {
        return state;
      }

      const newSelected = selected.slice();
      newSelected[id] = true;

      return {
        ...state,
        selected: newSelected,
        lastSelected: id,
        totalSelected: totalSelected + 1,
      };
    }
    case CHANGE_LAST_SELECTED: {
      const { boards, level } = state;
      const { completed } = boards[level];

      if (completed) {
        return state;
      }
      const { id } = action;
      const newSelected = [];
      newSelected[id] = true;

      return {
        ...state,
        lastSelected: id,
        selected: newSelected,
        totalSelected: 1,
      };
    }
    case SET_SELECTED_TO_LAST_SELECTED: {
      const { lastSelected, boards, level } = state;
      const { completed } = boards[level];

      if (completed) {
        return state;
      }
      const newSelected = [];
      newSelected[lastSelected] = true;

      return { ...state, selected: newSelected, totalSelected: 1 };
    }
    case CLEAR_SELECTED: {
      const { totalSelected } = state;
      if (totalSelected === 0) {
        return state;
      }
      return {
        ...state, selected: [], lastSelected: 0, totalSelected: 0,
      };
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
export const getTotalSelected = state => state.totalSelected;
