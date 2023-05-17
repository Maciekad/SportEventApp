import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from "next-auth/react"
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (
  <SessionProvider session={session}>
    <div className='font-sans px-5'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  </SessionProvider>
  )
}

export default MyApp;
