import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logon from './pages/Logon'
import Register from './pages/Register'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import NewService from './pages/NewService'
import Forget from './pages/Forget'
import Recover from './pages/Recover'
import Profile from './pages/Profile'
import TalkWithUs from './pages/TalkWithUs'

import PrivateRoute from './components/PrivateRoute'
import Logout from './components/Logout'
import Util from './helpers/Util'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon/>}/>
                <Route path="/logout" exact element={<Logout/>} />
                <Route path="/register" exact={true} element={<Register/>} />
                <Route path="/new-service" exact={true} element={<NewService/>} />
                <Route path="/aboutus" exact={true} element={<AboutUs/>} />
                <Route path="/forget" exact={true} element={<Forget/>} />
                <Route path="/profile/:id" exact={true} element={<Profile/>} />
                <Route path="/talkwithus" exact={true} element={<TalkWithUs/>} />

                <Route exact={true} Component={<PrivateRoute/>} path="/home" />
                <Route exact={true} Component={<PrivateRoute/>} path="/profile" />

                <Route exact={true} element={<Recover/>} path="/recover/:url_hash"/>

                <Route path="/*" element={() =>(<div> <h1>404!!!</h1>  </div>)} />
            </Routes>
        </BrowserRouter>
    )
}