import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarsIcon from '@material-ui/icons/Stars';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../strings/main';
import Button from '../buttons/Button';
import { getCompletedBoards, getLevel, getTimer } from '../../reducers/sudoku';
import { formatTime } from '../../utilities/util';
import { setLevel } from '../../actions/sudoku';
import { hideModal } from '../../actions/modal';

const useStyles = makeStyles(theme => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },

  star: {
    height: theme.spacing(10),
    width: '100%',
    color: theme.palette.primary.light,
  },

  head: {
    fontWeight: 550,
  },

  button: {
    color: 'black',
  },
}));

const CompletedModal = (props) => {
  const classes = useStyles();
  const {
    completedData, level, time, setLevel, closeModal,
  } = props;
  const data = Object.keys(completedData).filter(a => !completedData[a]);

  const handleClick = () => {
    setLevel(data[0]);
    closeModal();
  };

  return (
    <div className={classes.dialog}>
      <StarsIcon className={classes.star} />
      <Typography className={classes.head} variant="h3">
        {`${strings.congrats}!`}
      </Typography>
      <Typography style={{ textAlign: 'center' }} variant="h6">
        {`${strings.formatString(strings.puzzleFinished, strings.optionsBar[level], formatTime(time))}!`}
      </Typography>
      {data.length === 0 ? null
        : <Button className={classes.button} onClick={handleClick} text={strings.playAnother} /> }
    </div>
  );
};

CompletedModal.propTypes = {
  completedData: PropTypes.objectOf(PropTypes.any).isRequired,
  level: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  setLevel: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setLevel: level => dispatch(setLevel(level)),
  closeModal: () => dispatch(hideModal()),
});

const mapStateToProps = state => ({
  level: getLevel(state),
  time: getTimer(state),
  completedData: getCompletedBoards(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedModal);
