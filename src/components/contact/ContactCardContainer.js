import { Button, makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { connect } from "react-redux";
import { ContactAvatar } from "./ContactAvatar";
import { ContactDetails } from "./ContactDetails";

import {
  setEditContact,
  setContactToDelete,
} from "../../manager/contact/contactActions";

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

const ContactCardContainer = ({
  contact,
  openDeleteModal,
  openEditModal,
  setEditContact,
  setContactToDelete,
}) => {
  const classes = useStyles();
  const { fullName, email, phone } = contact;

  const handleEdit = () => {
    setEditContact(contact);
    openEditModal();
  };

  const handleDelete = () => {
    setContactToDelete(contact);
    openDeleteModal();
  };

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
        <Button size="small" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  inEditContactMode: state.contactState.inEditMode,
});

export default connect(mapStateToProps, { setEditContact, setContactToDelete })(
  ContactCardContainer
);
