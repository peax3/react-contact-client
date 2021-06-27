import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { connect } from "react-redux";
import { signInUser, clearError } from "../manager/auth/authActions";
import { validateEmail, validatePassword } from "../helpers/validator";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    marginBottom: theme.spacing(5),
  },
  box: {
    padding: theme.spacing(3, 3),
    marginBottom: theme.spacing(2),
    borderRadius: "1rem",
  },
}));

const SignIn = ({
  signInUser,
  isAuthenticated,
  clearError,
  error,
  history,
  ...rest
}) => {
  const classes = useStyles();

  const INITIAL_STATE = {
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
  };

  const VALIDATE = {
    email: (value) => validateEmail(value),
    password: (value) => validatePassword(value),
  };

  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/contacts");
    }

    if (error) {
      clearError();
    }
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
    Object.keys(state).forEach((name) => {
      newState[name] = {
        ...state[name],
        error: VALIDATE[name](state[name].value),
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
      const body = { ...formValidation.fields };
      signInUser(body);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography
        component="h1"
        variant="h5"
        className={classes.heading}
        align="center"
      >
        Keep Contacts
      </Typography>
      <Box boxShadow={3} className={classes.box}>
        <Typography component="h2" variant="h6" align="center">
          Sign In
        </Typography>
        {error && (
          <Typography variant="subtitle2" color="error" align="center">
            {error}
          </Typography>
        )}
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={state.email.value}
                error={state.email.error ? true : false}
                helperText={state.email.error}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
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
                error={state.password.error ? true : false}
                helperText={state.password.error}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </Box>
      <Grid container justify="center">
        <Grid item>
          <Link component={LinkBehaviour} variant="body2">
            Don't have an account? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

const LinkBehaviour = React.forwardRef((props, ref) => {
  return <RouterLink ref={ref} to="/signup" {...props} />;
});

const mapStateToProps = (state) => ({
  isLoading: state.authState.loading,
  isAuthenticated: state.authState.isAuthenticated,
  error: state.authState.error,
});

export default connect(mapStateToProps, { signInUser, clearError })(SignIn);
