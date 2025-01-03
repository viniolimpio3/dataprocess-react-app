import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import logoImg from '../../assets/logo-dataprocess.png'
import Input from '../../components/Input'

import validate from '../../helpers/validators'

import { toast } from 'react-toastify';
import { FiArrowDown } from 'react-icons/fi';


import {
	Container,
	ActiveSection,
	Header,
	FormContainer,
	Title,
	ForgotPassword
} from './styles'


import Util from '../../helpers/Util'


export default function Logon() {
	const navigate = useNavigate()
	
	const [mail, setMail] = useState('')
	const [pass, setPass] = useState('')

	useEffect(() => localStorage.clear(), [])

	const { signIn } = useAuth()

	async function submit(e) {
		e.preventDefault()
		
		validate.login(mail, pass).then( async res => {
			if(!res || res.errors || res.message) return false
			
			const userExists = await signIn({ mail, pass })
			if(userExists) goToHome()
			else toast.error('Email e (ou) senha incorreto(s)')

		}).catch((e) => console.log(e))

	}
	function goToHome() {
		const user = Util.getUser()
		toast.success(`Boa ${user.nome}, espera só um pouquinho..`)
		setInterval(() => window.location = '/home' , 1000)
	}

	return (
		<Container>
			<ActiveSection>
				<Header>
					<img src={logoImg} alt="DataProcess"></img>
				</Header>

				<FormContainer>
					<Title> Faça seu login </Title>

					<form>
						<Input onChange={e => setMail(e.target.value)} type="email" name="E-mail" />
						<Input onChange={e => setPass(e.target.value)} type="password" name="Senha" />

						<button onClick={submit} type="submit" className="button">Entrar</button>
					</form>

					<Link to="/forget">
						<ForgotPassword>
							Esqueceu a Senha?
						</ForgotPassword>
					</Link>
					<Link to="/register">
						<ForgotPassword>
							Registre-se
						</ForgotPassword>
					</Link>
				</FormContainer>	

				<div className="indicator">
					<FiArrowDown size={'3rem'} />
				</div>
			</ActiveSection>
		</Container>
	)
}
