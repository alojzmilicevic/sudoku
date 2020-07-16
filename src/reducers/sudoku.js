import { SET_SUDOKU_SESSION, ADD_TO_SELECTED_CELLS, CLEAR_SELECTED, SET_SUDOKU_DATA } from "../actions/types";
import { toPoint } from "../utilities/util";

const initialState = {
  selected: {},
}
export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case SET_SUDOKU_SESSION: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ADD_TO_SELECTED_CELLS: {
      const selected = { ...state.selected, [action.cell]: true }

      return {
        ...state,
        selected,
      }
    }
    case CLEAR_SELECTED: {
      return { ...state, selected: {} };
    }
    case SET_SUDOKU_DATA: {
      const data = state.data;
      const selected = state.selected;

      const { value } = action;

      Object.keys(selected).forEach((pos) => {
        const { x, y } = toPoint(pos);

        data[y][x] = value;
      })

      return { ...state, ...data };
    }

    default:
      return state;
  }
}

export const getData = state => state.sudoku && state.sudoku.data;
export const getSelectedCells = state => state.sudoku && state.sudoku.selected;
export const getMetaData = state => state.sudoku && state.sudoku.metaData;
export const getType = state => state.sudoku && state.sudoku.type;
export const getDifficulty = state => state.sudoku && state.sudoku.difficulty;
export const getName = state => state.sudoku && state.sudoku.name;
export const getCreatedDate = state => state.sudoku && state.sudoku.createdAt;
export const getLastUpdatedDate = state => state.sudoku && state.sudoku.updatedAt;
export const isCellSelected = (state, id) => {
  const { selected } = state.sudoku;

  return selected[id] === true;
};

