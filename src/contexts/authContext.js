import React, { createContext, useCallback, useContext, useState, useNavigate } from 'react'
import { toast } from 'react-toastify';
import Util from '../helpers/Util';

import api from '../services/api'



const AuthContext = createContext();


async function me(token){
	const res = await api.get('/api/Auth/me', {headers:{
		authorization: `Bearer ${token}`
	}})

	if(res.data) res.data.image_url = Util.api_base_url(res.data.image_url)
	
	return !res.data ? false : res.data
}
function AuthProvider({children}) {
	const [data, setData] = useState(() => {
		const token = localStorage.getItem('@DataProcess:token')
		const user = localStorage.getItem('@DataProcess:user')

		if (token && user) {
			api.defaults.headers.authorization = `Bearer ${token}`

			return { token, user: JSON.parse(user) }
		}

		return {}
	})
		
	const signIn = useCallback(async ({ mail, pass }) => {

		try {
			const response = await api.post('/api/Auth/login',{
				email: btoa(mail),
				password: btoa(pass),
				nome: ""
			})

			const { token } = response.data.data

			let user = await me(token)

			localStorage.setItem('@DataProcess:token', token)
			localStorage.setItem('@DataProcess:user', JSON.stringify(user.data));
			
            api.defaults.headers.authorization = `Bearer ${token}`
            
            setData({ token, user });

            return true;

		} catch (error) {
            localStorage.clear()
			toast.error(`Erro...`)
		}
	}, [])

	const refreshUser = useCallback(async () => {
		const user = JSON.parse(localStorage.getItem('@DataProcess:user'))

		try{
			const apiResponse = await api.get(`/user/${user.id}`)

			localStorage.setItem('@DataProcess:user', JSON.stringify(apiResponse.data.exists));
			setData({ user: apiResponse.data.exists })
		}catch(e){
			console.log("context error", e);
		}
		


	}, [])

	return <AuthContext.Provider value={{ user: data.user, signIn, refreshUser }}>{children}</AuthContext.Provider>
}

function useAuth() {
	const context = useContext(AuthContext)

	return context;
}

export { AuthProvider, useAuth, me }
