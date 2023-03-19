import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '@/components/header/Header'

export default function App({ Component, pageProps: {session, ...pageProps} }) {

  const { pathname } = useRouter()

  const styleDistributor = (path) => {
    if(path.includes('/dashboard')) {
      return 'flex flex-row'
    } else {
      return 'flex flex-col'
    }
  }

  return (
  <SessionProvider session={session}>
    <div className={styleDistributor(pathname)}>
      <Header path={pathname} />
      <Component {...pageProps} />
    </div>
  </SessionProvider>
  )
}
