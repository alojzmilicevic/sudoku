import {
  changeLastSelected, onSolveSudoku, setSelectedToLastSelected, setSudokuData,
  setCurrentTool,
} from '../actions/sudoku';
import {
  getData, getDefaultTool, getLastSelected, getSelectedCells,
} from '../reducers/sudoku';
import { GRID_SIZE } from '../constants/constants';
import { toOneDimension } from '../utilities/util';

import Tools from '../constants/tools';
import { Modifiers, Directions } from '../constants/keyboard';

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
    const {
      Control, key, direction,
    } = event;

    // Since we are preventing default behaviour we should allow page reload this way.
    if (Control && key === 'r') window.location.reload();


    if (key === Modifiers.CTRL) {
      this.dispatch(setCurrentTool(Tools.NUMBER));
    } else if (key === Modifiers.SHIFT) {
      this.dispatch(setCurrentTool(Tools.NOTE));
    } else if (key === Modifiers.ALT) {
      this.dispatch(setCurrentTool(Tools.COLOR));
    } else if (key >= 1 && key <= 9) {
      this.setSudokuData(key);
    } else if (key === Modifiers.BACKSPACE || key === Modifiers.DEL) {
      this.setSudokuData(0);
    } else if (isMoveKey(key)) {
      this.moveSelected(direction);
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

  moveSelected(moveDirection) {
    const selected = getSelectedCells(this.getState());
    const selectedSize = Object.keys(selected).length;
    const previousLastSelected = getLastSelected(this.getState());
    let lastSelected = previousLastSelected;

    if (selectedSize > 1) {
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

      if (lastSelected < 0 || lastSelected > 80) {
        lastSelected = previousLastSelected;
      }

      this.changeLastSelected(lastSelected);
    }
  }

  changeLastSelected(value) {
    this.dispatch(changeLastSelected(value));
  }

  getState() {
    return this.store.getState();
  }

  solveSudoku() {
    const data = getData(this.getState());

    const box = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const col = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const getBox = (row, col) => toOneDimension([Math.floor(row / 3), Math.floor(col / 3)], 3);

    let correctRow = true;
    let correctCol = true;
    let correctBox = true;

    Object.entries(data).forEach(([rowIndex, row]) => {
      let rowSum = 0;
      row.forEach((value, i) => {
        col[i] += value;
        box[getBox(rowIndex, i)] += value;
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
      this.dispatch(onSolveSudoku());
    }
  }
}
