import { SET_SUDOKU_SESSION, ADD_TO_SELECTED_CELLS, CLEAR_SELECTED, SET_SUDOKU_DATA } from "../actions/types";
import { toPoint, toOneDimension } from "../utilities/util";

const initialState = {
  selected: {},
  initialData: {},
}
export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case SET_SUDOKU_SESSION: {
      const { data } = action.payload;

      const initialData = {};

      // Set the initial numbers index (0-80)
      // so that they can't be changed later on when updating cells.
      Object.entries(data).forEach(([rowNumber, row]) => {
        for (let i = 0; i < row.length; i++) {
          const number = row[i];

          if (number !== 0) {
            initialData[toOneDimension([rowNumber, i])] = true;
          }
        }
      });

      return {
        ...state,
        ...action.payload,
        initialData,
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
      const initialData = state.initialData;
      const selected = state.selected;

      const { value } = action;


      Object.keys(selected).forEach((pos) => {
        const { x, y } = toPoint(pos);

        if (!(pos in initialData)) data[y][x] = value;
      })

      return { ...state, ...data };
    }

    default:
      return state;
  }
}

export const getData = state => state.sudoku.data;
export const getSelectedCells = state => state.sudoku.selected;
export const getMetaData = state => state.sudoku.metaData;
export const getType = state => state.sudoku.type;
export const getDifficulty = state => state.sudoku.difficulty;
export const getName = state => state.sudoku.name;
export const getCreatedDate = state => state.sudoku.createdAt;
export const getLastUpdatedDate = state => state.sudoku.updatedAt;
export const getInitialData = state => state.sudoku.initialData;
export const isCellMutable = (state, pos) => {
  const initialData = getInitialData(state);

  return pos in initialData;
}

export const isCellSelected = (state, id) => {
  const { selected } = state.sudoku;

  return selected[id] === true;
};

