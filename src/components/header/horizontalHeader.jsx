import { links } from '../../../data/navigations'
import { signOut, signIn, useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { MdLogin, MdLogout, MdMenu, MdClose } from 'react-icons/md'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HorizontalHeader = ({path}) => {

  const { data: session } = useSession()
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const buttonStyles = (href) => {
    if (path === href) {
      return 'bg-indigo-400/50 px-4 py-2 rounded-md flex items-center truncate'
    } else {
      return 'hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center truncate'
    }
  }

  const menuButtonHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  console.log(session, 'from header session')

  return (
    <>
      <nav className="fixed top-0 z-40 bg-indigo-900 w-full text-indigo-100 p-4 flex justify-between">
        <div className='flex items-center w-full justify-center md:justify-start'>
          <p className='font-bold text-2xl'>Logo</p>
        </div>
        {/* full menu */}
        <div className='hidden md:flex flex-row items-center gap-4'>
          {links && links.map((link, i) => {
            return <NextLink
              key={i}
              href={link.href}
              className={buttonStyles(link.href)}
            >
              {link.icon && <span className='mr-2'>{link.icon}</span>}{link.name}
            </NextLink>
          })}
          { session ? 
            <button
              onClick={() => signOut()}
              className='hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center'
            >
              <MdLogout className='mr-2 w-5 h-5'/>Logout
            </button>
            :
            <NextLink 
              href='/account/login'
              className="hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center"
            >
              <MdLogin className='mr-2 w-5 h-5' />Login
            </NextLink>
          }
        </div>
        {/* hamburger */}
        <div className='flex items-center md:hidden'>
          <button 
            className='fixed top-[0.85em] right-2 px-4 py-2 rounded-md flex items-center hover:bg-indigo-400/50'
            onClick={menuButtonHandler}
          >
            {isMenuOpen ?
              <MdClose className='w-5 h-5'/>
            :
              <MdMenu className='w-5 h-5'/>
            }
          </button>
        </div>
      </nav>
      {isMenuOpen &&
        <AnimatePresence>
          <motion.section 
            className='text-indigo-900 bg-white/90 fixed top-[4.25em] right-2 w-72 z-40 p-4 rounded-md shadow-md flex flex-col gap-2 md:hidden'
            initial={{ opacity: 0, x: 400}}
            animate={{ opacity: 1, x: 0}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {links && links.map((link) => {
              return <NextLink
                key={link.name}
                href={link.href}
                className={buttonStyles(link.href)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <span className='mr-2'>{link.icon}</span>}{link.name}
              </NextLink>
            })}
          </motion.section>
        </AnimatePresence>
      }
    </>
  );
}
export default HorizontalHeader; 