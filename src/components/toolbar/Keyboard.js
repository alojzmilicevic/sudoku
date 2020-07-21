import Button from '@material-ui/core/Button';
import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { clearCellData } from '../../actions/sudoku';
import ToolCell from './ToolCell';
import ControlButton from './ControlButton';
import Tools from '../../constants/tools';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    width: '100%',
    marginLeft: 60,
    height: props => props.size,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
  },

  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  deleteButton: {
    backgroundColor: '#e6e6e6',
    marginTop: 14,
    height: 48,
    border: '1px solid #959595',
    borderRadius: 3,
    color: 'black',

    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
  },
  keyboardContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },

  keyboard: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const Keyboard = (props) => {
  const classes = useStyles(props);
  const { clearCellData } = props;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const Grid = () => (
    <div className={classes.keyboard}>
      {numbers.map(((value, i) => <ToolCell key={i} value={value} />))}
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
        <Button disableTouchRipple onClick={() => clearCellData()} className={classes.deleteButton}>
          <ClearIcon />
        </Button>
      </div>

    </div>
  );
};

Keyboard.propTypes = {
  clearCellData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearCellData: () => dispatch(clearCellData()),
});

export default connect(null, mapDispatchToProps)(Keyboard);
