import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

export default function App({ Component, pageProps: {session, ...pageProps} }) {

  const { pathname } = useRouter()

  const styleDistributor = (path) => {
    if(path.includes('/dashboard')) {
      return 'flex flex-row flex-nowrap'
    } else {
      return 'flex flex-col'
    }
  }

  return (
  <SessionProvider session={session}>
    {/* <div className={styleDistributor(pathname)}>
      <Header path={pathname} />
      <Component {...pageProps} />
    </div> */}
    <Provider store={store}>
      <div className={styleDistributor(pathname)}>
        <Header path={pathname} />
        <Component {...pageProps} />
      </div>
    </Provider>
  </SessionProvider>
  )
}
