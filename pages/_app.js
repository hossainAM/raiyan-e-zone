import { StoreProvider } from '../utils/Store'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
// import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //we can get the session from pageProps
  return (
      <>
      <SessionProvider session={session}>
          <StoreProvider>
            <Component {...pageProps} />
          {/* <Toaster/> */}
          </StoreProvider>
        </SessionProvider>
      </>
  )
}

export default MyApp
