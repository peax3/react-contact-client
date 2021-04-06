import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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
    </div>
  );
}

export default Layout;
