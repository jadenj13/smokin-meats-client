import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Card from './elements/Card';
import Input from './elements/Input';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      username
    }
  }
`;

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signIn, { loading, error }) => (
          <Card>
            <h2 className="card-title">Sign In Below</h2>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
            <button
              onClick={async e => {
                e.preventDefault();
                await signIn();
                this.setState({ email: '', password: '' });
              }}
            >
              Sign In
            </button>
          </Card>
        )}
      </Mutation>
    );
  }
}

export default Signin;
