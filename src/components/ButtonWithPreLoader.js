import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export const ButtonWithPreloader = ({ loading, children, ...rest }) => {
  return (
    <Button {...rest}>
      {children}
      {loading && <Preloader />}
    </Button>
  );
};

const Preloader = () => {
  return (
    <CircularProgress
      size={20}
      style={{ marginLeft: "5px", color: "white" }}
      color="secondary"
    />
  );
};
