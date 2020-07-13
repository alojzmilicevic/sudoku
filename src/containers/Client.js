import React from "react";
import Sudoku from "../components/Sudoku";
import { useWindowSize } from "../hooks/useDimensions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    textAlign: 'center',
    backgroundColor: '#fff',
    height: props => props[1],
    width: props => props[0],
    position: 'absolute',
  },
  header: {
    background: 'tomato',
    flex: '1 100%',
    position: 'relative',
  },

  footer: {
    background: 'lightgreen',
    flex: '1 100%',
    order: 4,
  },

  main: {
    order: 2,
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },

  aside1: {
    order: 1,
    background: 'gold',
    flex: '1 100%',
  },

  aside2: {
    background: 'hotpink',
    flex: '1 100%',
    order: 3,
  },
  aside: {
    flex: "1 0 0",
  },
  "@media (max-width: 1200px)": {
    wrapper: {
      display: 'flex',
      flexFlow: 'column',
      textAlign: 'center',
      flex: '1 100%',
      boxSizing: 'border-box',
    },

    aside1: { order: 2 },
    aside2: { order: 3 },
    main: { order: 1 },
  },
});

const Client = (props) => {
  const size = useWindowSize(props);
  const classes = useStyles(size);
  console.log(size);

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>Header</header>
      <div className={classes.main}>
        <Sudoku size={500} />
      </div>
      <div className={classes.aside + " " + classes.aside1}>Aside 1</div>
      <div className={classes.aside + " " + classes.aside2}>Aside 2</div>
      <footer className={classes.footer}>Footer</footer>
    </div>
  );
};

export default Client;
