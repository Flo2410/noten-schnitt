import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "context/UserContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#3B82F6" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />

        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="theme-color" content="#E6E7EB" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
