import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navigation/Navbar';
import { AuthProvider } from '../lib/auth';
import { LoadingProgressProvider } from '../lib/loadingProgress';
import MainLayout from '../components/Layouts/MainLayout';
import Sidebar from '../components/Navigation/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <LoadingProgressProvider>
        <AuthProvider>
          <Navbar />
          <Sidebar />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthProvider>
      </LoadingProgressProvider>
    </ChakraProvider>
  )
}

export default MyApp;
