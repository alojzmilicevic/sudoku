import React from 'react';
import * as PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'transparent',
    color: props => (props.selected ? 'black' : theme.palette.secondary.dark),
    fontWeight: props => (props.selected ? 'bold' : '500'),
    textTransform: 'none',

    '&:hover': {
      color: 'black',
      backgroundColor: 'transparent',
    },
  },
}));

const TextButton = ({ children, ...props }) => {
  const classes = useStyles(props);
  return (
    <MuiButton
      size="large"
      className={classes.button}
      disableRipple
      {...props}
    >
      {children}
    </MuiButton>
  );
};

TextButton.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
};

export default TextButton;
