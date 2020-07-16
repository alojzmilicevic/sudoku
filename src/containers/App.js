import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { init } from '../actions/client';
import AppState from '../constants/appStates';
import LoadingIndicator from '../components/LoadingSpinner';
import Client from './Client';

class App extends Component {
  componentDidMount() {
    const { init, match } = this.props;

    const { sudokuId } = match.params;
    init(sudokuId);
  }

  render() {
    const { appState } = this.props;

    if (appState && appState !== AppState.FETCHING_SESSION) {
      return <Client />;
    }

    return <LoadingIndicator />;
  }
}

const mapStateToProps = (state) => ({
  appState: state.client.appState,
});

const mapDispatchToProps = (dispatch) => ({
  init: (sudokuId) => dispatch(init(sudokuId)),
});

App.propTypes = {
  init: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
