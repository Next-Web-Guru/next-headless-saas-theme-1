import React from 'react';
import Head from 'next/head'
import '../styles/globals.scss';
import { Layout } from '../components';
import '../styles/gutenberg/style.css'
import '../styles/gutenberg/theme.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
