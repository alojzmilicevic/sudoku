import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import AppState from '../constants/appStates';
import LoadingIndicator from '../components/LoadingSpinner';
import Client from './Client';
import { createTheme } from '../theme/theme';
import { loadSudoku } from '../actions/sudoku';

function App(props) {
  const { appState, loadSudoku } = props;
  const appTheme = createTheme();

  useEffect(() => {
    loadSudoku();
  }, [loadSudoku]);

  if (appState && appState !== AppState.FETCHING_SESSION) {
    return (
      <MuiThemeProvider theme={appTheme}>
        <Client />
      </MuiThemeProvider>
    );
  }

  return <LoadingIndicator />;
}

const mapStateToProps = state => ({
  appState: state.appState,
});

const mapDispatchToProps = dispatch => ({
  loadSudoku: () => dispatch(loadSudoku()),
});

App.propTypes = {
  loadSudoku: PropTypes.func.isRequired,
  appState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
