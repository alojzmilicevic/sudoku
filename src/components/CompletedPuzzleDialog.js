import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MuiCloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../strings/main';
import Button from './buttons/Button';
import { getLevel, getTimer } from '../reducers/sudoku';
import { formatTime } from '../utilities/util';

const useStyles = makeStyles(theme => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: 45,
    minHeight: 400,
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  star: {
    height: theme.spacing(10),
    width: '100%',
    color: theme.palette.primary.thirdColor,
  },

  head: {
    fontWeight: 550,
  },
}));

const Modal = (props) => {
  const classes = useStyles();
  const {
    onClose, onPlayAnother, level, time,
  } = props;

  const CloseIcon = ({ onClose }) => (
    <IconButton onClick={() => onClose()} className={classes.closeButton}>
      <MuiCloseIcon />
    </IconButton>
  );

  return (
    <div>
      <Dialog open>
        <CloseIcon onClose={onClose} />
        <div className={classes.dialog}>
          <StarsIcon className={classes.star} />
          <Typography className={classes.head} variant="h3">
            {`${strings.congrats}!`}
          </Typography>
          <Typography style={{ textAlign: 'center' }} variant="h6">
            {`${strings.formatString(strings.puzzleFinished, strings.optionsBar[level], formatTime(time))}!`}
          </Typography>
          <br />
          <Button onClick={() => onPlayAnother()} text={strings.playAnother} />
          <Button onClick={() => onClose()} text={strings.quit} />
        </div>
      </Dialog>
    </div>

  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPlayAnother: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  level: getLevel(state),
  time: getTimer(state),
});

export default connect(mapStateToProps)(Modal);