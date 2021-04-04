import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init } from '../actions/client';

const Backend = ({ children, init }) => {
  useEffect(() => {
    init();
  }, [init]);

  return children;
};

Backend.propTypes = {
  children: PropTypes.node.isRequired,
  init: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
});

export default connect(null, mapDispatchToProps)(Backend);
