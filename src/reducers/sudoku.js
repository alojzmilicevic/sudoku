import { toPoint } from '../utilities/util';
import Tools from '../constants/tools';
import { Colors } from '../constants/constants';
import {
  CLEAR_BOARD,
  CLEAR_CELL_DATA,
  INCREMENT_TIME,
  ON_SOLVE_SUDOKU,
  SET_CELL,
  SET_LEVEL,
  SET_SUDOKU_DATA,
  SET_SUDOKU_SESSION,
} from '../actions/sudoku';
import { SET_APP_STATE } from '../actions/client';
import AppState from '../constants/appStates';
import { Levels } from '../constants/levels';
import { solveSudoku } from '../libs/sudokuSolver';
import { cellColors } from '../theme/theme';

const defaultState = {
  selected: [],
  totalSelected: 0,
  lastSelected: 0,
  defaultTool: Tools.NUMBER,
  currentTool: Tools.NUMBER,
};

function transformData(board) {
  let cellsLeft = 0;
  const data = [];

  // Set the initial numbers index (0-80)
  // so that they can't be changed later on when updating cells.
  Object.entries(board).forEach(([rowNumber, row]) => {
    data[rowNumber] = [];
    for (let col = 0; col < row.length; col++) {
      const number = row[col];
      const cell = {
        value: number,
        color: cellColors.background,
        notes: [],
        preFilled: false,
      };

      // If this is a prefilled cell
      if (number !== 0) {
        cell.preFilled = true;
        cell.color = cellColors.preFilledBackground;
      } else {
        cellsLeft++;
      }
      data[rowNumber].push(cell);
    }
  });

  return {
    cellsLeft, data, time: 0, completed: false, // Some redux weirdness doesn't allow setting time in initial state
  };
}

// TODO STOP MUTATING STATE PLEASE
export default function sudoku(state = null, action) {
  switch (action.type) {
    case SET_APP_STATE: {
      const { appState } = action;
      const { boards, level } = state;
      const { completed } = boards[level];
      const newCompleted = appState === AppState.GAME_COMPLETED ? true : completed;

      return {
        ...state,
        boards: {
          ...boards,
          [level]: {
            ...boards[level],
            completed: newCompleted,
          },
        },
      };
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

      const { cellsLeft, data, completed } = boards[level];

      if (completed) {
        return state;
      }

      let newCellsLeft = cellsLeft;

      selected.forEach((value, i) => {
        const { x, y } = toPoint(i);
        const curCell = data[y][x];

        if (!curCell.preFilled) {
          if (curCell.value !== 0) {
            curCell.value = 0;
            newCellsLeft++;
          } else if (curCell.notes.length > 0) {
            curCell.notes = [];
          } else {
            curCell.color = cellColors.background;
          }
        } else {
          curCell.color = cellColors.preFilledBackground;
        }
      });

      boards[level].cellsLeft = newCellsLeft;

      return { ...state, ...boards };
    }
    case SET_SUDOKU_DATA: {
      const {
        boards, level, selected, currentTool, totalSelected,
      } = state;
      const { cellsLeft, data, completed } = boards[level];

      // Just return state if there are no selected cells, since nothing can changed if that's the case
      if (completed || totalSelected === 0) {
        return state;
      }
      const { value } = action;
      const numberValue = parseInt(value, 10);

      let newCellsLeft = cellsLeft;

      selected.forEach((val, i) => {
        const { x, y } = toPoint(i);
        const curCell = data[y][x];

        switch (currentTool) {
          case Tools.NUMBER:
            // Don't replace cells that are part of the initial data.
            if (!curCell.preFilled) {
              if (curCell.value === 0) {
                newCellsLeft--;
              }
              if (curCell.value !== 0 && numberValue === 0) {
                newCellsLeft++;
              }
              // in case numpad is used we need to cast to int
              curCell.value = numberValue;
            }
            break;
          case Tools.COLOR:
            curCell.color = Colors[numberValue - 1];
            break;
          case Tools.NOTE: {
            const { notes } = curCell;
            if (!notes.includes(numberValue)) {
              notes.push(numberValue);
              notes.sort();
            }
            break;
          }
          default:
            break;
        }
      });

      return {
        ...state,
        boards: {
          ...boards,
          [level]: {
            ...boards[level],
            cellsLeft: newCellsLeft,
          },
        },
      };
    }
    case SET_CELL: {
      const { pos, value } = action;
      const { boards, level } = state;

      const { x, y } = pos;
      const nextBoard = { ...boards };
      const curBoard = nextBoard[level];
      const cell = curBoard.data[y][x];
      if (cell.value === 0) {
        curBoard.cellsLeft--;
      }

      cell.preFilled = true;
      cell.color = cellColors.preFilledBackground;
      cell.value = value;

      return { ...state, boards: nextBoard };
    }
    case SET_LEVEL: {
      return { ...state, level: action.level };
    }
    case ON_SOLVE_SUDOKU: {
      const { boards, level } = state;

      const { board } = action;

      if (board) {
        return {
          ...state,
          ...defaultState,
          boards: {
            ...boards,
            [level]: {
              ...boards[level],
              data: board,
              completed: true,
              cellsLeft: 0,
            },
          },
        };
      }

      return {
        ...state,
        ...defaultState,
        boards: {
          ...boards,
          [level]: {
            ...boards[level],
            completed: true,
            cellsLeft: 0,
          },
        },
      };
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
export const getCellsLeft = state => getCurrentBoard(state).cellsLeft;
export const getCellData = (state, pos) => getCurrentBoard(state).data[pos[0]][pos[1]];
export const getTimer = state => getCurrentBoard(state).time;
export const getCompleted = state => getCurrentBoard(state).completed;
export const getSolution = (state) => {
  const { solutions, level } = state;

  return solutions[level];
};
export const getCompletedBoards = (state) => {
  const { boards } = state;

  const boardData = {};

  Object.keys(boards).forEach((board) => {
    boardData[board] = boards[board].completed;
  });

  return boardData;
};
export const isComplete = state => getCurrentBoard(state).completed;
export const isFailed = (state) => {
  const { completed, cellsLeft } = getCurrentBoard(state);

  return cellsLeft === 0 && completed === false;
};

export const getCorrectValueForCell = (state, pos) => {
  const { solutions, level } = state;

  return solutions[level][pos.y][pos.x];
};

export const getCell = (state, pos) => getData(state)[pos.y][pos.x];
export const getCellValue = (state, pos) => getCell(state, pos).value;
export const isCellEmpty = (state, pos) => getCellValue(state, pos) === 0;
