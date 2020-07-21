import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    height: 56,
    backgroundColor: '#333',
  },
});

const Header = (props) => {
  const classes = useStyles();
  return <div className={classes.header}> Header </div>;
};

export default Header;
