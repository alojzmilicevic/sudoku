import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { addToSelectedCells, clearSelectedCells } from '../actions/sudoku';
import { getCellData, isCellMutable, isCellSelected } from '../reducers/sudoku';
import useMouseDown from '../hooks/useMouseDown';
import { isNotZero } from '../utilities/util';

const useStyles = makeStyles({
  notesContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    textAlign: 'center',
    justifyContent: 'center',
  },

  cellNote: {
    width: '33.33334%',
    height: '33.33334%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },

  td: {
    border: 'solid thin #11101063',
    flex: '1 1 0',
    height: 720 / 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: 50,
    fontWeight: 100,
    color: '#616060',
  },

  selected: {
    backgroundColor: 'rgba(205,230,252,0.5)',
  },

  mutable: {
    color: '#508be3',
    fontWeight: 400,
  },

  btm: {
    borderBottom: '2px solid black',
  },

  rightBorder: {
    borderRight: '2px solid black',
  },

  leftBorder: {
    borderLeft: '2px solid black',
  },

  topBorder: {
    borderTop: '2px solid black',
  },

  '@media (max-width: 650px)': {
    td: {
      fontSize: '40px',
    },
  },

  '@media (max-width: 560px)': {
    td: {
      fontSize: '30px',
    },
  },

  '@media (max-width: 470px)': {
    td: {
      fontSize: '20px',
    },
  },

  '@media (max-width: 380px)': {
    td: {
      fontSize: '10px',
    },
  },
});

const getClassName = (pos, id, selected, mutable, classes) => {
  const [y, x] = pos;

  const leftBorder = x === 0;
  const rightBorder = x === 2 || x === 5 || x === 8;
  const topBorder = y === 0;

  return clsx(classes.td,
    selected && classes.selected,
    mutable && classes.mutable,
    topBorder && classes.topBorder,
    rightBorder && classes.rightBorder,
    leftBorder && classes.leftBorder);
};

const Cell = (props) => {
  const {
    pos, addToSelectedCells, id, isSelected, clearSelectedCells, isMutable, cellData,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const { value, color, notes } = cellData(pos);

  const classes = useStyles(props);
  const selected = isSelected(id);
  const mutable = isMutable(id);

  const className = getClassName(pos, id, selected, mutable, classes);
  const useValue = isNotZero(value);

  const down = useMouseDown();
  const mouseEnter = () => {
    if (down) {
      addToSelectedCells(id);
    }
  };

  const Notes = () => notes.map((number, i) => (
    <div className={classes.cellNote} key={i}>
      {number}
    </div>
  ));

  const Data = () => (useValue
    ? (
      <Fragment>
        {value}
      </Fragment>
    )
    : (
      <div className={classes.notesContainer}>
        <Notes />
      </div>
    ));

  return (
    <Fragment>
      <div
        style={{ backgroundColor: !selected && color }}
        onMouseMove={mouseEnter}
        onMouseDown={() => clearSelectedCells()}
        onClick={() => addToSelectedCells(id)}
        className={className}
      >
        <Data />
      </div>
    </Fragment>
  );
};

Cell.propTypes = {
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  addToSelectedCells: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  clearSelectedCells: PropTypes.func.isRequired,
  isMutable: PropTypes.func.isRequired,
  cellData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToSelectedCells: pos => dispatch(addToSelectedCells(pos)),
  clearSelectedCells: () => dispatch(clearSelectedCells()),
});

const mapStateToProps = state => ({
  isSelected: cell => isCellSelected(state, cell),
  isMutable: cell => isCellMutable(state, cell),
  cellData: pos => getCellData(state, pos),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
