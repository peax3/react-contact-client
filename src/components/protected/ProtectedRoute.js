import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { isAuth } = rest;

  if (!isAuth) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
