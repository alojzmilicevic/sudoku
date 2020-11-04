import { toPoint, toOneDimension } from '../utilities/util';
import Tools from '../constants/tools';
import { Colors } from '../constants/constants';
import {
  CLEAR_CELL_DATA,
  INCREMENT_TIME,
  ON_SOLVE_SUDOKU,
  SET_LEVEL,
  SET_SUDOKU_DATA,
  SET_SUDOKU_SESSION,
  CLEAR_BOARD, SOLVE_SUDOKU, SOLVE_CELL,
} from '../actions/sudoku';
import { SET_APP_STATE } from '../actions/client';
import AppState from '../constants/appStates';
import { Levels } from '../constants/levels';
import { solveSudoku } from '../libs/sudokuSolver';

function transformData(board) {
  let cellsLeft = 0;
  const data = [];
  const initialData = [];

  // Set the initial numbers index (0-80)
  // so that they can't be changed later on when updating cells.
  Object.entries(board).forEach(([rowNumber, row]) => {
    data[rowNumber] = [];
    for (let col = 0; col < row.length; col++) {
      const number = row[col];

      if (number !== 0) {
        initialData[toOneDimension([rowNumber, col])] = true;
      } else {
        cellsLeft++;
      }
      data[rowNumber].push({
        value: number,
        color: '#fff',
        notes: [],
      });
    }
  });

  return {
    cellsLeft, data, initialData, time: 0, // Some redux weirdness doesn't allow setting time in initial state
  };
}

// TODO STOP MUTATING STATE PLEASE
export default function sudoku(state = null, action) {
  switch (action.type) {
    case SET_APP_STATE: {
      const { appState } = action;
      const { completed } = state;

      const newCompleted = appState === AppState.GAME_COMPLETED ? true : completed;

      return { ...state, completed: newCompleted };
    }
    case SET_SUDOKU_SESSION: {
      const {
        data, createdAt, metadata, name,
      } = action.payload;
      const { easy, medium, hard } = data;

      return {
        ...state,
        ...metadata,
        createdAt,
        name,
        boards: {
          [Levels.EASY]: { ...transformData(easy) },
          [Levels.MEDIUM]: { ...transformData(medium) },
          [Levels.HARD]: { ...transformData(hard) },
        },
        initialBoards: {
          [Levels.EASY]: { ...easy },
          [Levels.MEDIUM]: { ...medium },
          [Levels.HARD]: { ...hard },
        },
        solutions: {
          [Levels.EASY]: solveSudoku(easy),
          [Levels.MEDIUM]: solveSudoku(medium),
          [Levels.HARD]: solveSudoku(hard),
        },
      };
    }

    case CLEAR_CELL_DATA: {
      const {
        boards, level, selected,
      } = state;

      const { cellsLeft, initialData, data } = boards[level];

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

      boards[level].cellsLeft = newCellsLeft;

      return { ...state, ...boards };
    }
    case SET_SUDOKU_DATA: {
      const {
        boards, level, selected, currentTool, totalSelected,
      } = state;
      const { value } = action;
      const { cellsLeft, initialData, data } = boards[level];

      let newCellsLeft = cellsLeft;

      // Just return state if there are no selected cells, since nothing can changed if that's the case
      if (totalSelected === 0) return state;

      selected.forEach((val, i) => {
        const { x, y } = toPoint(i);
        const curCell = data[y][x];

        switch (currentTool) {
          case Tools.NUMBER:
            // Don't replace cells that are part of the initial data.
            if (!(i in initialData)) {
              if (curCell.value === 0) {
                newCellsLeft--;
              }
              if (curCell.value !== 0 && value === 0) {
                newCellsLeft++;
              }
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
      boards[level].cellsLeft = newCellsLeft;

      return { ...state, ...boards };
    }

    case SET_LEVEL: {
      return { ...state, level: action.level };
    }

    case SOLVE_SUDOKU: {
      const { boards, level, solutions } = state;

      boards[level] = transformData(solutions[level]);

      return {
        ...state,
        completed: true,
        appState: AppState.GAME_COMPLETED,
      };
    }
    case SOLVE_CELL: {
      const {
        boards, level, lastSelected, solutions,
      } = state;

      const currentSolution = solutions[level];

      const { x, y } = toPoint(lastSelected);
      const curData = [...boards[level].data];
      curData[y][x].value = currentSolution[y][x];

      return {
        ...state,
        boards: {
          ...boards,
          [level]: {
            ...boards[level],
            data: [...curData],
          },
        },
      };
    }
    case ON_SOLVE_SUDOKU: {
      return { ...state, completed: true };
    }
    case INCREMENT_TIME: {
      const { boards, level } = state;
      const currentBoard = boards[level];

      currentBoard.time++;

      return { ...state, ...boards };
    }
    case CLEAR_BOARD: {
      const { boards, level, initialBoards } = state;

      boards[level] = transformData(initialBoards[level]);

      return {
        ...state,
        ...boards,
      };
    }
    default:
      return state;
  }
}

export const getLevel = state => state.level;

export function getCurrentBoard(state) {
  const { level, boards } = state;

  return boards[level];
}

export const getData = state => getCurrentBoard(state).data;
export const getInitialData = state => getCurrentBoard(state).initialData;
export const getCellsLeft = state => getCurrentBoard(state).cellsLeft;
export const getCellData = (state, pos) => getCurrentBoard(state).data[pos[0]][pos[1]];
export const getTimer = state => getCurrentBoard(state).time;

export const isCellMutable = (state, pos) => {
  const initialData = getInitialData(state);

  return !(pos in initialData);
};

export const isComplete = state => getCurrentBoard(state).completed;
