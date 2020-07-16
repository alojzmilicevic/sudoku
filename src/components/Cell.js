import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { addToSelectedCells, clearSelectedCells } from '../actions/sudoku';
import { isCellSelected } from '../reducers/sudoku';
import useMouseDown from '../hooks/useMouseDown';

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
    border: 'solid thin',
    textAlign: 'center',
  },


  selected: {
    backgroundColor: '#cde6fc',
  },
});

const Cell = (props) => {
  const {
    value, addToSelectedCells, id, isSelected, clearSelectedCells,
  } = props;

  const classes = useStyles(props);

  const useValue = value !== '0' && value !== 0;

  const down = useMouseDown();

  const mouseEnter = () => {
    if (down) {
      addToSelectedCells(id);
    }
  };

  const className = clsx(classes.td, isSelected(id) && classes.selected);

  return (
    <td
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
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  addToSelectedCells: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  clearSelectedCells: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToSelectedCells: pos => dispatch(addToSelectedCells(pos)),
  clearSelectedCells: () => dispatch(clearSelectedCells()),
});

const mapStateToProps = state => ({
  isSelected: cell => isCellSelected(state, cell),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
