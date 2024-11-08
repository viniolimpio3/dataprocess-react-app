import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Util from '../../helpers/Util'

const PrivateRoute = () => {   
    const isAuth = Util.isAuthenticated()
    
    return isAuth == true ? <Outlet /> : <Navigate to="/logout" replace />
}

export default PrivateRoute