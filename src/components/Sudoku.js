import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { getData } from '../reducers/sudoku';
import { toOneDimension } from '../utilities/util';
import Cell from './Cell';
import useKeyPressed from '../hooks/useKeyPressed';
import { handleKeyDown, handleKeyUp } from '../actions/keys';

const useStyles = makeStyles({
  table: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: props => props.size,
    height: props => props.size,
    cursor: 'pointer',
  },

  row: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
  },
});
const Sudoku = (props) => {
  const {
    data, onKeyDown, onKeyUp, size,
  } = props;
  const classes = useStyles(props);
  useKeyPressed(onKeyDown, onKeyUp);

  const createTableRow = (rowValues, rowNumber) => (
    <div className={classes.row} key={rowNumber}>
      {rowValues.map((cell, col) => {
        const id = toOneDimension([rowNumber, col]);

        return <Cell height={size} id={id} pos={[rowNumber, col]} key={col} />;
      })}
    </div>
  );

  return (
    <div className={classes.table}>
      { data.map((row, index) => createTableRow(row, index)) }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onKeyDown: (event, modifiers) => dispatch(handleKeyDown(event, modifiers)),
  onKeyUp: (event, modifiers) => dispatch(handleKeyUp(event, modifiers)),
});

const mapStateToProps = state => ({
  data: getData(state),
});

Sudoku.propTypes = {
  size: PropTypes.number.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);
