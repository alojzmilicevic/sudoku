import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { getData } from '../reducers/sudoku';
import { toOneDimension } from '../utilities/util';
import Cell from './Cell';
import { clearSelectedCells, handleKeyDown, handleKeyUp } from '../actions/sudoku';
import useKeyPressed from '../hooks/useKeyPressed';

const useStyles = makeStyles({
  table: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: props => props.size,
    height: props => props.size,
    fontFamily: 'Calibri, sans-serif',
    cursor: 'pointer',
  },

  row: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
  },
});

const Container = (props) => {
  const {
    data, onKeyDown, onKeyUp, size,
  } = props;
  const classes = useStyles(props);

  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, clearSelectedCells);
  useKeyPressed(onKeyDown, onKeyUp);

  const createTableRow = (slice, row) => (
    <div className={classes.row} key={row}>
      {slice.map((cell, i) => {
        const id = toOneDimension([row, i]);

        return <Cell height={size} id={id} pos={[row, i]} key={i} />;
      })}
    </div>
  );

  return (
    <div ref={wrapperRef} className={classes.table}>
      {
        Object.entries(data).map(([i, row]) => createTableRow(row, parseInt(i, 10)))
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearSelectedCells: () => dispatch(clearSelectedCells()),
  onKeyDown: (value, event) => dispatch(handleKeyDown(value, event)),
  onKeyUp: (value, event) => dispatch(handleKeyUp(value, event)),
});

const mapStateToProps = state => ({
  data: getData(state),
});

Container.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  size: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
