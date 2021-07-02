import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { ContactAvatar } from "./ContactAvatar";
import { ContactDetails } from "./ContactDetails";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  buttonContainer: {
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(1),
  },
}));

export const ContactCardContainer = ({ contact, handleDelete }) => {
  const classes = useStyles();
  const { fullName, email, phone } = contact;
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item>
          <ContactAvatar contactName={fullName} />
        </Grid>
        <Grid item>
          <ContactDetails name={fullName} email={email} phone={phone} />
        </Grid>
      </Grid>
      <Grid className={classes.buttonContainer}>
        <Button onClick={handleDelete} size="small" color="secondary">
          Delete
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </Grid>
    </Paper>
  );
};
