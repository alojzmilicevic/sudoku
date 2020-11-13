import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCompleted, getTimer } from '../reducers/sudoku';
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

const useStyles = makeStyles(theme => ({
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    maxWidth: 100,
  },

  timer: {
    fontSize: '1.2em',
  },

  button: {
    color: props => (props.completed ? 'transparent' : theme.palette.primary.textColor),
    minWidth: 0,
    padding: '5px 5px',

    '&:hover': {
      cursor: props => (props.completed ? 'default' : 'pointer'),
      color: props => (props.completed ? 'transparent' : theme.palette.primary.darkColor),
      backgroundColor: 'transparent',
    },
  },
}));

const IconButton = React.memo(({ classes, active, setActive }) => (
  <Button disableTouchRipple onClick={() => setActive(!active)} className={classes.button}>
    {active ? <PauseIcon className={classes.timer} /> : <PlayArrowIcon className={classes.timer} />}
  </Button>
));

IconButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

const Timer = React.memo((props) => {
  const [active, setActive] = useState(true);
  const { time, setTime, completed } = props;
  const classes = useStyles(props);

  useEffect(() => {
    let interval = null;
    if (active && !completed) {
      interval = setInterval(() => {
        setTime();
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, time, setTime, completed]);

  return (
    <div className={classes.timerContainer}>
      <span className={classes.timer}>
        {duration(time)}
      </span>
      <IconButton setActive={setActive} classes={classes} active={active} />
    </div>
  );
});

const mapStateToProps = state => ({
  time: getTimer(state),
  completed: getCompleted(state),
});

const mapDispatchToProps = dispatch => ({
  setTime: () => dispatch(incrementTime()),
});

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
