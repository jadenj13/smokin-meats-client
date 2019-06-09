import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Logo from './Logo';
import User from './User';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const useStyles = makeStyles(theme => ({
  root: {},
  appBar: {
    backgroundColor: '#373737',
  },
  toolBar: {
    padding: `0 ${theme.spacing(5)}px`,
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: theme.spacing(4),
  },
}));

const Header = props => {
  const classes = useStyles();

  return (
    <User>
      {({ data: { currentUser } }) => (
        <div className={classes.root}>
          <AppBar
            position="static"
            className={classes.appBar}
            component="header"
          >
            <ToolBar className={classes.toolBar}>
              <Box className={classes.logo}>
                <Logo size="lg" />
              </Box>
              <Link href="/">
                <Typography variant="h5" component="a" className={classes.link}>
                  Blog
                </Typography>
              </Link>
              <Link href="/">
                <Typography variant="h5" component="a" className={classes.link}>
                  Forum
                </Typography>
              </Link>
              <Link href="/">
                <Typography variant="h5" component="a" className={classes.link}>
                  Recipes
                </Typography>
              </Link>
              {currentUser ? (
                <Link href="/sign-in">
                  <Typography
                    variant="h5"
                    component="a"
                    className={classes.link}
                  >
                    Account
                  </Typography>
                </Link>
              ) : (
                <Link href="/sign-in">
                  <Typography
                    variant="h5"
                    component="a"
                    className={classes.link}
                  >
                    Sign In
                  </Typography>
                </Link>
              )}
            </ToolBar>
          </AppBar>
        </div>
      )}
    </User>
  );
};
export default Header;
