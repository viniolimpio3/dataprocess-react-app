import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Util from '../../helpers/Util'
import { useAuth } from '../../contexts/authContext'

const PrivateRoute = () => {   
    const isAuth = Util.isAuthenticated()
    
    return isAuth ? <Outlet /> : <Navigate to="/logout" replace />
}

export default PrivateRoute