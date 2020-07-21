import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Tools from '../../constants/tools';
import { setSudokuData } from '../../actions/sudoku';
import { getCurrentTool } from '../../reducers/sudoku';
import { Colors } from '../../constants/constants';

const useStyles = makeStyles({
  root: {
    width: 115,
    height: 115,
    backgroundColor: '#e6e6e6',
    color: '#000',
    border: '1px solid #959595',
    borderRadius: 3,
    marginTop: 14,
    cursor: 'pointer',
    fontSize: '4em',
    fontWeight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  colorStyle: {
    backgroundColor: props => Colors[props.value - 1],
  },

  noteStyle: {
    fontSize: '1.3em',
    justifyContent: 'initial',
    alignItems: 'initial',
  },

  text: {
    margin: 10,
  },
});

const ToolCell = (props) => {
  const { value, currentTool, setSudokuData } = props;
  const classes = useStyles(props);

  let className = '';
  switch (currentTool) {
    case Tools.NUMBER:
      className = classes.root;
      break;
    case Tools.NOTE:
      className = clsx(classes.root, classes.noteStyle);
      break;
    case Tools.COLOR:
      className = clsx(classes.root, classes.colorStyle);
      break;
    default:
      break;
  }

  return (
    <div role="button" onClick={() => setSudokuData(value)} className={className}>
      <span className={classes.text}>
        {currentTool !== Tools.COLOR && value}
      </span>
    </div>
  );
};

ToolCell.propTypes = {
  value: PropTypes.number.isRequired,
  currentTool: PropTypes.number.isRequired,
  setSudokuData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setSudokuData: value => dispatch(setSudokuData(value)),
});

const mapStateToProps = state => ({
  currentTool: getCurrentTool(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(ToolCell);
