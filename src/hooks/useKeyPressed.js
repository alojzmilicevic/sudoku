import { useEffect, useState } from 'react';

const Modifiers = {
  BACKSPACE: 8,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  DEL: 46,
};

const initialState = {
  [Modifiers.SHIFT]: false,
  [Modifiers.CTRL]: false,
  [Modifiers.ALT]: false,
};

function isModifier(keyCode) {
  return keyCode === Modifiers.SHIFT || keyCode === Modifiers.CTRL || keyCode === Modifiers.ALT;
}

function modifierDown(e) {
  return e.shiftKey || e.ctrlKey || e.altKey;
}

export default function useKeyPressed(callBack) {
  const [modState, set] = useState(initialState);

  useEffect(() => {
    /**
     * Handles keydown events:
     *
     * if (and only if) keyCode is a modifier, set that modifier to down.
     *
     * keyCode 49-57 are numbers 1-9. If we get a key code in this range we need to make sure we dont press a modifier.
     * This is because special keys like [!, ", ...] share key code values with the numbers 1-9.
     */
    function handleKeyDown(e) {
      const { keyCode, key } = e;

      if (isModifier(keyCode)) {
        set((prevState) => {
          prevState[keyCode] = true;
          return prevState;
        });
      } else if (keyCode >= 49 && keyCode <= 57) {
        if (!modifierDown(e)) {
          callBack(key);
        } else {
          // set small numbers
        }
      } else if (keyCode === Modifiers.BACKSPACE || keyCode === Modifiers.DEL) {
        callBack(0);
      }
    }

    function handleKeyUp(e) {
      const { keyCode } = e;

      // If a modifier key is released
      if (isModifier(keyCode)) {
        set((prevState) => {
          prevState[keyCode] = false;
          return prevState;
        });
      }
      e.stopPropagation();
      e.preventDefault();
    }

    // Bind the event listener
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [callBack, modState]);

  return modState;
}
