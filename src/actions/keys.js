export const HANDLE_KEY_DOWN = 'HANDLE_KEY_DOWN';
export const HANDLE_KEY_UP = 'HANDLE_KEY_UP';


export const handleKeyDown = (event, modifiers) => ({
  type: HANDLE_KEY_DOWN,
  event,
  modifiers,
});

export const handleKeyUp = event => ({
  type: HANDLE_KEY_UP,
  event,
});
