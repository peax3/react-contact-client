import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10),
  },
  title: {
    textAlign: "center",
  },
}));

export const AddContactModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="Add-contact-title" className={classes.title}>
        Add Contact
      </DialogTitle>

      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phoneNumber"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};
