import React from 'react';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  button: {
    width: '90%',
    minHeight: 40,
    marginTop: theme.spacing(1),
    color: 'black',
    border: '1px solid #a6a6a6',
    '&:hover': {
      border: '1px solid #333',
    },
  },

  selected: {
    backgroundColor: '#333',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
}));

const Button = (props) => {
  const classes = useStyles(props);

  const {
    onClick, text, className, selected,
  } = props;

  const fullClassName = clsx(classes.button, className && className, selected && classes.selected);

  return (
    <MuiButton disableRipple onClick={() => onClick()} className={fullClassName} variant="outlined" color="primary">
      {text}
    </MuiButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
};

export default Button;
