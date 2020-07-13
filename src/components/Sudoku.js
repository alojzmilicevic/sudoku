import React from "react";
import { connect } from "react-redux";
import { getData } from "../reducers/sudoku";
import Cell from "./Cell";
import { makeStyles } from '@material-ui/core/styles';
import { useMouseInformation } from "../hooks/useMousePosition";

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
    fontSize: '2.5em',
    width: props => props.size + 9,
    height: props => props.size + 9,
    borderCollapse: 'collapse',
    fontFamily: 'Calibri, sans-serif',
  },
  mediumBorder: {
    border: 'solid medium',
  },
  btm: {
    borderBottom: 'solid medium'
  },
});


const Container = (props) => {
  const { getData, size } = props;
  const classes = useStyles(props);

  useMouseInformation(size);

  const data = getData();

  const createTableRow = (slice, row) => {
    const cname = (row === 2 || row === 5) ? classes.btm : '';
    return <tr className={cname} key={row}>
      {slice.map((val, i) => {
        return <Cell
          key={i}
          value={val}
          position={[row, i]}
        />
      })}
    </tr>;
  }

  return <table className={classes.table}>
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


const mapStateToProps = state => ({
  getData: () => getData(state),
});

export default connect(mapStateToProps, null)(Container);
