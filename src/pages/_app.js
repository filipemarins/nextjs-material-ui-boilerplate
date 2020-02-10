import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider as MaterialUiProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledComponentProvider } from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../themes/dark';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <MaterialUiProvider theme={theme}>
          <StyledComponentProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </StyledComponentProvider>
        </MaterialUiProvider>
      </>
    );
  }
}
