import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from "next-auth/react"
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp;
