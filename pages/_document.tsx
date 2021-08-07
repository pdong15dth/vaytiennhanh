import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>

        </Head>
        <body className="crm_body_bg">
          <Main />
          <NextScript />
            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script>
            <Script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></Script>
        </body>
      </Html>
    );
  }
}
