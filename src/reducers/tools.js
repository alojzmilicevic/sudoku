import { SET_CURRENT_TOOL, SET_DEFAULT_TOOL } from '../actions/tools';

export default function tools(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_TOOL: {
      const { boards, level } = state;
      const { completed } = boards[level];
      if (completed) {
        return state;
      }

      const { tool } = action;

      return { ...state, currentTool: tool };
    }
    case SET_DEFAULT_TOOL: {
      const { boards, level } = state;
      const { completed } = boards[level];
      if (completed) {
        return state;
      }

      const { tool } = action;
      return {
        ...state,
        defaultTool: tool,
        currentTool: tool,
      };
    }
    default:
      return state;
  }
}

export const getDefaultTool = state => state.defaultTool;
export const getCurrentTool = state => state.currentTool;
