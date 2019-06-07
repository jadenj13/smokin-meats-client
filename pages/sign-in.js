import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SignIn from '../components/SignIn';
import getCurrentUser from '../lib/get-current-user';
import redirect from '../lib/redirect';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    minHeight: '100vh',
  },
  item: {
    marginBottom: '20vh',
  },
});

const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12} sm={8} md={6} className={classes.item}>
          <SignIn />
        </Grid>
      </Grid>
    </div>
  );
};

SignInPage.getInitialProps = async context => {
  const user = await getCurrentUser(context.apolloClient);
  if (user) {
    return redirect(context, '/');
  }

  return {};
};

export default SignInPage;
