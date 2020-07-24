import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  GitIcon, PintrestIcon, InstagramIcon, FacebookIcon, YouTubeIcon,
} from './SocialIcons';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    flexWrap: 'wrap',
    userSelect: 'text',
    color: '#d9d8d8',
  },

  footer: {
    display: 'flex',
    position: 'relative',
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
    color: '#878686',
    fontFamily: 'monospace',
    fontSize: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.secondary,
  },
}));

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
            occurrence.” Sudoku continues to be highly popular in Japan, where people buy over 600,000 Sudoku magazines
            per
            month.
          </Typography>
        </div>
      </div>
      <div className={classes.faded}>
        <div className={classes.links}>
          {`© ${year} Doo. Media Productions | Privacy Policy | Site Map | Doo.com`}
        </div>
        <GitIcon />
        <FacebookIcon />
        <InstagramIcon />
        <YouTubeIcon />
        <PintrestIcon />
      </div>
    </div>
  );
};

export default Footer;
