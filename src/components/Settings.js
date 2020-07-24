import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Settings = (props) => {
  const classes = useStyles();
  const [open, set] = useState(false);

  return (
    <div role="button" onClick={() => set(!open)} className={classes.root}>Settings </div>
  );
};

Settings.propTypes = {

};

export default Settings;
