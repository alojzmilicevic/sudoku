import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/yasconly-light.png';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img alt="logo" className="logo" src={logo} />
    </div>
  );
};

export default Header;
