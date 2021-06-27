import { makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Contacts from "./contact/Contacts";
import Header from "./Header";
import SideDrawer from "./SideDrawer";

const Drawer = {
  width: 240,
  size: "sm",
};

const useStyles = makeStyles((theme) => ({
  root: {
    root: {
      display: "flex",
    },
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up(Drawer.size)]: {
      marginLeft: 240,
    },
  },
}));

function Layout() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header
        drawerWidth={Drawer.width}
        drawerSize={Drawer.size}
        handleDrawerToggle={handleDrawerToggle}
      />
      ;
      <SideDrawer
        drawerWidth={Drawer.width}
        drawerSize={Drawer.size}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.main}>
        <Toolbar />
        <div>
          <Contacts />
        </div>
      </main>
    </div>
  );
}

export default Layout;
