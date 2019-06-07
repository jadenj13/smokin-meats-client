import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      username
      role
      created
    }
  }
`;

export default async apolloClient => {
  try {
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    return user;
  } catch (error) {
    return null;
  }
};
