import { useEffect, useState } from "react";

const Modifiers = {
  CTRL: 17,
  SHIFT: 16,
  DEL: 46,
  BACKSPACE: 8,
}

const initialState = {
  [Modifiers.CTRL]: false,
  [Modifiers.SHIFT]: false,
};

export default function useKeyPressed(callBack) {
  const [modState, set] = useState(initialState);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleKeyDown(e) {
      // If a modifier key is pressed
      if (e.keyCode === Modifiers.CTRL || e.keyCode === Modifiers.SHIFT) {
        set(prevState => {
          prevState[e.keyCode] = true;
          return prevState;
        });
      } else if (e.keyCode >= 49 && e.keyCode <= 57) {
        callBack(e.key);
      } else if (e.keyCode === Modifiers.BACKSPACE || e.keyCode === Modifiers.DEL) {
        callBack(0);
      }
    }


    function handleKeyUp(e) {
      // If a modifier key is released
      if (e.keyCode === Modifiers.CTRL || e.keyCode === Modifiers.SHIFT) {
        set(prevState => {
          prevState[e.keyCode] = false;
          return prevState;
        });
      }
      e.stopPropagation();
      e.preventDefault();
    }


    // Bind the event listener
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

    };
  }, [callBack, modState]);

  return modState;
}
