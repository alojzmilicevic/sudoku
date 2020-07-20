import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { addToSelectedCells, clearSelectedCells } from '../actions/sudoku';
import { getCellData, isCellMutable, isCellSelected } from '../reducers/sudoku';
import useMouseDown from '../hooks/useMouseDown';
import { isNotZero } from "../utilities/util";

/*
function f() {
  return <div className={className}>
    {useValue ?
      <Fragment>
        {value}
      </Fragment>
      :
      smallNumbers.map(number => (
        <div className={classes.cellNote}>
          {number}
        </div>
      ))
    }
  </div>
}
*/

const useStyles = makeStyles({
  cellContainer: {
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
  },

  td: {
    border: 'solid thin black',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 100,
    color: '#616060',
  },

  selected: {
    backgroundColor: '#cde6fc',
  },

  mutable: {
    color: '#508be3',
    fontWeight: 400,
  },

  '@media (max-width: 650px)': {
    td: {
      fontSize: '40px',
    },
  },

  '@media (max-width: 540px)': {
    td: {
      fontSize: '30px',
    },
  },

  '@media (max-width: 460px)': {
    td: {
      fontSize: '20px',
    },
  },

  '@media (max-width: 370px)': {
    td: {
      fontSize: '10px',
    },
  },
});

const Cell = (props) => {
  const {
    pos, addToSelectedCells, id, isSelected, clearSelectedCells, isMutable, cellData,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const { value, color, notes } = cellData(pos);

  const classes = useStyles(props);

  const useValue = isNotZero(value);

  const down = useMouseDown();
  const selected = isSelected(id);
  const mouseEnter = () => {
    if (down) {
      addToSelectedCells(id);
    }
  };


  const className = clsx(classes.td, selected && classes.selected, isMutable(id) && classes.mutable);

  return (
    <td
      style={{ backgroundColor: !selected && color }}
      onMouseMove={mouseEnter}
      onMouseDown={() => clearSelectedCells()}
      onClick={() => addToSelectedCells(id)}
      className={className}
    >
      {useValue && value}
    </td>
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
