import { SET_SUDOKU, SET_SELECTED } from "../actions/types";

const initialState = {
  selected: [],
}
export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case SET_SUDOKU: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SET_SELECTED: {
      return {
        ...state,
        selected: action.selected
      }
    }
    default:
      return state;
  }
}

export const getData = state => state.sudoku && state.sudoku.data;
export const getSelected = state => state.sudoku && state.sudoku.selected;
export const getMetaData = state => state.sudoku && state.sudoku.metaData;
export const getType = state => state.sudoku && state.sudoku.type;
export const getDifficulty = state => state.sudoku && state.sudoku.difficulty;
export const getName = state => state.sudoku && state.sudoku.name;
export const getCreatedDate = state => state.sudoku && state.sudoku.createdAt;
export const getLastUpdatedDate = state => state.sudoku && state.sudoku.updatedAt;
export const isCellSelected = (state, cell) => (state.sudoku.selected.includes(cell[0] * 9 + cell[1]))

