import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { showModal } from '../actions/modal';
import { MODAL_TYPES } from './modals/Modal';
import { getShowClock } from '../reducers/settings';
import strings from '../strings/main';
import TextButton from './buttons/TextButton';
import DifficultyOption from './LevelBar';
import { useWindowSize } from '../hooks/useDimensions';
import { clearBoard, solveCell, solveSudoku } from '../actions/sudoku';
import MenuBar from './MenuBar';

const useStyles = makeStyles(() => ({
  options: {
    borderBottom: '1px solid #a2a2a2',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    maxWidth: 1280,
    margin: '0 auto',
    flex: '1 1 auto',
  },

  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem',
  },
}));

const Options = React.forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {
    openSettings, showTimer, clearBoard, openHowToPlay, solvePuzzle, solveCell,
  } = props;
  const { width } = useWindowSize();

  const showTimerInOptions = width > 1000;

  const buttonData = [
    { text: strings.optionsBar.solveCell, onClick: solveCell },
    { text: strings.optionsBar.solvePuzzle, onClick: solvePuzzle },
    { text: strings.optionsBar.reset, onClick: clearBoard },
    { text: strings.optionsBar.howToPlay, onClick: openHowToPlay },
  ];

  const buttons = buttonData.map((data, index) => (
    <TextButton key={`help${index}`} onClick={data.onClick}>
      {data.text}
    </TextButton>
  ));

  return (
    <div ref={ref} className={classes.options}>
      <div className={classes.row}>
        <div className={classes.optionsRow}>
          <DifficultyOption />
          {showTimerInOptions && showTimer && <Timer />}
          <div>
            <MenuBar placement="bottom-end" buttonText={strings.optionsBar.help} buttons={buttons} showBorder />
            <TextButton onClick={openSettings}>{strings.optionsBar.settings}</TextButton>
          </div>
        </div>
      </div>
    </div>
  );
});

Options.propTypes = {
  openSettings: PropTypes.func.isRequired,
  openHowToPlay: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  solvePuzzle: PropTypes.func.isRequired,
  solveCell: PropTypes.func.isRequired,
  showTimer: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showTimer: getShowClock(state),
});

const mapDispatchToProps = dispatch => ({
  openSettings: () => dispatch(showModal(MODAL_TYPES.SETTINGS)),
  openHowToPlay: () => dispatch(showModal(MODAL_TYPES.HOW_TO_PLAY)),
  clearBoard: () => dispatch(clearBoard()),
  solvePuzzle: () => dispatch(solveSudoku()),
  solveCell: () => dispatch(solveCell()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Options);
