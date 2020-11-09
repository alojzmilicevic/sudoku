import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCellData } from '../actions/sudoku';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    backgroundColor: theme.keyboardColors.background,
    marginTop: 14,
    minHeight: 48,
    border: `1px solid ${theme.keyboardColors.borderColor}`,
    borderRadius: 3,
    color: theme.keyboardColors.textColor,
    width: '100%',
    fontSize: '2em',

    '&:hover': {
      backgroundColor: theme.keyboardColors.background,
    },
  },

  '@media (max-width: 1200px)': {
    deleteButton: {
      width: 'calc(100% / 5 - 2%)',
      minHeight: 0,
      fontSize: '1em',
    },
  },
}));

const ClearButton = (props) => {
  const { clearCellData } = props;

  const classes = useStyles();

  return (
    <Button disableTouchRipple onClick={() => clearCellData()} className={classes.deleteButton}>
      <ClearIcon />
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
