import {
  Divider,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import { signOutUser } from "../manager/auth/authActions";

const useStyles = (props) =>
  makeStyles((theme) => ({
    drawer: {
      [theme.breakpoints.up(props.drawerSize)]: {
        width: props.drawerWidth,
        flexShrink: 0,
      },
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: props.drawerWidth,
    },
  }));

const SideDrawer = ({
  handleDrawerToggle,
  mobileOpen,
  drawerWidth,
  drawerSize,
  signOutUser,
}) => {
  const classes = useStyles({ drawerWidth, drawerSize })();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={signOutUser}>
          <ListItemIcon>
            <Icon className="fas fa-sign-out-alt" />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="side drawer">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default connect(null, { signOutUser })(SideDrawer);
