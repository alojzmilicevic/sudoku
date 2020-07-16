import {
  changeLastSelected, setSelectedToLastSelected, setSudokuData,
} from '../actions/sudoku';
import { getLastSelected, getSelectedCells } from '../reducers/sudoku';
import { Directions } from '../hooks/useKeyPressed';
import { GRID_SIZE } from '../constants/constants';

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

    if (key >= 1 && key <= 9) {
      this.setSudokuData(key);
    } else if (key === 'Backspace' || key === 'Delete') {
      this.setSudokuData(0);
    } else if (isMoveKey(key)) {
      this.moveSelected(direction);
    }
  }

  handleKeyUp(event) {
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
}
