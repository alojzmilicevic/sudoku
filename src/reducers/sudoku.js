import {
  SET_SUDOKU_SESSION,
  ADD_TO_SELECTED_CELLS,
  CLEAR_SELECTED,
  SET_SUDOKU_DATA,
  CHANGE_LAST_SELECTED,
  SET_SELECTED_TO_LAST_SELECTED, ON_SOLVE_SUDOKU, ON_FAIL_SUDOKU,
  SET_CURRENT_TOOL, SET_DEFAULT_TOOL, CLEAR_CELL_DATA,
} from '../actions/types';
import { toPoint, toOneDimension } from '../utilities/util';
import Tools from '../constants/tools';
import { Colors } from '../constants/constants';

const initialState = {
  lastSelected: -1,
  selected: {},
  initialData: {},
  completed: false,
  defaultTool: Tools.NUMBER,
  currentTool: Tools.NUMBER,
};

export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case SET_SUDOKU_SESSION: {
      const { data } = action.payload;
      const modifiedData = {};
      const initialData = {};

      // Set the initial numbers index (0-80)
      // so that they can't be changed later on when updating cells.
      Object.entries(data).forEach(([rowNumber, row]) => {
        modifiedData[rowNumber] = [];
        for (let i = 0; i < row.length; i++) {
          const number = row[i];

          if (number !== 0) {
            initialData[toOneDimension([rowNumber, i])] = true;
          }
          modifiedData[rowNumber].push({
            value: number,
            color: '#fff',
            notes: [],
          });
        }
      });

      return {
        ...state,
        ...action.payload,
        data: modifiedData,
        initialData,
      };
    }
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
    case CLEAR_CELL_DATA: {
      const { data, initialData, selected } = state;

      Object.keys(selected).forEach((pos) => {
        const { x, y } = toPoint(pos);
        const curCell = data[y][x];

        if (!(pos in initialData)) {
          if (curCell.value !== 0) {
            curCell.value = 0;
          } else {
            curCell.notes = [];
          }
        }
      });
      return { ...state, ...data };
    }
    case SET_SUDOKU_DATA: {
      const {
        data, initialData, selected, currentTool,
      } = state;
      const { value } = action;

      Object.keys(selected).forEach((pos) => {
        const { x, y } = toPoint(pos);
        const curCell = data[y][x];

        switch (currentTool) {
          case Tools.NUMBER:
            if (!(pos in initialData)) {
              curCell.value = value;
            }
            break;
          case Tools.COLOR:
            curCell.color = Colors[value - 1];
            break;
          case Tools.NOTE:
            curCell.notes.push(value);
            break;
          default:
            break;
        }
      });

      return { ...state, ...data };
    }
    case ON_SOLVE_SUDOKU: {
      return { ...state, completed: true };
    }
    case ON_FAIL_SUDOKU: {
      return { ...state };
    }
    case SET_CURRENT_TOOL: {
      const { tool } = action;

      return { ...state, currentTool: tool };
    }
    case SET_DEFAULT_TOOL: {
      const { tool } = action;
      return {
        ...state,
        defaultTool: tool,
        currentTool: tool,
      };
    }
    default:
      return state;
  }
}


export const getDefaultTool = state => state.sudoku.defaultTool;
export const getCurrentTool = state => state.sudoku.currentTool;
export const getData = state => state.sudoku.data;
export const getSelectedCells = state => state.sudoku.selected;
export const getInitialData = state => state.sudoku.initialData;
export const isCellMutable = (state, pos) => {
  const initialData = getInitialData(state);

  return !(pos in initialData);
};

export const getCellData = (state, pos) => {
  const { data } = state.sudoku;

  return data[pos[0]][pos[1]];
};

export const isCellSelected = (state, id) => {
  const { selected } = state.sudoku;

  return selected[id] === true;
};

export const isComplete = state => state.sudoku.completed;

export const getLastSelected = state => state.sudoku.lastSelected;
