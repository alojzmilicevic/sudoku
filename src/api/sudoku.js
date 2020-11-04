import axios from 'axios';
import { urlHost } from './constants';
import {
  FETCH_SUDOKU,
} from '../actions/types';
import { setSudoku } from '../actions/sudoku';
import { apiAction } from '../actions/api';

const ROUTE = 'sudoku/';

export const fetchSudoku = id => apiAction({
  url: urlHost + ROUTE,
  onSuccess: setSudoku,
  onFailure: () => console.error('Error occured loading articles'),
  label: FETCH_SUDOKU,
});

export function fetchAll() {
  return axios({
    method: 'GET',
    url: urlHost + ROUTE,
  })
    .then(response => response.data)
    .catch(e => console.error(e));
}
