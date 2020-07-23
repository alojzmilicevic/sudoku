import reduceReducers from 'reduce-reducers';
import client from './client';
import sudoku from './sudoku';
import tools from './tools';
import selected from './selected';
import Tools from '../constants/tools';

const initialState = {
  initialData: [],
  completed: false,
  defaultTool: Tools.NUMBER,
  currentTool: Tools.NUMBER,
  appState: '',
  cellsLeft: 0, // Cells left to fill until sudoku is completed
  totalSelected: 0,
  selected: [],
  lastSelected: 0,
};

export default reduceReducers(initialState, selected, client, sudoku, tools);
