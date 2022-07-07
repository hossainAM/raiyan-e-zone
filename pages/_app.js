import { StoreProvider } from '../utils/Store'
import '../styles/globals.css'
// import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
      <>
        <StoreProvider>
          <Component {...pageProps} />
        {/* <Toaster/> */}
        </StoreProvider>
      </>
  )
}

export default MyApp
