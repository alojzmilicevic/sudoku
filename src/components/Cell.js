import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { getCellData } from '../reducers/sudoku';
import { isNotZero } from '../utilities/util';
import { isCellSelected } from '../reducers/selected';
import { addToSelectedCells, clearSelectedCells } from '../actions/selected';
import useEventListener from '../hooks/useEventListener';

const useStyles = makeStyles(theme => ({
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

  selectContainer: {
    position: 'absolute',
    height: props => (props.height / 9) - 2,
    width: props => (props.height / 9) - 2,
    opacity: 0.8,
    backgroundColor: theme.cellColors.selected,
  },

  cellNote: {
    width: '33.33334%',
    height: '33.33334%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '45%',
  },

  td: {
    border: `solid thin ${theme.cellColors.thinBorder}`,
    flex: '1 1 0',
    height: props => props.height / 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: '3.5em',
    fontWeight: 100,
    color: theme.cellColors.preFilledTextColor,
  },

  mutable: {
    color: theme.cellColors.textColor,
    fontWeight: 400,
  },

  bottomBorder: {
    borderBottom: `2px solid ${theme.palette.primary.darkColor}`,
  },

  rightBorder: {
    borderRight: `2px solid ${theme.palette.primary.darkColor}`,
  },

  leftBorder: {
    borderLeft: `2px solid ${theme.palette.primary.darkColor}`,
  },

  topBorder: {
    borderTop: `2px solid ${theme.palette.primary.darkColor}`,
  },

  '@media (max-width: 750px)': {
    td: {
      fontSize: '2em',
    },
  },
}));

const getClassName = (pos, id, selected, mutable, classes) => {
  const [y, x] = pos;

  const leftBorder = x === 0;
  const rightBorder = x === 2 || x === 5 || x === 8;
  const bottomBorder = y === 2 || y === 5 || y === 8;
  const topBorder = y === 0;

  return clsx(classes.td,
    mutable && classes.mutable,
    topBorder && classes.topBorder,
    bottomBorder && classes.bottomBorder,
    rightBorder && classes.rightBorder,
    leftBorder && classes.leftBorder);
};

const Cell = (props) => {
  const {
    pos, addToSelectedCells, id, isSelected, clearSelectedCells, cellData,
  } = props;

  const {
    value, color, notes, preFilled,
  } = cellData(pos);

  const [down, setDown] = useState(false);
  const selected = isSelected(id);

  const downHandler = useCallback(() => {
    setDown(true);
  }, [setDown]);

  const upHandler = useCallback(() => {
    setDown(false);
  }, [setDown]);

  useEventListener('mousedown', downHandler);
  useEventListener('touchstart', downHandler);
  useEventListener('mouseup', upHandler);
  useEventListener('touchend', upHandler);

  const mouseMove = () => {
    if (down && !selected) {
      addToSelectedCells(id);
    }
  };
  const classes = useStyles(props);

  const className = getClassName(pos, id, selected, !preFilled, classes);
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
      style={{ backgroundColor: color }}
      onMouseMove={mouseMove}
      onMouseDown={(e) => {
        if (!e.ctrlKey) {
          clearSelectedCells();
        }
        addToSelectedCells(id);
      }}

      className={className}
      role="button"
    >
      <div style={{ zIndex: 1 }} className={innerClassName}>
        {useValue && value}
        {!useValue && <Notes />}
      </div>

      <div className={selected ? classes.selectContainer : ''} />
    </div>
  );
};

Cell.propTypes = {
  isSelected: PropTypes.func.isRequired,
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
  cellData: pos => getCellData(state, pos),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
