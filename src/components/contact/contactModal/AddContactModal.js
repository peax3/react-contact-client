import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import {
  isEmailValidWithRegex,
  isPhoneNumberValid,
} from "../../../helpers/validator";
import {
  addContact,
  clearEditContact,
  updateContact,
} from "../../../manager/contact/contactActions";
import { connect } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10),
  },
  title: {
    textAlign: "center",
  },
}));

const AddContactModal = ({
  isOpen,
  handleClose,
  addContact,
  clearEditContact,
  inEditMode,
  contactToEdit,
  updateContact,
}) => {
  const classes = useStyles();

  const initialContactState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const [contactState, setContactState] = useState(initialContactState);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (inEditMode) {
      const { firstName, lastName, email, phone } = contactToEdit;
      setContactState({ firstName, lastName, email, phone });
    }
    // eslint-disable-next-line
  }, [inEditMode]);

  const { firstName, lastName, email, phone } = contactState;

  const handleInputChange = (e) => {
    setContactState({
      ...contactState,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setContactState(initialContactState);
    setError([]);
    clearEditContact();
    handleClose();
  };

  const RemoveError = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);
    setError([]);
  };

  const handleSubmit = (e) => {
    const errors = [];
    let trimmedContact = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    };

    if (!trimmedContact.firstName && !trimmedContact.lastName) {
      errors.push(
        "First name and last name  can not be empty. Please fill one or both fields"
      );
    }

    if (!trimmedContact.email && !trimmedContact.phone) {
      errors.push(
        "Email and phone Number can not be empty. Please fill one or both fields"
      );
    }

    if (trimmedContact.email && !isEmailValidWithRegex(trimmedContact.email)) {
      errors.push("Please enter a valid email");
    }

    if (trimmedContact.phone && !isPhoneNumberValid(trimmedContact.phone)) {
      errors.push("Please enter a valid phone number");
    }

    setError([...errors]);
    RemoveError();

    if (errors.length === 0) {
      if (inEditMode) {
        trimmedContact = {
          ...trimmedContact,
          _id: contactToEdit._id,
        };
        updateContact(trimmedContact);
      } else {
        addContact(trimmedContact);
      }

      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle id="Add-contact-title" className={classes.title}>
        {!inEditMode ? "Add Contact" : "Edit Contact"}
      </DialogTitle>

      <DialogContent>
        <form>
          {error.length > 0 && (
            <Typography
              variant="body2"
              color="secondary"
              align="center"
              paragraph
            >
              {error[0]}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {!inEditMode ? "Save" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  inEditMode: state.contactState.inEditMode,
  contactToEdit: state.contactState.contactToEdit,
});

export default connect(mapStateToProps, {
  addContact,
  clearEditContact,
  updateContact,
})(AddContactModal);
