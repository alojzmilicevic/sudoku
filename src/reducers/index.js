import reduceReducers from 'reduce-reducers';
import client from './client';
import sudoku from './sudoku';
import tools from './tools';
import selected from './selected';
import Tools from '../constants/tools';
import modal from './modal';
import settings, { settingsInitialState } from './settings';
import { Levels } from '../constants/levels';

const initialBoardData = {
  cellsLeft: -1,
  data: [],
  completed: false,
};

const initialState = {
  boards: {
    [Levels.EASY]: { ...initialBoardData },
    [Levels.MEDIUM]: { ...initialBoardData },
    [Levels.HARD]: { ...initialBoardData },
  },
  level: Levels.EASY,
  defaultTool: Tools.NUMBER,
  currentTool: Tools.NUMBER,
  appState: '',
  selected: [],
  totalSelected: 0,
  lastSelected: 0,
  modalType: null,
  modalProps: {},
  settings: { ...settingsInitialState },
};

export default reduceReducers(initialState, selected, client, sudoku, tools, modal, settings);
