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
    width: props => props.size,
    height: props => props.size,
    borderCollapse: 'collapse',
    fontFamily: 'Calibri, sans-serif',
    cursor: 'pointer',
    borderBottom: '2px solid red',
  },

  thickLine: {
    display: 'block',
    height: 1,
    border: 0,
    borderTop: '1px solid #ccc',
    margin: '1em 0',
    padding: 0,
    flex: '1 1 auto',
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
    data, onKeyDown, onKeyUp,
  } = props;
  const classes = useStyles(props);

  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, clearSelectedCells);
  useKeyPressed(onKeyDown, onKeyUp);

  const createTableRow = (slice, row) => {
    const cname = (row === 2 || row === 5) ? classes.btm : '';
    return (
      <tr className={cname} key={row}>
        {slice.map((cell, i) => {
          const id = toOneDimension([row, i]);

          return <Cell id={id} pos={[row, i]} key={i} />;
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
  data: getData(state),
});

Container.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
