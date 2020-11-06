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
    borderBottom: props => (props.borderColor ? `1px solid ${props.borderColor}` : ''),
    borderTop: props => (props.borderColor ? `1px solid ${props.borderColor}` : ''),
    borderRadius: 0,
    maxHeight: 49,

    '&:hover': {
      color: 'black',
      backgroundColor: 'transparent',
    },
  },
}));

const TextButton = ({
  children, borderColor, selected, ...props
}) => {
  const classes = useStyles({ selected, borderColor });
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
  borderColor: PropTypes.string,
};

export default TextButton;
