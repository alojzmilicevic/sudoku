import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbefd0',
    height: 56,
  },
});

const Footer = (props) => {
  const classes = useStyles();
  return <div className={classes.footer}> Footer </div>;
};

export default Footer;
