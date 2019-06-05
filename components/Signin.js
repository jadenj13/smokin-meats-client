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

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      username
    }
  }
`;

const useStyles = makeStyles({
  card: {
    width: '90vw',
    maxWidth: 550,
    padding: 40,
  },
  cardContent: {
    padding: 0,
  },
  button: {
    marginLeft: 'auto',
    marginTop: 10,
  },
});

function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Mutation mutation={SIGNIN_MUTATION} variables={values}>
      {(signIn, { loading, error }) => (
        <Card className={classes.card}>
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
                <TextField
                  label="Username"
                  type="text"
                  value={values.username}
                  onChange={handleChange('username')}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  margin="normal"
                  fullWidth
                />
                <CardActions>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={signIn}
                  >
                    Sign In
                  </Button>
                </CardActions>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </Mutation>
  );
}

export default SignIn;
