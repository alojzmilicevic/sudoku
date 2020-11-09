import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import MuiFacebookIcon from '@material-ui/icons/Facebook';
import MuiInstagramIcon from '@material-ui/icons/Instagram';
import MuiYouTubeIcon from '@material-ui/icons/YouTube';
import MuiPinterestIcon from '@material-ui/icons/Pinterest';
import IconButton from '@material-ui/core/IconButton';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.offsetColor,
  },
}));

const SocialIcon = ({ href, icon }) => {
  const classes = useStyles();
  return (
    <IconButton className={classes.icon} href={href}>
      {icon}
    </IconButton>
  );
};

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const GitIcon = () => <SocialIcon href="https://github.com/alojzmilicevic/sudoku" icon={<GitHubIcon />} />;
const FacebookIcon = () => <SocialIcon href="https://www.facebook.com/alojzm" icon={<MuiFacebookIcon />} />;
const InstagramIcon = () => <SocialIcon href="https://www.instagram.com/alomil/" icon={<MuiInstagramIcon />} />;
const PintrestIcon = () => <SocialIcon href="https://www.pinterest.com/" icon={<MuiPinterestIcon />} />;
const YouTubeIcon = () => <SocialIcon href="https://youtube.com" icon={<MuiYouTubeIcon />} />;


export {
  GitIcon, FacebookIcon, InstagramIcon, PintrestIcon, YouTubeIcon,
};
