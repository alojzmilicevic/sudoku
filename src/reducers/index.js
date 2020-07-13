import { combineReducers } from 'redux';
import client from "./client";
import sudoku from "./sudoku";

export default combineReducers({
  client,
  sudoku,
});
