import {
  setSudokuData,
  clearCellData,
  onSolveSudoku,
  setCell,
} from '../actions/sudoku';
import {
  getCell,
  getCellsLeft,
  getCorrectValueForCell,
  getCurrentBoard,
  getData,
  getSolution,
  isComplete,
} from '../reducers/sudoku';
import { GRID_SIZE } from '../constants/constants';
import { toOneDimension, toPoint } from '../utilities/util';
import Tools from '../constants/tools';
import { Modifiers, Directions } from '../constants/keyboard';
import { getDefaultTool } from '../reducers/tools';
import { getLastSelected, getTotalSelected } from '../reducers/selected';
import { setCurrentTool } from '../actions/tools';
import { changeLastSelected, clearSelectedCells, setSelectedToLastSelected } from '../actions/selected';
import AppState from '../constants/appStates';
import { setAppState } from '../actions/client';
import { showModal } from '../actions/modal';
import { ModalTypes } from '../components/modals/Modal';

const MoveKeys = ['a', 'd', 's', 'w', 'A', 'D', 'S', 'W', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function isMoveKey(key) {
  return MoveKeys.includes(key);
}

export default class Client {
  constructor(store, dispatch) {
    this.store = store;
    this.dispatch = dispatch;
  }

  handleKeyDown(event) {
    const { key, direction } = event;

    if (key === Modifiers.CTRL) {
      this.dispatch(setCurrentTool(Tools.NUMBER));
    } else if (key === Modifiers.SHIFT) {
      this.dispatch(setCurrentTool(Tools.NOTE));
    } else if (key === Modifiers.ALT) {
      this.dispatch(setCurrentTool(Tools.COLOR));
    } else if (key >= 1 && key <= 9) {
      this.setSudokuData(key);
    } else if (key === Modifiers.BACKSPACE || key === Modifiers.DEL) {
      this.clearCellData();
    } else if (isMoveKey(key)) {
      this.moveSelected(direction);
    } else if (key === 'Escape') {
      this.dispatch(clearSelectedCells());
    }
  }

  setAppState(appState) {
    // const oldAppState = this.getAppState();

    switch (appState) {
      case AppState.GAME_COMPLETED:
        this.dispatch(setAppState(appState));
        break;

      default:
        break;
    }
  }

  handleKeyUp(event) {
    const { key } = event;

    const defaultTool = getDefaultTool(this.getState());
    switch (key) {
      case 'Control':
      case 'Alt':
      case 'Shift':
        this.dispatch(setCurrentTool(defaultTool));
        break;
      default:
        break;
    }
  }

  setSudokuData(value) {
    this.dispatch(setSudokuData(value));
  }

  clearCellData() {
    this.dispatch(clearCellData());
  }

  moveSelected(moveDirection) {
    const totalSelected = getTotalSelected(this.getState());
    let lastSelected = getLastSelected(this.getState());

    if (totalSelected > 1) {
      this.dispatch(setSelectedToLastSelected());
    } else {
      switch (moveDirection) {
        case Directions.UP:
          lastSelected -= GRID_SIZE;
          break;
        case Directions.DOWN:
          lastSelected += GRID_SIZE;
          break;
        case Directions.LEFT:
          lastSelected--;
          break;
        case Directions.RIGHT:
          lastSelected++;
          break;

        default:
          break;
      }

      if (lastSelected >= 0 && lastSelected <= 80) this.dispatch(changeLastSelected(lastSelected));
    }
  }

  getState() {
    return this.store.getState();
  }

  showModal(modalType, modalProps = null) {
    this.dispatch(showModal(modalType, modalProps));
  }

  getBox(data, row, col) {
    const box = [];
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        box.push(data[i + startRow][j + startCol].value);
      }
    }
    return box;
  }

  validateInput(data, pos) {
    const row = pos.y;
    const col = pos.x;

    const rowData = data[row].map(cell => cell.value);
    const colData = data.map(row => row[col].value);
    const box = this.getBox(data, row, col);

    const getSum = arr => arr.reduce((sum, cur) => sum + cur);

    return getSum(rowData) === 45 && getSum(colData) === 45 && getSum(box) === 45;
  }

  onSolveSudoku() {
    const state = this.getState();

    const { completed, data } = getCurrentBoard(state);

    if (completed) return;

    const boardData = data;
    const correctData = getSolution(state);

    boardData.forEach((row, rowNum) => {
      row.forEach((cell, col) => {
        cell.value = correctData[rowNum][col];
      });
    });

    this.dispatch(onSolveSudoku(boardData));
    this.showModal(ModalTypes.COMPLETED_GAME);
  }

  onSolveCell() {
    const state = this.getState();
    const { data, completed, cellsLeft } = getCurrentBoard(state);
    const totalSelected = getTotalSelected(state);
    const pos = toPoint(getLastSelected(state));
    const currentCell = getCell(state, pos);
    const correctValue = getCorrectValueForCell(state, pos);

    if (totalSelected === 0 || completed || currentCell.preFilled || currentCell.value === correctValue) {
      return;
    }

    this.dispatch(setCell(pos, correctValue));

    if (cellsLeft <= 1) {
      if (this.validateInput(data, pos)) {
        this.showModal(ModalTypes.COMPLETED_GAME);
        this.dispatch(onSolveSudoku());
      }
    }
  }

  solveSudoku() {
    const state = this.getState();

    const cellsLeft = getCellsLeft(state);
    const alreadyCompleted = isComplete(state);
    // If we just filled in the last cell check if sudoku is correct otherwise return.
    if (cellsLeft !== 0 || alreadyCompleted) return;

    const data = getData(state);

    const box = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const col = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getBox = (row, col) => toOneDimension([Math.floor(row / 3), Math.floor(col / 3)], 3);

    let correctRow = true;
    let correctCol = true;
    let correctBox = true;

    data.forEach((row, index) => {
      let rowSum = 0;
      row.forEach((cell, i) => {
        const { value } = cell;

        col[i] += value;
        box[getBox(index, i)] += value;
        rowSum += parseInt(value, 10);
      });

      if (rowSum !== 45) {
        correctRow = false;
      }
    });

    box.forEach(((value) => {
      if (value !== 45) {
        correctBox = false;
      }
    }));
    col.forEach(((value) => {
      if (value !== 45) {
        correctCol = false;
      }
    }));

    if (correctRow && correctCol && correctBox) {
      this.dispatch(clearSelectedCells());
      this.dispatch(onSolveSudoku());
      this.showModal(ModalTypes.COMPLETED_GAME);
    }
  }
}
