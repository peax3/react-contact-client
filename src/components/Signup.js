import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { connect } from "react-redux";
import { signUpUser, clearError } from "../manager/auth/authActions";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../helpers/validator";
import { ButtonWithPreloader } from "./ButtonWithPreLoader";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
}));

const Signup = ({
  signUpUser,
  error,
  authLoading,
  clearError,
  isAuthenticated,
  history,
  ...rest
}) => {
  const classes = useStyles();

  const INITIAL_STATE = {
    firstName: {
      value: "",
      error: "",
      touched: false,
    },
    lastName: {
      value: "",
      error: "",
      touched: false,
    },
    email: {
      value: "",
      error: "",
      touched: false,
    },
    password: {
      value: "",
      error: "",
      touched: false,
    },
    password2: {
      value: "",
      error: "",
      touched: false,
    },
  };

  const [state, setState] = useState(INITIAL_STATE);

  const VALIDATE = {
    firstName: (name) => validateName(name),
    lastName: (name) => validateName(name),
    email: (email) => validateEmail(email),
    password: (password) => validatePassword(password),
    password2: (password2) =>
      validateConfirmPassword(state.password.value, password2),
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/contacts");
    }
    if (error) {
      clearError();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error, history]);

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: {
        ...state[e.target.name],
        value: e.target.value,
      },
    });
  };

  const handleOnBlur = (e) => {
    setState({
      ...state,
      [e.target.name]: {
        ...state[e.target.name],
        touched: true,
        error: VALIDATE[e.target.name](e.target.value),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // go through each field in the state - validate each value and update error
    const newState = {};
    Object.keys(state).forEach((fieldName) => {
      newState[fieldName] = {
        ...state[fieldName],
        error: VALIDATE[fieldName](state[fieldName].value),
      };
    });

    setState(newState); // set state -  to update UI if there is there any error

    const formValidation = Object.keys(newState).reduce(
      (acc, field) => {
        if (newState[field].error) {
          acc.fieldsWithError.push(`${field}`);
        }
        if (!newState[field].touched) {
          acc.fieldsNotTouched.push(`${field}`);
        }
        acc.fields = {
          ...acc.fields,
          [field]: newState[field].value,
        };
        return acc;
      },
      {
        fieldsWithError: [],
        fieldsNotTouched: [],
        fields: {},
      }
    );

    // if all fields have been touched and there is no error
    if (
      formValidation.fieldsNotTouched.length === 0 &&
      formValidation.fieldsWithError.length === 0
    ) {
      const { firstName, lastName, email, password } = formValidation.fields;
      const body = {
        fullName: `${firstName} ${lastName}`,
        email,
        password,
      };
      signUpUser(body);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.heading}
      >
        Keep Contacts
      </Typography>
      <Box>
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        {error && (
          <Typography variant="subtitle2" color="error" align="center">
            {error}
          </Typography>
        )}
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={state.firstName.value}
                error={Boolean(state.firstName.error)}
                helperText={state.firstName.error}
                onBlur={handleOnBlur}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={state.lastName.value}
                error={Boolean(state.lastName.error)}
                helperText={state.lastName.error}
                onBlur={handleOnBlur}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={state.email.value}
                error={Boolean(state.email.error)}
                helperText={state.email.error}
                onBlur={handleOnBlur}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={state.password.value}
                error={Boolean(state.password.error)}
                helperText={state.password.error}
                onBlur={handleOnBlur}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                value={state.password2.value}
                error={Boolean(state.password2.error)}
                helperText={state.password2.error}
                onBlur={handleOnBlur}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <ButtonWithPreloader
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={authLoading}
            onClick={handleSubmit}
          >
            Sign Up
          </ButtonWithPreloader>
        </form>
      </Box>
      <Grid container justify="center">
        <Grid item>
          <Link component={RouterLink} to="/signin" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authLoading: state.authState.authLoading,
  isAuthenticated: state.authState.isAuthenticated,
  error: state.authState.error,
});

export default connect(mapStateToProps, { signUpUser, clearError })(Signup);
