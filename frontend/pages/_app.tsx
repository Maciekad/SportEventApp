import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';
import { AuthProvider } from '../lib/auth';



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;
