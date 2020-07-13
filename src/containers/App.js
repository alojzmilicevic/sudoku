import React, { Component } from 'react';
import { init } from "../actions/client";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import AppState from "../constants/appStates";
import LoadingIndicator from "../components/LoadingSpinner";
import Client from "./Client";

class App extends Component {
  componentDidMount() {
    const { init, match } = this.props;

    const { sudokuId } = match.params;
    init(sudokuId);
  }

  render() {
    const { appState } = this.props;

    if (appState && appState !== AppState.FETCHING_SESSION) {
      return <Client />
    } else {

    }
    return <LoadingIndicator />
  }
}


const mapStateToProps = state => ({
  appState: state.client.appState,
});

const mapDispatchToProps = dispatch => ({
  init: (sudokuId) => dispatch(init(sudokuId)),
});


App.propTypes = {
  init: PropTypes.func.isRequired,
  test: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
