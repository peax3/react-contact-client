import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export const ContactAvatar = ({ contactName }) => {
  const classes = useStyles();
  return <Avatar alt={contactName} src="" className={classes.avatar} />;
};
