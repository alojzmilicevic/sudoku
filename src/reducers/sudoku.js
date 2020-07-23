import { toPoint, toOneDimension } from '../utilities/util';
import Tools from '../constants/tools';
import { Colors } from '../constants/constants';
import {
  CLEAR_CELL_DATA,
  ON_SOLVE_SUDOKU,
  SET_SUDOKU_DATA,
  SET_SUDOKU_SESSION,
} from '../actions/sudoku';
import { SET_APP_STATE } from '../actions/client';
import AppState from '../constants/appStates';

export default function sudoku(state = null, action) {
  switch (action.type) {
    case SET_APP_STATE: {
      const { appState } = action;
      const { completed } = state;

      const newCompleted = appState === AppState.GAME_COMPLETED ? true : completed;

      return { ...state, completed: newCompleted };
    }
    case SET_SUDOKU_SESSION: {
      const { data } = action.payload;
      const modifiedData = [];
      const initialData = [];
      let cellsLeft = 0;
      // Set the initial numbers index (0-80)
      // so that they can't be changed later on when updating cells.
      Object.entries(data).forEach(([rowNumber, row]) => {
        modifiedData[rowNumber] = [];
        for (let col = 0; col < row.length; col++) {
          const number = row[col];

          if (number !== 0) {
            initialData[toOneDimension([rowNumber, col])] = true;
          } else {
            cellsLeft++;
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
        cellsLeft,
      };
    }
    case CLEAR_CELL_DATA: {
      const {
        data, initialData, selected, cellsLeft,
      } = state;
      let newCellsLeft = cellsLeft;

      selected.forEach((value, i) => {
        const { x, y } = toPoint(i);
        const curCell = data[y][x];

        if (!(i in initialData)) {
          if (curCell.value !== 0) {
            curCell.value = 0;
            newCellsLeft++;
          } else if (curCell.notes.length > 0) {
            curCell.notes = [];
          } else {
            curCell.color = '#fff';
          }
        } else {
          curCell.color = '#fff';
        }
      });
      return { ...state, ...data, cellsLeft: newCellsLeft };
    }
    case SET_SUDOKU_DATA: {
      const {
        data, initialData, selected, currentTool, cellsLeft, totalSelected,
      } = state;
      const { value } = action;
      let newCellsLeft = cellsLeft;

      // Just return state if there are no selected cells, since nothing can changed if that's the case
      if (totalSelected === 0) return state;

      selected.forEach((val, i) => {
        const { x, y } = toPoint(i);
        const curCell = data[y][x];

        switch (currentTool) {
          case Tools.NUMBER:
            if (!(i in initialData)) {
              curCell.value = value;
              newCellsLeft--;
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

      return { ...state, ...data, cellsLeft: newCellsLeft };
    }
    case ON_SOLVE_SUDOKU: {
      return { ...state, completed: true };
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
export const getCellsLeft = state => state.cellsLeft;

export const getCellData = (state, pos) => {
  const { data } = state;

  return data[pos[0]][pos[1]];
};

export const isComplete = state => state.completed;
