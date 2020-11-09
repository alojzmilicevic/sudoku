import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Sudoku from '../components/Sudoku';
import { useWindowSize } from '../hooks/useDimensions';
import { getGridSize } from '../utilities/util';
import Keyboard from '../components/keyboard/Keyboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearSelectedCells } from '../actions/selected';
import Options from '../components/Options';
import TitleBar from '../components/TitleBar';
import ModalRoot from '../components/modals/Modal';
import Timer from '../components/Timer';
import { getShowClock } from '../reducers/settings';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: props => props.width,
    height: props => props.height,
    backgroundColor: theme.palette.primary.frontColor,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontFamily: theme.typography.fontFamily,
  },

  contentWrapper: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  main: {
    flex: '1 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  '@media (max-width: 1200px)': {
    main: {
      flexDirection: 'column',
    },

    contentWrapper: {
      marginTop: 0,
      marginBottom: 0,
    },
  },
}));

const Client = (props) => {
  const dimensions = useWindowSize(props);
  const classes = useStyles(dimensions);
  const size = getGridSize(dimensions.width, dimensions.height);
  const {
    clearSelectedCells, showTimer,
  } = props;

  const clearCells = (wrapperRef, e, clearSelectedCells, okRef) => {
    const shouldClear = (wrapperRef.current === e.target
      || !wrapperRef.current.contains(e.target))
      && !okRef.current.contains(e.target);

    if (shouldClear) {
      clearSelectedCells();
    }
  };

  const showTimerInMainWindow = dimensions.width <= 1000;
  const showHeader = dimensions.width > 750;

  const okRef = createRef();
  const wrapperRef = createRef();
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={e => clearCells(wrapperRef, e, clearSelectedCells, okRef)}
      className={classes.container}
    >
      <ModalRoot />
      {showHeader && (
        <React.Fragment>
          <Header />
          <TitleBar />
        </React.Fragment>
      )
      }
      <Options ref={okRef} />
      <div className={classes.contentWrapper}>
        {showTimerInMainWindow && showTimer && <Timer />}
        <div
          className={classes.main}
          ref={wrapperRef}
        >
          <Sudoku size={size} />
          <Keyboard width={dimensions.width} size={size} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

Client.propTypes = {
  clearSelectedCells: PropTypes.func.isRequired,
  showTimer: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearSelectedCells: () => dispatch(clearSelectedCells()),
});

const mapStateToProps = state => ({
  showTimer: getShowClock(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
