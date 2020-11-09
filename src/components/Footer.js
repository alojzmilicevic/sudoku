import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  GitIcon, PintrestIcon, InstagramIcon, FacebookIcon, YouTubeIcon,
} from './SocialIcons';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    flexWrap: 'wrap',
    userSelect: 'text',
    color: theme.palette.primary.frontColor,
  },

  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6),
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
    marginRight: 30,
  },

  faded: {
    color: theme.palette.primary.fadeColor,
    fontFamily: 'monospace',
    fontSize: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.secondary,
  },

  '@media (max-width: 750px)': {
    faded: {
      flexDirection: 'column',
    },

    links: {
      marginRight: 0,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  const year = new Date().getFullYear();

  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        <div className={classes.about}>
          <Typography className={classes.text} variant="button">about the Yasc. games</Typography>
          <br />
          <Typography variant="body2">
            The game first appeared in Japan in 1984 where it was given the name “Sudoku,” which is short for a
            longer expression in Japanese – “Sūji wa dokushin ni kagiru” – which means, “the digits are limited to one
            occurrence.” Sudoku continues to be highly popular in Japan, where people buy over 600,000 Sudoku magazines
            per
            month.
          </Typography>
        </div>
      </div>
      <div className={classes.faded}>
        <div className={classes.links}>
          {`© ${year} Yasc. productions | Privacy Policy`}
        </div>
        <div>
          <GitIcon />
          <FacebookIcon />
          <InstagramIcon />
          <YouTubeIcon />
          <PintrestIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
