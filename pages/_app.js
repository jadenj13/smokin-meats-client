import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withApolloClient from '../lib/with-apollo-client';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apolloClient, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
