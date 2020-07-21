import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sudoku from '../components/Sudoku';
import { useWindowSize } from '../hooks/useDimensions';
import { getGridSize } from '../utilities/util';
import Keyboard from '../components/toolbar/Keyboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: props => props.width,
    height: props => props.height,
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontFamily: theme.typography.fontFamily,
  },

  contentWrapper: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: '1 0 auto',
  },

  main: {
    flex: '1 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
}));

const Client = (props) => {
  const dimensions = useWindowSize(props);
  const classes = useStyles(dimensions);
  const size = getGridSize(dimensions.width, dimensions.height);

  return (
    <div className={classes.container}>
      <Header />

      <div className={classes.contentWrapper}>
        <div className={classes.main}>
          <Sudoku size={size} />
          <Keyboard size={size} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Client;
