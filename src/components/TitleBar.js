import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { getDateInfo } from '../utilities/util';

const useStyles = makeStyles(theme => ({
  titleBar: {
    borderTop: '1px solid #a2a2a2',
    borderBottom: '1px solid #a2a2a2',
    position: 'relative',
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    color: '#333',
    alignItems: 'flex-end',
  },

  row: {
    paddingLeft: 12,
    paddingRight: 12,
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: '30%',
    width: '100%',
  },

  o: {
    flex: '1 1 auto',
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
    fontSize: '100%',
  },

  text: {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
    fontSize: '100%',
  },

  bigText: {
    fontStyle: 'normal',
    fontSize: 56,
    fontWeight: 'bold',
    marginRight: 16,
  },

  smallText: {
    display: 'inline-block',
    fontSize: 28,
    fontWeight: 300,
  },
}));

const TitleBar = (props) => {
  const classes = useStyles(props);

  const { day, month } = getDateInfo();

  return (
    <div className={classes.titleBar}>
      <div className={classes.row}>
        <div className={classes.o}>
          <h2 className={classes.text}>
            <em className={classes.bigText}>
              {' '}
              Sudoku
            </em>
            <span className={classes.smallText}>
              {`${month} ${day}`}
            </span>
          </h2>
        </div>
      </div>

    </div>
  );
};

TitleBar.propTypes = {};

export default TitleBar;
