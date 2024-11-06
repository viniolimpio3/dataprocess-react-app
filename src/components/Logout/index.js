import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

const Logout = () =>{
    useEffect(function(){
        localStorage.clear()
    },[])
    return(
        <Navigate replace to={{ pathname:'/' }}/>
    )

}
export default Logout