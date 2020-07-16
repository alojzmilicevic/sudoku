import React from "react";
import Sudoku from "../components/Sudoku";
import { useWindowSize } from "../hooks/useDimensions";
import { makeStyles } from "@material-ui/core/styles";
import { getGridSize } from "../utilities/util";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: props => props.width,
    height: props => props.height,
    position: 'absolute',
    flexDirection: 'column',
    textAlign: 'center',
    overflow: 'hidden',
  },

  header: {
    background: 'tomato',
    position: 'relative',
  },

  wrapper: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: '1 0 auto',
  },

  main: {
    order: 2,
    flex: '1 100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 80,
  },

  aside1: {
    order: 1,
    background: 'gold',
    flex: '1 0',
  },

  aside2: {
    background: 'hotpink',
    flex: '1 0',
    order: 3,
  },

  footer: {
    background: 'lightgreen',
    order: 4,
  },
  "@media (max-width: 1200px)": {
    wrapper: {  
      display: 'flex',
      flexFlow: 'column',
      textAlign: 'center',
      flex: '1 100%',
      boxSizing: 'border-box',
    },

    main: { order: 1 },
    aside1: { order: 2 },
    aside2: { order: 3 },
  },
});

const Client = (props) => {
  const dimensions = useWindowSize(props);
  const classes = useStyles(dimensions);
  const size = getGridSize(dimensions.width, dimensions.height);

  return (
    <div className={classes.container}>
      <header className={classes.header}>Header</header>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Sudoku size={size} />
        </div>
        <div className={classes.aside + " " + classes.aside1}>Aside 1</div>
        <div className={classes.aside + " " + classes.aside2}>Aside 2</div>
      </div>
      <footer className={classes.footer}>Footer</footer>
    </div>
  );
};

export default Client;
