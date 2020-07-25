import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/yasconly-light.png';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    minHeight: 56,
    position: 'relative',
  },

  logo: {
    height: 24,
    borderRadius: 3,
    marginLeft: 10,
    maxWidth: 140,
    position: 'absolute',
    left: 0,
  },

  other: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img alt="logo" className={classes.logo} src={logo} />
    </div>
  );
};

export default Header;
