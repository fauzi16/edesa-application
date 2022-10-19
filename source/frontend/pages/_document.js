import React from 'react';
import Document, {Head, Main, NextScript, Html} from 'next/document';
export default class extends Document {
  render() {
    return (
      <Html>
        <Head/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}