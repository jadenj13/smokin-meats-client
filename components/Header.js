import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  hide: {
    display: 'none',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: theme.spacing(4),
  },
  drawer: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawerPaper: {
    width: 240,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Forum', href: '/forum' },
    { name: 'Recipes', href: '/recipes' },
  ];

  const handleOpenDrawer = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

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
              <Box
                className={classes.logo}
                display={{ xs: 'none', md: 'flex' }}
              >
                <Logo size="lg" />
              </Box>
              <Box
                className={classes.logo}
                display={{ xs: 'flex', md: 'none' }}
              >
                <Logo size="sm" />
              </Box>
              <Box display={{ xs: 'flex', md: 'none' }}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleOpenDrawer}
                  edge="end"
                  className={clsx(showDrawer && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={showDrawer}
                  className={classes.drawer}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton
                      onClick={handleCloseDrawer}
                      aria-label="Close drawer"
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {menuItems.map((menuItem, index) => (
                      <ListItem key={`${menuItem.name}-${index}`}>
                        <Link href={menuItem.href}>
                          <Typography variant="h5" component="a">
                            {menuItem.name}
                          </Typography>
                        </Link>
                      </ListItem>
                    ))}
                    {currentUser ? (
                      <ListItem>
                        <Link href="/account">
                          <Typography variant="h5" component="a">
                            Account
                          </Typography>
                        </Link>
                      </ListItem>
                    ) : (
                      <ListItem>
                        <Link href="/sign-in">
                          <Typography variant="h5" component="a">
                            Sign In
                          </Typography>
                        </Link>
                      </ListItem>
                    )}
                  </List>
                </Drawer>
              </Box>
              <Box display={{ xs: 'none', md: 'flex' }}>
                {menuItems.map((menuItem, index) => (
                  <Link href={menuItem.href} key={`${menuItem.name}-${index}`}>
                    <Typography
                      variant="h5"
                      component="a"
                      className={classes.link}
                    >
                      {menuItem.name}
                    </Typography>
                  </Link>
                ))}
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
                  <Link href="/account">
                    <Typography
                      variant="h5"
                      component="a"
                      className={classes.link}
                    >
                      Sign In
                    </Typography>
                  </Link>
                )}
              </Box>
            </ToolBar>
          </AppBar>
        </div>
      )}
    </User>
  );
};
export default Header;
