import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(3),
  },
  phone: {
    lineHeight: 0,
  },
}));

export const ContactDetails = ({ name, email, phone }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.phone} variant="overline">
          {phone}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          {email}
        </Typography>
      </Grid>
    </Grid>
  );
};
