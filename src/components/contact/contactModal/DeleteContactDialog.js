import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React from "react";

export const DeleteContactDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
