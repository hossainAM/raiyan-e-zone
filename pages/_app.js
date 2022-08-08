import { StoreProvider } from '../utils/Store'
import { SessionProvider, useSession } from 'next-auth/react'
import '../styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //Downgrade react 18 to 17 to solve 'Hydration failed because the initial UI does not match what was rendered on the server' error;

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true)
  }, [])

  if(!showChild) {
    return null
  }

  //we can get the session from pageProps
  return (
      <>
      <SessionProvider session={session}>
          <StoreProvider>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )} 
          </StoreProvider>
        </SessionProvider>
      </>
  );
}

//Auth function to control the access to only authenticated user (protected page)

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if(status === 'loading') {
    return <div>Loading...</div>;
  }
  return children;
}

export default MyApp
