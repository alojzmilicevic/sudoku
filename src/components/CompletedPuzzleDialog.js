import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MuiCloseIcon from '@material-ui/icons/Close';
import StarsIcon from '@material-ui/icons/Stars';
import * as PropTypes from 'prop-types';
import strings from '../strings/main';

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
    color: theme.palette.primary.main,
  },

  head: {
    fontWeight: 550,
  },

  button: {
    width: '90%',
    minHeight: 40,
    marginTop: theme.spacing(1),
    color: 'black',
  },
}));

const Modal = (props) => {
  const classes = useStyles();
  const { onClose, onPlayAnother } = props;

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
            {`${strings.formatString(strings.puzzleFinished, strings.easy, '12.02')}!`}
          </Typography>
          <br />
          <Button disableRipple onClick={() => onPlayAnother()} className={classes.button} variant="outlined" color="primary">
            {strings.playAnother}
          </Button>
          <Button disableRipple onClick={() => onClose()} className={classes.button} variant="outlined" color="primary">
            {strings.quit}
          </Button>
        </div>
      </Dialog>
    </div>

  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPlayAnother: PropTypes.func.isRequired,
};

export default Modal;
