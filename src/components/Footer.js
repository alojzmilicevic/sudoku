import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  footerWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    flexWrap: 'wrap',
    userSelect: 'text',
  },

  footer: {
    display: 'flex',
    position: 'relative',
    padding: '48px 100px',
  },

  text: {
    fontFamily: 'monospace',
    fontWeight: '550',
    fontSize: 16,
  },

  about: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 2,
    maxWidth: 800,
  },

  links: {
    flex: 1,
    marginLeft: 50,
    display: 'flex',
    flexDirection: 'column',
  },

  faded: {
    color: '#878686',
    fontFamily: 'monospace',
    fontSize: 13,
    width: '100%',
    textAlign: 'center',
  },
});

const Footer = () => {
  const classes = useStyles();

  const year = new Date().getFullYear();

  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        <div className={classes.about}>
          <Typography className={classes.text} variant="button">about the Doo. games</Typography>
          <br />
          <Typography>
            The game first appeared in Japan in 1984 where it was given the name “Sudoku,” which is short for a
            longer expression in Japanese – “Sūji wa dokushin ni kagiru” – which means, “the digits are limited to one
            occurrence.” Sudoku continues to be highly popular in Japan, where people buy over 600,000 Sudoku magazines per
            month.
          </Typography>
        </div>
      </div>
      <div className={classes.faded}>
        {`© ${year} Doo. Media Productions | Privacy Policy | Site Map | Doo.com`}
      </div>
    </div>
  );
};

export default Footer;
