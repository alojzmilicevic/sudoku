import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCellData } from '../actions/sudoku';

const useStyles = makeStyles({
  deleteButton: {
    backgroundColor: '#e6e6e6',
    marginTop: 14,
    minHeight: 48,
    border: '1px solid #959595',
    borderRadius: 3,
    color: 'black',
    width: '100%',
    flex: 1,

    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
  },

  '@media (max-width: 1200px)': {
    deleteButton: {
      width: 'calc(100% / 5 - 2%)',
      minHeight: 0,
    },
  },
});

const ClearButton = (props) => {
  const { clearCellData } = props;

  const classes = useStyles();

  return (
    <Button disableTouchRipple onClick={() => clearCellData()} className={classes.deleteButton}>
      <ClearIcon style={{ height: '2em' }} />
    </Button>
  );
};

ClearButton.propTypes = {
  clearCellData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearCellData: () => dispatch(clearCellData()),
});


export default connect(null, mapDispatchToProps)(ClearButton);
