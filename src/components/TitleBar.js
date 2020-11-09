import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDateInfo } from '../utilities/util';

const useStyles = makeStyles(theme => ({
  titleBar: {
    borderTop: '1px solid #a2a2a2',
    borderBottom: '1px solid #a2a2a2',
    position: 'relative',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    alignItems: 'flex-end',
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
    fontSize: '3em',
    fontWeight: 'bold',
    padding: '8px 14px',
  },

  smallText: {
    display: 'inline-block',
    fontSize: '1.5em',
    fontWeight: 300,
  },
}));

const TitleBar = (props) => {
  const classes = useStyles(props);

  const { day, month } = getDateInfo();

  return (
    <div className={classes.titleBar}>
      <div className="row">
        <h2 className={classes.text}>
          <em className={classes.bigText}>
            Sudoku
          </em>
          <span className={classes.smallText}>
            {`${month} ${day}`}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default TitleBar;
