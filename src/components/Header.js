import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timer from './Timer';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#333',
    minHeight: 56,
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Timer />
    </div>
  );
};

export default Header;
