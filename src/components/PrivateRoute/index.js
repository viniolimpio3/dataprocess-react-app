import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Util from '../../helpers/Util'

const  PrivateRoute = ({ component: Component, ...rest  }) =>{   
    const isAuth = Util.isAuthenticated()
    return(
        <Route 
            { ...rest }
            render={
                (props) => isAuth ? (
                    <Component {...props} />
                ): (
                    <Navigate
                        replace
                        to={{
                            pathname:'/',
                            state:{from: props.location}
                        }}
                    />
                )
                
            }
        />
    )
}
export default PrivateRoute;