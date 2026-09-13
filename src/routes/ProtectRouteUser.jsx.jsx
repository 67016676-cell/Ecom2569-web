import React , {useState,useEffect} from 'react'
import useEcomstore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({ element }) => {
  const  [ ok ,setOk ] = useState(false)
  const user = useEcomstore((state) => state.user)
  const token = useEcomstore((state) => state.token)
    
  useEffect(() => {
    if(user && token){
      // send to back
      currentUser(token)
      .then((res) => setOk(true))
      .catch((err) => setOk(false))
    }
  },[])

  return  ok ? element : <LoadingToRedirect/>
}

export default ProtectRouteUser