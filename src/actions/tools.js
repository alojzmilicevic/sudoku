export const SET_DEFAULT_TOOL = 'SET_DEFAULT_TOOL';
export const SET_CURRENT_TOOL = 'SET_CURRENT_TOOL';

export const setDefaultTool = tool => ({
  type: SET_DEFAULT_TOOL,
  tool,
});

export const setCurrentTool = tool => ({
  type: SET_CURRENT_TOOL,
  tool,
});
