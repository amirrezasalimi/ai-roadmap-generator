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

        <Head>{CssBaseline.flush()}
          <meta name="description" content="AI Roadmap is a website that enables users to create customized roadmaps with the assistance of artificial intelligence." />
          <meta name="keywords" content="AI Roadmap, Roadmap Generator, Roadmap creator , Roadmap maker, planning, learning ,ai assistant" />

          <meta property="og:title" content="Ai Roadmap: Create Customized Roadmaps with AI Assistance" />
          <meta property="og:description" content="Ai Roadmap is a website that enables users to create customized roadmaps with the assistance of artificial intelligence. With AI-Roadmap, you can create a roadmap for any topic, from learning a new skill to planning a project." />
          <meta property="og:image" content="https://ai-roadmap.com/images/preview.png" />
          <meta property="og:url" content="https://ai-roadmap.com" />
          
          <meta name="robots" content="index, follow" />

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