import axios from 'axios';
import { urlHost } from './constants'
import { FETCH_SUDOKU, SET_SELECTED, SET_SUDOKU } from "../actions/types";
import { apiAction } from "../actions/sudoku";

const ROUTE = 'sudoku/'

const setSudoku = data => ({
  type: SET_SUDOKU,
  payload: data
});

export const setSelected = selected => ({
  type: SET_SELECTED,
  selected,
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
