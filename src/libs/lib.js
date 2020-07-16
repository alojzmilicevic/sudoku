import { setAppState } from '../actions/client';
import { getAppState } from '../reducers/client';
import AppState from '../constants/appStates';
import * as SudokuApi from '../api/sudoku';

export default class Client {
  constructor(store, dispatch, sudokuId) {
    this.store = store;
    this.dispatch = dispatch;
    this.makeInitialRequests(sudokuId);
  }

  async makeInitialRequests(sudokuId) {
    try {
      this.setAppState(AppState.FETCHING_SESSION);
      await this.dispatch(SudokuApi.fetchSudoku(sudokuId));
      this.setAppState(AppState.READY_TO_PLAY);
    } catch (e) {
      console.error(e);
    }
  }

  setAppState(appState) {
    // const oldAppState = this.getAppState();
    this.dispatch(setAppState(appState));
  }

  getAppState() {
    return getAppState(this.store.getState());
  }
}
