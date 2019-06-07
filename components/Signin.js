import React, { useState } from 'react';
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

  const handleChange = name => event => {
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const handleShowPassword = event => {
    setShowPassword(!showPassword);
  };

  return (
    <Mutation mutation={SIGNIN_MUTATION} variables={inputs}>
      {(signIn, { loading, error }) => (
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
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    console.log('asdf');
                    signIn();
                  }}
                >
                  <TextField
                    label="Username"
                    type="text"
                    value={inputs.username}
                    onChange={handleChange('username')}
                    margin="normal"
                    fullWidth
                    InputProps={{ required: true }}
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
