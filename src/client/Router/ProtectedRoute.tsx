import React, {ReactNode} from 'react'
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const isAuthenticated = (): boolean => {
    const isUserAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')!) as boolean;
    if (!isUserAuthenticated) return false;
    return isUserAuthenticated;
  }

  return isAuthenticated() ? <>{children}</> : <Navigate to='/auth' replace/>
}
export default ProtectedRoute
