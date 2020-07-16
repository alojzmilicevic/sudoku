import axios from 'axios';
import { urlHost } from './constants'
import {
  FETCH_SUDOKU,
  ADD_TO_SELECTED_CELLS,
  CLEAR_SELECTED,
  SET_SUDOKU_SESSION,
  SET_SUDOKU_DATA
} from "../actions/types";
import { apiAction } from "../actions/sudoku";

const ROUTE = 'sudoku/'

const setSudoku = data => ({
  type: SET_SUDOKU_SESSION,
  payload: data
});

export const addToSelectedCells = cell => ({
  type: ADD_TO_SELECTED_CELLS,
  cell,
});

export const setSudokuData = (value) => ({
  type: SET_SUDOKU_DATA,
  value,
});

export const clearSelectedCells = () => ({
  type: CLEAR_SELECTED,
});

export const fetchSudoku = id => apiAction({
  url: urlHost + ROUTE + id,
  onSuccess: setSudoku,
  onFailure: () => console.error("Error occured loading articles"),
  label: FETCH_SUDOKU
});

export function fetchAll() {
  return axios({
    method: 'GET',
    url: urlHost + ROUTE,
  })
    .then(response => response.data)
    .catch(e => console.error(e));
}
