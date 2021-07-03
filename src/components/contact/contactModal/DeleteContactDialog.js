import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import {
  clearContactTodelete,
  deleteContact,
} from "../../../manager/contact/contactActions";

const DeleteContactDialog = ({
  isOpen,
  handleClose,
  clearContactTodelete,
  deleteContact,
  contactToDelete,
}) => {
  const closeModal = () => {
    clearContactTodelete();
    handleClose();
  };

  const handleAgreeToDelete = () => {
    console.log({ contactToDelete });
    deleteContact(contactToDelete);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Disagree
        </Button>
        <Button color="primary" autoFocus onClick={handleAgreeToDelete}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  contactToDelete: state.contactState.contactToDeleteId,
});

export default connect(mapStateToProps, {
  clearContactTodelete,
  deleteContact,
})(DeleteContactDialog);
