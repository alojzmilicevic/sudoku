import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';

function formatDurationMMSS(duration) {
  const totalSeconds = Math.floor(duration);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds / 60) % 60);
  let seconds = Math.floor(totalSeconds % 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Function to measure the duration of the call
 * and format it to nice and readable numbers
 */
function duration(time) {
  if (time != null) {
    return formatDurationMMSS(time);
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
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);

  const classes = useStyles(props);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, seconds]);

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
        {duration(seconds)}
      </span>
      {active ? <PauseButton /> : <StartButton />}
    </div>
  );
};

export default Timer;
