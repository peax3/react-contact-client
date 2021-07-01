import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

// const drawerWidth = 240;

const useStyles = (props) =>
  makeStyles((theme) => {
    return {
      appBar: {
        [theme.breakpoints.up("sm")]: {
          width: `calc(100% - ${props.drawerWidth}px)`,
          marginLeft: props.drawerWidth,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(props.drawerSize)]: {
          display: "none",
        },
      },
    };
  });

const Header = ({ handleDrawerToggle, drawerSize, drawerWidth }) => {
  const classes = useStyles({ drawerSize, drawerWidth })();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Keep Contacts
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
