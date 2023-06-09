import VerticalHeader from "./verticalHeader";
import HorizontalHeader from "./horizontalHeader";
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { checkSessionAgain } from "../../../redux/cartSlice";
import Router from 'next/router'

const Header = ({path}) => {

  const { data: session } = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if(session) {
      if(!!session.user.image) {
        dispatch(checkSessionAgain(session.user))
      }
    }
    
  },[session])

  useEffect(() => {
    if(path.startsWith('/dashboard') && !localStorage.userRole) {
      Router.push('/account/login')
    }
    
  }, [path])

  const HeaderDistributor = () => {
    if(path.includes('/dashboard')) {
      return <VerticalHeader path={path} />
    } else {
      return <HorizontalHeader path={path} />
    }
  }
  return (
    <>
      {HeaderDistributor()}
    </>
  );
}
export default Header;