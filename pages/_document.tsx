import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ReactDOM from 'react-dom';

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
          <div id="fb-root"></div>

          {/* <!-- Your Plugin chat code --> */}
          <div id="fb-customer-chat" className="fb-customerchat">
          </div>

          <script dangerouslySetInnerHTML={{
            __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "1583344378657934");
            chatbox.setAttribute("attribution", "biz_inbox");
            
            window.fbAsyncInit = function () {
              FB.init({
                xfbml: true,
                version: 'v11.0'
              });
            };
            
            (function (d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}}></script>
          <NextScript />
          <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script>
          <Script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></Script>
          <script type="text/javascript" id="mocJSInitialize" src="https://origin.datatuoi.com/ui/publics/moc.js?key=RkROTW5PTEVibkcxd0xXOGdUSVROWDRLendBVGFCQ0NsN3ZSci9nZGUya3VnSjJ5bGgxTDNmTUhDazNSWXRybA=="></script>
        </body>
      </Html>
    );
  }
}
