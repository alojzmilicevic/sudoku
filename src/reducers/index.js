import reduceReducers from 'reduce-reducers';
import client from './client';
import sudoku from './sudoku';
import tools from './tools';
import selected from './selected';
import Tools from '../constants/tools';

const initialState = {
  lastSelected: 0,
  selected: {},
  initialData: {},
  completed: false,
  defaultTool: Tools.NUMBER,
  currentTool: Tools.NUMBER,
  appState: '',
};

export default reduceReducers(initialState, selected, client, sudoku, tools);
