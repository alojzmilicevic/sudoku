import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Sudoku from '../components/Sudoku';
import { useWindowSize } from '../hooks/useDimensions';
import { getGridSize } from '../utilities/util';
import Keyboard from '../components/toolbar/Keyboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearSelectedCells } from '../actions/selected';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: props => props.width,
    height: props => props.height,
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontFamily: theme.typography.fontFamily,
  },

  contentWrapper: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: '1 0 auto',
  },

  main: {
    flex: '1 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
}));

const Client = (props) => {
  const dimensions = useWindowSize(props);
  const classes = useStyles(dimensions);
  const size = getGridSize(dimensions.width, dimensions.height);
  const { clearSelectedCells } = props;

  const clearCells = (wrapperRef, e, clearSelectedCells) => {
    if (wrapperRef.current === e.target || !wrapperRef.current.contains(e.target)) {
      clearSelectedCells();
    }
  };

  const wrapperRef = createRef();
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={e => clearCells(wrapperRef, e, clearSelectedCells)}
      className={classes.container}
    >
      <Header />

      <div className={classes.contentWrapper}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={classes.main}
          ref={wrapperRef}
        >
          <Sudoku size={size} />
          <Keyboard size={size} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

Client.propTypes = {
  clearSelectedCells: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearSelectedCells: () => dispatch(clearSelectedCells()),
});

export default connect(null, mapDispatchToProps)(Client);
