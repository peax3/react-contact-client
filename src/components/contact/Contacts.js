import { LinearProgress, Fab, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

import { ContactCardContainer } from "./ContactCardContainer";
import { AddContactModal } from "./contactModal/AddContactModal";
import { DeleteContactDialog } from "./contactModal/DeleteContactDialog";
import { connect } from "react-redux";

import { getContacts } from "../../manager/contact/contactActions";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const Contacts = ({ contactsData, loadingContact, getContacts }) => {
  const [isAddContactModalOpen, setIsOpenAddContactModal] = useState(false);
  const [isDeleteContactDialog, setDeleteContactDialog] = useState(false);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  console.log({ contactsData });
  console.log({ loadingContact });

  const openDeleteContactDialog = () => {
    setDeleteContactDialog(true);
  };

  const closeDeleteContactDialog = () => {
    setDeleteContactDialog(false);
  };

  const OpenAddContactModal = () => {
    setIsOpenAddContactModal(true);
  };

  const closeOpenAddContactModal = () => {
    setIsOpenAddContactModal(false);
  };

  const classes = useStyles();

  if (loadingContact) {
    return <LinearProgress />;
  }

  return (
    <div className={classes.root}>
      {!loadingContact && contactsData.length === 0 ? (
        <Typography>You have no contacts.</Typography>
      ) : (
        <div>
          {contactsData.map((contact) => {
            return (
              <ContactCardContainer
                key={contact._id}
                contact={contact}
                handleDelete={openDeleteContactDialog}
              />
            );
          })}
        </div>
      )}
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={OpenAddContactModal}
      >
        <AddIcon />
      </Fab>

      <AddContactModal
        isOpen={isAddContactModalOpen}
        handleClose={closeOpenAddContactModal}
      />

      <DeleteContactDialog
        isOpen={isDeleteContactDialog}
        handleClose={closeDeleteContactDialog}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  contactsData: state.contactState.contacts,
  loadingContact: state.contactState.loadingContact,
});

export default connect(mapStateToProps, { getContacts })(Contacts);
