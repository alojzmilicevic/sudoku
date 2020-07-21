import { useEffect, useState } from 'react';
import { Directions } from '../constants/keyboard';

const initialState = {
  key: '',
  direction: '',
};

const exceptions = ['c', 'C', 'i', 'I'];

const isUpAction = key => key === 'w' || key === 'W' || key === 'ArrowUp';
const isDownAction = key => key === 's' || key === 'S' || key === 'ArrowDown';
const isRightAction = key => key === 'd' || key === 'D' || key === 'ArrowRight';
const isLeftAction = key => key === 'a' || key === 'A' || key === 'ArrowLeft';

export default function useKeyPressed(onKeyDown, onKeyUp) {
  const [modState, set] = useState(initialState);

  useEffect(() => {
    /**
     * Handles keydown events:
     * if (and only if) keyCode is a modifier, set that modifier to down.
     */
    function handleKeyDown(e) {
      const {
        key, ctrlKey, shiftKey, altKey,
      } = e;

      // Enable page reload!
      if (ctrlKey && (key === 'r' || key === 'R')) {
        window.location.reload();
      }

      const modifiers = { ctrlKey, shiftKey, altKey };

      let keyValue = key;

      if (e.keyCode >= 49 && e.keyCode <= 57) keyValue = e.keyCode - 48;

      set((prevState) => {
        prevState.key = keyValue;
        if (isUpAction(key)) {
          prevState.direction = Directions.UP;
        } else if (isDownAction(keyValue)) {
          prevState.direction = Directions.DOWN;
        } else if (isRightAction(keyValue)) {
          prevState.direction = Directions.RIGHT;
        } else if (isLeftAction(keyValue)) {
          prevState.direction = Directions.LEFT;
        }
        return prevState;
      });

      onKeyDown(modState, modifiers);

      /* If ctrl & shift are down and exceptions include key */
      if (!(ctrlKey && shiftKey && exceptions.includes(key))) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function handleKeyUp(e) {
      const { key } = e;
      const oldState = { ...modState, key };

      set((prevState) => {
        prevState.key = '';
        prevState.direction = '';
        return prevState;
      });

      onKeyUp(oldState);
      e.preventDefault();
      e.stopPropagation();
    }

    // Bind the event listener
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [modState, onKeyDown, onKeyUp]);

  return modState;
}
