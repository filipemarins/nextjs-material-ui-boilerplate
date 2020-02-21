import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import theme from '../src/themes/dark';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const styledComponentSheet = new StyledComponentSheets();
  const materialUiSheets = new MaterialUiServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        materialUiSheets.collect(
          styledComponentSheet.collectStyles(<App {...props} />)
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      materialUiSheets.getStyleElement(),
      ...styledComponentSheet.getStyleElement(),
    ],
  };
};
