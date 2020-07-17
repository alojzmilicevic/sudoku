import { useEffect, useState } from 'react';

const Modifiers = {
  BACKSPACE: 'Backspace',
  SHIFT: 'Shift',
  CTRL: 'Control',
  ALT: 'Alt',
  DEL: 'Delete',
};

export const Directions = {
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left',
};

const initialState = {
  [Modifiers.SHIFT]: false,
  [Modifiers.CTRL]: false,
  [Modifiers.ALT]: false,
  key: 'NaN',
  direction: 'Nan',
};


const isUpAction = key => key === 'w' || key === 'W' || key === 'ArrowUp';
const isDownAction = key => key === 's' || key === 'S' || key === 'ArrowDown';
const isRightAction = key => key === 'd' || key === 'D' || key === 'ArrowRight';
const isLeftAction = key => key === 'a' || key === 'A' || key === 'ArrowLeft';

function isModifier(key) {
  return key === Modifiers.SHIFT || key === Modifiers.CTRL || key === Modifiers.ALT;
}

export default function useKeyPressed(onKeyDown, onKeyUp) {
  const [modState, set] = useState(initialState);

  useEffect(() => {
    /**
     * Handles keydown events:
     * if (and only if) keyCode is a modifier, set that modifier to down.
     */
    function handleKeyDown(e) {
      const { key } = e;

      if (isModifier(key)) {
        set((prevState) => {
          prevState[key] = true;
          return prevState;
        });
      } else {
        set((prevState) => {
          prevState.key = key;
          if (isUpAction(key)) {
            prevState.direction = Directions.UP;
          } else if (isDownAction(key)) {
            prevState.direction = Directions.DOWN;
          } else if (isRightAction(key)) {
            prevState.direction = Directions.RIGHT;
          } else if (isLeftAction(key)) {
            prevState.direction = Directions.LEFT;
          }
          return prevState;
        });
        onKeyDown(modState);
      }
    }

    function handleKeyUp(e) {
      const { key } = e;

      // If a modifier key is released
      if (isModifier(key)) {
        set((prevState) => {
          prevState[key] = false;
          return prevState;
        });
      } else {
        set((prevState) => {
          prevState.key = key;
          return prevState;
        });

        onKeyUp(modState);
      }
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
