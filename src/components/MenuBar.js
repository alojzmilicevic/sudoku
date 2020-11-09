import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuList: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  textButton: {
    fontSize: '1.2em',
    borderRadius: 0,
    padding: '8px 14px',
    backgroundColor: 'transparent',
    textTransform: 'none',
    color: theme.additionalPalette.textButton.lightMode.main,
    borderRight: props => (props.showBorder ? `1px solid ${theme.palette.primary.fadeColor}`
      : '1px solid transparent'),
    borderLeft: props => (props.showBorder ? `1px solid ${theme.palette.primary.fadeColor}`
      : '1px solid transparent'),

    '&:hover': {
      color: theme.additionalPalette.textButton.lightMode.main,
      backgroundColor: 'transparent',
    },
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },

  popper: {
    borderBottom: `1px solid ${theme.palette.primary.fadeColor}`,
    borderRight: `1px solid ${theme.palette.primary.fadeColor}`,
    borderLeft: `1px solid ${theme.palette.primary.fadeColor}`,
    borderRadius: 0,
    marginLeft: -1,
    marginTop: 5,
  },
}));

const MenuBar = (props) => {
  const {
    buttons, buttonText, showBorder, placement,
  } = props;

  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ showBorder: showBorder && open });
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ display: 'unset' }} onMouseLeave={() => setOpen(false)}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        className={classes.textButton}
      >
        {buttonText}
        <ArrowDropDownIcon className={clsx(classes.expand, {
          [classes.expandOpen]: open,
        })}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement={placement || 'bottom-start'}
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement }}
          >
            <Paper className={classes.popper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menuList}
                  autoFocusItem={open}
                >
                  {buttons}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

MenuBar.propTypes = {
  buttons: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  showBorder: PropTypes.bool,
  placement: PropTypes.string,
};

export default MenuBar;
