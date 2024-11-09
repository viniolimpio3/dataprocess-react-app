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
import Error from './components/Error'
import Rh from './pages/RH'
import Fretes from './pages/Fretes'
import Financeiro from './pages/Financeiro'
import Clientes from './pages/Clientes'
import Veiculos from './pages/Veiculos'
import Relatorios from './pages/Relatorios'

export default function AppRoutes() {

    const privateRoutes = [
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/rh",
            element: <Rh />
        },
        {
            path: "/fretes",
            element: <Fretes />
        },
        ,
        {
            path: "/financeiro",
            element: <Financeiro />
        },
        {
            path: "/clientes",
            element: <Clientes />
        },
        {
            path: "/veiculos",
            element: <Veiculos />
        },
        {
            path: "/relatorios",
            element: <Relatorios />
        }

    ]

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon />} />
                <Route path="/logout" exact element={<Logout />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/new-service" exact element={<NewService />} />
                <Route path="/aboutus" exact element={<AboutUs />} />
                <Route path="/forget" exact element={<Forget />} />
                <Route path="/profile/:id" exact element={<Profile />} />
                <Route path="/talkwithus" exact element={<TalkWithUs />} />

                {privateRoutes.map((item, index) => (
                    <Route path={item.path} element={<PrivateRoute />} key={index}>
                        <Route path={item.path} element={item.element} />
                    </Route>
                ))}
                <Route exact element={<Recover />} path="/recover/:url_hash" />

                <Route path="/*" element={<Error title="minha lable" message={"404, not found"} expiresTime={10000} />} />
            </Routes>
        </BrowserRouter>
    )
}