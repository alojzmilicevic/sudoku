import React from 'react';
import * as PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'transparent',
    color: props => (props.selected ? theme.palette.primary.textColor
      : theme.palette.primary.fadeColor),
    fontWeight: props => (props.selected ? 'bold' : '500'),
    textTransform: 'none',
    borderBottom: props => (props.showBorder ? `1px solid ${theme.palette.primary.fadeColor}` : ''),
    borderTop: props => (props.showBorder ? `1px solid ${theme.palette.primary.fadeColor}` : ''),
    borderRadius: 0,
    maxHeight: 49,
    fontSize: '1.2em',

    '&:hover': {
      color: theme.palette.primary.textColor,
      backgroundColor: 'transparent',
    },
  },
}));

const TextButton = ({
  children, showBorder, selected, ...props
}) => {
  const classes = useStyles({ selected, showBorder });
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
  showBorder: PropTypes.bool,
};

export default TextButton;
