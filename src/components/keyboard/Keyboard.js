import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ToolCell from './ToolCell';
import Tools from '../../constants/tools';
import Button from '../buttons/Button';
import { setDefaultTool } from '../../actions/tools';
import { getCurrentTool } from '../../reducers/tools';
import ClearButton from '../ClearButton';
import strings from '../../strings/main';

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    width: '100%',
    marginLeft: 60,
    display: 'flex',
    flexDirection: 'column',
  },

  control: {
    display: 'flex',
  },

  keyboard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  '@media (max-width: 1200px)': {
    root: {
      maxWidth: 380,
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
        <Button
          style={{ marginRight: 5 }}
          onClick={() => setNumberTool()}
          text={strings.keyboard.normal}
          selected={currentTool === Tools.NUMBER}
        />
        <Button
          style={{ marginLeft: 5, marginRight: 5 }}
          onClick={() => setNotesTool()}
          text={strings.keyboard.note}
          selected={currentTool === Tools.NOTE}
        />
        <Button
          style={{ marginLeft: 5 }}
          onClick={() => setColorTool()}
          text={strings.keyboard.color}
          selected={currentTool === Tools.COLOR}
        />
      </div>
      <Grid />
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
