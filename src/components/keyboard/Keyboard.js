import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ToolCell from './ToolCell';
import Tools from '../../constants/tools';
import ClearButton from '../ClearButton';
import Button from '../buttons/Button';
import { setDefaultTool } from '../../actions/tools';
import { getCurrentTool } from '../../reducers/tools';

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

  const {
    currentTool, setNumberTool, setNotesTool, setColorTool,
  } = props;

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
        <Button onClick={() => setNumberTool()} text="Normal" selected={currentTool === Tools.NUMBER} />
        <Button onClick={() => setNotesTool()} text="Note" selected={currentTool === Tools.NOTE} />
        <Button onClick={() => setColorTool()} text="Color" selected={currentTool === Tools.COLOR} />
      </div>
      <div className={classes.keyboardContainer}>
        <Grid />
      </div>
    </div>
  );
};

Keyboard.propTypes = {
  currentTool: PropTypes.number.isRequired,
  setNumberTool: PropTypes.func.isRequired,
  setNotesTool: PropTypes.func.isRequired,
  setColorTool: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setNumberTool: () => dispatch(setDefaultTool(Tools.NUMBER)),
  setNotesTool: () => dispatch(setDefaultTool(Tools.NOTE)),
  setColorTool: () => dispatch(setDefaultTool(Tools.COLOR)),
});

const mapStateToProps = state => ({
  currentTool: getCurrentTool(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
