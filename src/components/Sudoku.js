import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { getData } from '../reducers/sudoku';
import { toOneDimension } from '../utilities/util';
import Cell from './Cell';
import { clearSelectedCells, handleKeyDown, handleKeyUp } from '../actions/sudoku';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import useKeyPressed from '../hooks/useKeyPressed';

const useStyles = makeStyles({
  thickLine: {
    display: 'block',
    height: 1,
    border: 0,
    borderTop: '1px solid #ccc',
    margin: '1em 0',
    padding: 0,
  },

  table: {
    width: props => props.size,
    height: props => props.size,
    borderCollapse: 'collapse',
    fontFamily: 'Calibri, sans-serif',
    cursor: 'pointer',
  },
  mediumBorder: {
    border: 'solid medium',
  },
  btm: {
    borderBottom: 'solid medium',
  },
});

const Container = (props) => {
  const {
    getData, clearSelectedCells, onKeyDown, onKeyUp,
  } = props;
  const classes = useStyles(props);

  const data = getData();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, clearSelectedCells);
  useKeyPressed(onKeyDown, onKeyUp);

  const createTableRow = (slice, row) => {
    const cname = (row === 2 || row === 5) ? classes.btm : '';
    return (
      <tr className={cname} key={row}>
        {slice.map((val, i) => {
          const id = toOneDimension([row, i]);

          return <Cell id={id} value={val} key={i} />;
        })}
      </tr>
    );
  };

  return (
    <table ref={wrapperRef} className={classes.table}>
      <colgroup className={classes.mediumBorder}>
        <col />
        <col />
        <col />
      </colgroup>
      <colgroup className={classes.mediumBorder}>
        <col />
        <col />
        <col />
      </colgroup>
      <colgroup className={classes.mediumBorder}>
        <col />
        <col />
        <col />
      </colgroup>
      <tbody className={classes.mediumBorder}>
        {
        Object.entries(data).map(([i, row]) => createTableRow(row, parseInt(i, 10)))
      }
      </tbody>
    </table>
  );
};

const mapDispatchToProps = dispatch => ({
  clearSelectedCells: () => dispatch(clearSelectedCells()),
  onKeyDown: (value, event) => dispatch(handleKeyDown(value, event)),
  onKeyUp: (value, event) => dispatch(handleKeyUp(value, event)),
});

const mapStateToProps = state => ({
  getData: () => getData(state),
});

Container.propTypes = {
  getData: PropTypes.func.isRequired,
  clearSelectedCells: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
