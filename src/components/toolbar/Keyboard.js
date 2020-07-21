import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToolCell from './ToolCell';
import ControlButton from './ControlButton';
import Tools from '../../constants/tools';
import ClearButton from '../ClearButton';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    width: '100%',
    marginLeft: 60,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
  },

  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  keyboardContainer: {
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },

  keyboard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  '@media (max-width: 1200px)': {
    root: {
      maxWidth: 720,
      marginLeft: 0,
      padding: 10,
    },
  },
});

const Keyboard = (props) => {
  const classes = useStyles(props);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const Grid = () => (
    <div className={classes.keyboard}>
      {numbers.map(((value, i) => <ToolCell key={i} value={value} />))}
      <ClearButton />
    </div>
  );


  return (
    <div className={classes.root}>
      <div className={classes.control}>
        <ControlButton name="Normal" id={Tools.NUMBER} />
        <ControlButton name="Note" id={Tools.NOTE} />
        <ControlButton name="Color" id={Tools.COLOR} />
      </div>
      <div className={classes.keyboardContainer}>
        <Grid />
      </div>
    </div>
  );
};

export default Keyboard;
