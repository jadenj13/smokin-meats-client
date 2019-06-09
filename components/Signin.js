import React, { useState } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CURRENT_USER_QUERY } from '../lib/get-current-user';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      id
      username
      role
    }
  }
`;

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(4),
  },
  cardContent: {
    padding: theme.spacing(0),
  },
  button: {
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signInErrors, setSignInErrors] = useState({
    username: '',
    password: '',
  });

  const handleChange = name => e => {
    setInputs({ ...inputs, [name]: e.target.value });
    setSignInErrors({
      username: '',
      password: '',
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = signIn => async e => {
    e.preventDefault;

    try {
      const res = await signIn();
      if (res.data.signIn && res.data.signIn.id) {
        Router.push('/');
      }
    } catch (error) {
      setInputs({ ...inputs, password: '' });
      if (error.message.toLowerCase().includes('user not found')) {
        setSignInErrors({ ...signInErrors, username: 'Username not found.' });
      } else if (error.message.toLowerCase().includes('invalid password')) {
        setSignInErrors({ ...signInErrors, password: 'Invalid password.' });
      }
    }
  };

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={inputs}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signIn, { loading }) => (
        <Card className={classes.card} raised>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <CardHeader
                title="Sign In"
                titleTypographyProps={{ variant: 'h4', component: 'h4' }}
                className={classes.cardContent}
              />
              <CardContent className={classes.cardContent}>
                <form onSubmit={handleSignIn(signIn)}>
                  <TextField
                    label="Username"
                    type="text"
                    value={inputs.username}
                    onChange={handleChange('username')}
                    margin="normal"
                    fullWidth
                    InputProps={{ required: true }}
                    helperText={signInErrors.username || false}
                    FormHelperTextProps={{ error: true }}
                    error={!!signInErrors.username}
                  />
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={inputs.password}
                    onChange={handleChange('password')}
                    margin="normal"
                    fullWidth
                    InputProps={{
                      required: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={signInErrors.password || false}
                    FormHelperTextProps={{ error: true }}
                    error={!!signInErrors.password}
                  />
                  <CardActions>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={
                        inputs.username && inputs.password ? false : true
                      }
                    >
                      Sign In
                    </Button>
                  </CardActions>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </Mutation>
  );
}

export default SignIn;
