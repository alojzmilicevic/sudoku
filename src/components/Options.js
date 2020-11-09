import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiSettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import Timer from './Timer';
import { showModal } from '../actions/modal';
import { ModalTypes } from './modals/Modal';
import { getShowClock } from '../reducers/settings';
import strings from '../strings/main';
import TextButton from './buttons/TextButton';
import DifficultyOption from './LevelBar';
import { useWindowSize } from '../hooks/useDimensions';
import {
  clearBoard, solveCell, solveSudoku,
} from '../actions/sudoku';
import MenuBar from './MenuBar';

const useStyles = makeStyles(theme => ({
  options: {
    borderBottom: '1px solid #a2a2a2',
    position: 'relative',
    alignItems: 'center',
  },

  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    fontSize: '1em',
    color: theme.palette.primary.main,
  },
}));

const Options = React.forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {
    openSettings, showTimer, clearBoard, openHowToPlay, solvePuzzle, solveCell,
  } = props;
  const { width } = useWindowSize();

  const showTimerInOptions = width > 1000;
  const showSettingsIcon = width < 750;

  const buttonData = [
    { text: strings.optionsBar.solveCell, onClick: solveCell },
    { text: strings.optionsBar.solvePuzzle, onClick: solvePuzzle },
    { text: strings.optionsBar.reset, onClick: clearBoard, showBorder: true },
    { text: strings.optionsBar.howToPlay, onClick: openHowToPlay },
  ];

  const buttons = buttonData.map((data, index) => {
    if (data.showBorder) {
      return (
        <TextButton
          style={{ width: '100%' }}
          showBorder
          key={`help${index}`}
          onClick={data.onClick}
        >
          {data.text}
        </TextButton>
      );
    }
    return (
      <TextButton key={`help${index}`} onClick={data.onClick}>
        {data.text}
      </TextButton>
    );
  });

  const SettingsIcon = () => (
    <IconButton onClick={openSettings}>
      <MuiSettingsIcon className={classes.icon} />
    </IconButton>
  );

  return (
    <div ref={ref} className={classes.options}>
      <div className="row">
        <div className={classes.optionsRow}>
          <DifficultyOption />
          {showTimerInOptions && showTimer && <Timer />}
          <div>
            <MenuBar placement="bottom-end" buttonText={strings.optionsBar.help} buttons={buttons} showBorder />
            {
              showSettingsIcon ? <SettingsIcon />
                : <TextButton onClick={openSettings}>{strings.optionsBar.settings}</TextButton>
            }
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
  openSettings: () => dispatch(showModal(ModalTypes.SETTINGS)),
  openHowToPlay: () => dispatch(showModal(ModalTypes.HOW_TO_PLAY)),
  clearBoard: () => dispatch(clearBoard()),
  solvePuzzle: () => dispatch(solveSudoku()),
  solveCell: () => dispatch(solveCell()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Options);
