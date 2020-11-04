import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { useWindowSize } from '../hooks/useDimensions';
import TextButton from './buttons/TextButton';
import strings from '../strings/main';
import { getLevel } from '../reducers/sudoku';
import { Levels } from '../constants/levels';
import { setLevel } from '../actions/sudoku';
import MenuBar from './MenuBar';

const useStyles = makeStyles(theme => ({
  leftButton: {
    marginLeft: 10,
  },

  menuButton: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: theme.spacing(12),
  },
}));

const LevelBar = ({ level, setLevel }) => {
  const { width } = useWindowSize();
  const classes = useStyles();
  const largeScreen = width > 1000;

  const buttonData = [
    { level: Levels.EASY, text: strings.optionsBar[Levels.EASY] },
    { level: Levels.MEDIUM, text: strings.optionsBar[Levels.MEDIUM] },
    { level: Levels.HARD, text: strings.optionsBar[Levels.HARD] },
  ];

  const buttons = buttonData.map((data, index) => (
    <TextButton key={`level${index}`} onClick={() => setLevel(data.level)} selected={level === data.level}>
      {largeScreen ? data.text
        : (
          <div className={classes.menuButton}>
            {data.text}
            {level === data.level ? <CheckIcon /> : null}
          </div>
        )
      }
    </TextButton>
  ));

  return (
    <React.Fragment>
      <Collapse in={largeScreen} timeout="auto" unmountOnExit>
        <div style={{ marginLeft: 16 }}>
          {buttons}
        </div>
      </Collapse>
      {!largeScreen && (
      <MenuBar
        buttons={buttons}
        buttonText={strings.optionsBar[level]}
      />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  level: getLevel(state),
});

const mapDispatchToProps = dispatch => ({
  setLevel: level => dispatch(setLevel(level)),
});

LevelBar.propTypes = {
  level: PropTypes.string.isRequired,
  setLevel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelBar);
