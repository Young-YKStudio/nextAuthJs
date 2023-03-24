import { MdHome, MdSpaceDashboard, MdOutlineForwardToInbox, MdSell } from "react-icons/md";

export const links = [
  {
    name: 'Products',
    href: '/products',
    icon: <MdSell className="w-5 h-5" />
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className="w-5 h-5" />
  },
]

export const dashboardLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <MdHome className='w-5 h-5' />
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className='w-5 h-5'/>
  },
  {
    name: 'Login',
    href: '/account/login',
  },
]