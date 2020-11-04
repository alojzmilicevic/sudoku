import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { setShowClock } from '../../actions/settings';
import { getShowClock } from '../../reducers/settings';
import strings from '../../strings/main';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const SettingsModal = ({ setShowClock, showClock }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {strings.settings.header}
      </Typography>

      <FormControlLabel
        control={(
          <Checkbox
            checked={showClock}
            onChange={() => setShowClock(!showClock)}
            name="showClock"
            color="primary"
          />
        )}
        label={strings.settings.showClock}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setShowClock: value => dispatch(setShowClock(value)),
});

const mapStateToProps = state => ({
  showClock: getShowClock(state),
});

SettingsModal.propTypes = {
  setShowClock: PropTypes.func.isRequired,
  showClock: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
