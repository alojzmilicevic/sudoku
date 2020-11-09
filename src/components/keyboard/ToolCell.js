import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Tools from '../../constants/tools';
import { clearCellData, setSudokuData } from '../../actions/sudoku';
import { getCurrentTool } from '../../reducers/tools';
import { Colors } from '../../constants/constants';
import { getCompleted } from '../../reducers/sudoku';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 70,
    minHeight: 70,
    backgroundColor: theme.keyboardColors.background,
    color: props => (props.completed ? theme.keyboardColors.notSelectableColor
      : theme.keyboardColors.textColor),
    border: `1px solid ${theme.keyboardColors.borderColor}`,
    borderRadius: 3,
    marginTop: 14,
    cursor: 'pointer',
    fontSize: '2em',
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

  '@media (max-width: 1200px)': {
    root: {
      width: 'calc(100% / 5 - 2%)',
      fontSize: '1.3em',
      minHeight: 45,
      minWidth: 0,
    },

    noteStyle: {
      fontSize: '1.1em',
      justifyContent: 'initial',
      alignItems: 'initial',
    },

    text: {
      margin: 5,
    },
  },
}));

const ToolCell = (props) => {
  const {
    value, currentTool, setSudokuData, clearCellData, ...other
  } = props;
  const classes = useStyles(props);

  const onClick = value === 'x' ? () => clearCellData(value)
    : () => setSudokuData(value);

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
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div {...other} role="button" onClick={onClick} className={className}>
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
  clearCellData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setSudokuData: value => dispatch(setSudokuData(value)),
  clearCellData: () => dispatch(clearCellData()),
});

const mapStateToProps = state => ({
  currentTool: getCurrentTool(state),
  completed: getCompleted(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(ToolCell);
