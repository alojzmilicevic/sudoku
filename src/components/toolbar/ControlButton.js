import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getCurrentTool } from '../../reducers/tools';
import { setDefaultTool } from '../../actions/tools';

const useStyles = makeStyles({
  root: {
    border: '1px solid grey',
    color: '#ccc',
    backgroundColor: '#fff',
    flex: '1',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },

  selected: {
    backgroundColor: '#000',
    color: 'white',
    '&:hover': {
      backgroundColor: '#000',
    },
  },
});

const ControlButton = (props) => {
  const {
    id, name, currentTool, setDefaultTool,
  } = props;

  const classes = useStyles(props);
  const selected = currentTool === id;

  const className = clsx(selected && classes.selected, classes.root);
  return (
    <Button onClick={() => setDefaultTool(id)} className={className}>
      {name}
    </Button>
  );
};

ControlButton.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  currentTool: PropTypes.number.isRequired,
  setDefaultTool: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setDefaultTool: toolType => dispatch(setDefaultTool(toolType)),
});

const mapStateToProps = state => ({
  currentTool: getCurrentTool(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);
