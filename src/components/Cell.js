import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { getCellData, isCellMutable } from '../reducers/sudoku';
import { isNotZero } from '../utilities/util';
import { isCellSelected } from '../reducers/selected';
import { addToSelectedCells, clearSelectedCells } from '../actions/selected';
import useEventListener from '../hooks/useEventListener';

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
    height: props => props.height / 9,
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

  bottomBorder: {
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
  const bottomBorder = y === 2 || y === 5 || y === 8;
  const topBorder = y === 0;

  return clsx(classes.td,
    mutable && classes.mutable,
    selected && classes.selected,
    topBorder && classes.topBorder,
    bottomBorder && classes.bottomBorder,
    rightBorder && classes.rightBorder,
    leftBorder && classes.leftBorder);
};

const Cell = (props) => {
  const {
    pos, addToSelectedCells, id, isSelected, clearSelectedCells, isMutable, cellData,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const { value, color, notes } = cellData(pos);
  const [down, setDown] = useState(false);

  const downHandler = useCallback(() => {
    setDown(true);
  }, [setDown]);

  const upHandler = useCallback(() => {
    setDown(false);
  }, [setDown]);

  useEventListener('mousedown', downHandler);
  useEventListener('mouseup', upHandler);

  const mouseMove = () => {
    if (down) {
      addToSelectedCells(id);
    }
  };
  const classes = useStyles(props);
  const selected = isSelected(id);

  const mutable = isMutable(id);
  const className = getClassName(pos, id, selected, mutable, classes);
  const useValue = isNotZero(value);

  const Notes = () => notes.map((number, i) => (
    <div
      className={classes.cellNote}
      key={i}
    >
      {number}
    </div>
  ));

  const innerClassName = useValue ? '' : classes.notesContainer;

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      style={{ backgroundColor: !selected && color }}
      onMouseMove={mouseMove}
      onMouseDown={() => clearSelectedCells()}
      className={className}
      onClick={() => addToSelectedCells(id)}
      role="button"
    >
      <div className={innerClassName}>
        {useValue && value}
        {!useValue && <Notes />}
      </div>
    </div>
  );
};

Cell.propTypes = {
  isSelected: PropTypes.func.isRequired,
  isMutable: PropTypes.func.isRequired,
  cellData: PropTypes.func.isRequired,
  addToSelectedCells: PropTypes.func.isRequired,
  clearSelectedCells: PropTypes.func.isRequired,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired,
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
