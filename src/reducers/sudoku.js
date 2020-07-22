import { toPoint, toOneDimension } from '../utilities/util';
import Tools from '../constants/tools';
import { Colors } from '../constants/constants';
import {
  CLEAR_CELL_DATA,
  ON_FAIL_SUDOKU,
  ON_SOLVE_SUDOKU,
  SET_SUDOKU_DATA,
  SET_SUDOKU_SESSION,
} from '../actions/sudoku';

export default function sudoku(state = null, action) {
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
          case Tools.NOTE: {
            const { notes } = curCell;
            if (!notes.includes(value)) {
              notes.push(value);
              notes.sort();
            }
            break;
          }
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

    default:
      return state;
  }
}

export const getData = state => state.data;
export const getInitialData = state => state.initialData;
export const isCellMutable = (state, pos) => {
  const initialData = getInitialData(state);

  return !(pos in initialData);
};

export const getCellData = (state, pos) => {
  const { data } = state;

  return data[pos[0]][pos[1]];
};

export const isComplete = state => state.completed;
