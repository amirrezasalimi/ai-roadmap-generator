import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <link rel="icon" href="/favicon.svg" />

        <Head>
          {CssBaseline.flush()}
          <meta name="description" content="AI Roadmap is a website that enables users to create customized roadmaps with the assistance of artificial intelligence." />
          <meta name="keywords" content="AI Roadmap, Roadmap Generator, Roadmap creator , Roadmap maker, planning, learning ,ai assistant" />

          <meta property="og:title" content="Ai Roadmap: Create Customized Roadmaps with AI Assistance" />
          <meta property="og:description" content="Ai Roadmap is a website that enables users to create customized roadmaps with the assistance of artificial intelligence. With AI-Roadmap, you can create a roadmap for any topic, from learning a new skill to planning a project." />
          <meta property="og:image" content="https://ai-roadmap.com/images/preview.png" />
          <meta property="og:url" content="https://ai-roadmap.com" />

          <meta name="robots" content="index, follow" />

          <div dangerouslySetInnerHTML={{
            __html: `<!-- Google Tag Manager -->
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PR49CQH');</script>
          <!-- End Google Tag Manager --></Head>

          <script type='text/javascript'>
          window.smartlook||(function(d) {
        var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
        var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
        c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
        })(document);
        smartlook('init', '2bd008b8cc9711dbf53820b7169f0c92d4622935', { region: 'eu' });
    </script>`
          }}>

          </div>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;