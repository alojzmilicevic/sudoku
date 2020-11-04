import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimer } from '../reducers/sudoku';
import { incrementTime } from '../actions/sudoku';
import { formatTime } from '../utilities/util';

/**
 * Function to measure the duration of the call
 * and format it to nice and readable numbers
 */
function duration(time) {
  if (time != null) {
    return formatTime(time);
  }
  return '00:00';
}

const useStyles = makeStyles({
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    maxWidth: 100,
  },

  timer: {
    fontSize: 24,
  },

  button: {
    color: '#575757',

    '&:hover': {
      color: '#333',
      backgroundColor: 'transparent',
    },
  },
});

const Timer = (props) => {
  const [active, setActive] = useState(true);
  const classes = useStyles(props);
  const { time, setTime } = props;


  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime();
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, time, setTime]);

  const StartButton = () => (
    <Button onClick={() => setActive(true)} className={classes.button}>
      <PlayArrowIcon style={{ width: 30, height: 30 }} />
    </Button>
  );
  const PauseButton = () => (
    <Button onClick={() => setActive(false)} className={classes.button}>
      <PauseIcon style={{ width: 30, height: 30 }} />
    </Button>
  );

  return (
    <div className={classes.timerContainer}>
      <span className={classes.timer}>
        {duration(time)}
      </span>
      {active ? <PauseButton /> : <StartButton />}
    </div>
  );
};

const mapStateToProps = state => ({
  time: getTimer(state),
});

const mapDispatchToProps = dispatch => ({
  setTime: () => dispatch(incrementTime()),
});

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
