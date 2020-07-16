import React, { useRef } from "react";
import { connect } from "react-redux";
import { getData, getSelectedCells } from "../reducers/sudoku";
import { makeStyles } from '@material-ui/core/styles';
import { toOneDimension } from "../utilities/util";
import Cell from "./Cell";
import { clearSelectedCells, setSudokuData } from "../api/sudoku";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import useKeyPressed from "../hooks/useKeyPressed";

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
    borderBottom: 'solid medium'
  },

  td: {
    border: 'solid thin',
    textAlign: 'center',
  },

  selected: {
    backgroundColor: 'blue',
  },
});

const Container = (props) => {
  const { getData, clearSelectedCells, onKeyDown } = props;
  const classes = useStyles(props);

  const data = getData();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, clearSelectedCells);
  useKeyPressed(onKeyDown);

  const createTableRow = (slice, row) => {
    const cname = (row === 2 || row === 5) ? classes.btm : '';
    return <tr className={cname} key={row}>
      {slice.map((val, i) => {
        const id = toOneDimension([row, i]);

        return <Cell id={id} value={val} key={i} />
      })}
    </tr>;
  }

  return <table ref={wrapperRef} className={classes.table}>
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
      Object.entries(data).map(([i, row]) => createTableRow(row, parseInt(i)))
    }
    </tbody>
  </table>;
}

const mapDispatchToProps = dispatch => ({
  clearSelectedCells: () => dispatch(clearSelectedCells()),
  onKeyDown: (value) => dispatch(setSudokuData(value)),
});

const mapStateToProps = state => ({
  getData: () => getData(state),
  getSelectedCells: () => getSelectedCells(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
