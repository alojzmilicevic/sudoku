import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import strings from '../../strings/main';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const HowToModal = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        {strings.modals.howToPlayHeader}
      </Typography>

      <pre style={{ fontFamily: 'Calibri, sans-serif', fontSize: 16, whiteSpace: 'pre-wrap' }}>{strings.modals.howToPlayText}</pre>
    </div>
  );
};

export default HowToModal;
