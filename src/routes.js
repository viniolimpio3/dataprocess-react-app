import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logon from './pages/Logon'
import Register from './pages/Register'
import Home from './pages/Home'
import Forget from './pages/Forget'
import Recover from './pages/Recover'
// import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Logout from './components/Logout'
import Error from './components/Error'
import Rh from './pages/RH'
import Fretes from './pages/Fretes'
import Financeiro from './pages/Financeiro'
import Clientes from './pages/Clientes'
import Veiculos from './pages/Veiculos'
import Relatorios from './pages/Relatorios'
import Fornecedores from './pages/Fornecedores'

export default function AppRoutes() {

    const privateRoutes = [
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/fornecedores",
            element: <Fornecedores />
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
                <Route path="/forget" exact element={<Forget />} />

                {privateRoutes.map((item, index) => (
                    <Route path={item.path} element={<PrivateRoute />} key={index}>
                        <Route path={item.path} element={item.element} />
                    </Route>
                ))}
                <Route exact element={<Recover />} path="/recover/:url_hash" />

                <Route path="/*" element={<Error title="404, Não encontrado" message={"Você será redirecionado para o login em alguns instantes"} expiresTime={20000} />} />
            </Routes>
        </BrowserRouter>
    )
}