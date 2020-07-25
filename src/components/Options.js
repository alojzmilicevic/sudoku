import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Timer from './Timer';

const useStyles = makeStyles(theme => ({
  options: {
    borderBottom: '1px solid #a2a2a2',
    minHeight: 56,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    paddingLeft: 12,
    paddingRight: 12,
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: '30%',
    width: '100%',
  },

  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Options = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.options}>
      <div className={classes.row}>
        <div className={classes.optionsRow}>
          <div style={{ display: 'inline-block' }}>
            <span style={{ marginRight: 20, fontSize: 20 }}> Easy </span>
            <span style={{ marginRight: 20, fontSize: 20 }}> Medium </span>
            <span style={{ fontSize: 20 }}> Hard </span>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Timer />
          </div>
          <div style={{ display: 'inline-block' }}>
            <span style={{ marginRight: 20, fontSize: 20 }}> Help </span>
            <span style={{ fontSize: 20 }}> Settings </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Options.propTypes = {};

export default Options;
