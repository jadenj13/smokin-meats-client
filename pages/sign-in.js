import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SignIn from '../components/SignIn';
import getCurrentUser from '../lib/get-current-user';
import redirect from '../lib/redirect';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  item: {
    marginTop: '10vh',
  },
});

const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} sm={8} md={6} className={classes.item}>
          <SignIn />
        </Grid>
      </Grid>
    </div>
  );
};

SignInPage.getInitialProps = async context => {
  const res = await getCurrentUser(context.apolloClient);
  if (res && res.data && res.data.currentUser) {
    redirect(context, '/');
  }

  return {};
};

export default SignInPage;
