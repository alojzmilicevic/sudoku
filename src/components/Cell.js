import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { setSelected } from "../api/sudoku";
import { connect } from "react-redux";
import { isCellSelected } from "../reducers/sudoku";
import clsx from "clsx";

const useStyles = makeStyles({
  cellContainer: {
    width: props => props.size,
    height: props => props.size,
    backgroundColor: '#fff',
    /*'&:hover': {
      background: '#cde6fc',
      cursor: 'pointer',
    },*/
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },

  selectedCell: {
    backgroundColor: '#cde6fc',
  },

  cellValue: {
    color: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: props => props.size / 1.5,
  },
  cellNote: {
    width: '33.33334%',
    height: '33.33334%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  td: {
    border: 'solid thin',
    height: '1.4em',
    width: '1.4em',
    textAlign: 'center',
    padding: '0',
  },
});

const Cell = (props) => {
  const { value, position, isSelected } = props;

  const classes = useStyles(props);

  const useValue = value !== '0' && value !== 0;
  const smallNumbers = []
  const cellSelected = isSelected(position);
  //React.useEffect(() => setSelected(selected), [selected, setSelected])

  smallNumbers.sort();

  const className = clsx(classes.cellContainer, cellSelected && classes.selectedCell);

  return (
    <td className={classes.td}>
      <div className={className}>
        {useValue ?
          <div className={classes.cellValue}>
            {value}
          </div>
          :
          smallNumbers.map(number => (
            <div className={classes.cellNote}>
              {number}
            </div>
          ))
        }
      </div>
    </td>
  )
}

const mapDispatchToProps = dispatch => ({
  setSelected: (cellId) => dispatch(setSelected(cellId)),
});

const mapStateToProps = state => ({
  isSelected: (cell) => isCellSelected(state, cell),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
