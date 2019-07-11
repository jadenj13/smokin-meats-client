import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ComponentContainer from '@material-ui/core/Container';
import theme from '../lib/theme';
import withApolloClient from '../lib/with-apollo-client';
import Header from '../components/Header';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apolloClient, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/static/index.css" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <title>Let's Get Smokin'</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <ComponentContainer>
              <Component {...pageProps} />
            </ComponentContainer>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
