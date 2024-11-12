import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logoImg from '../../assets/logo-dataprocess.png'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea';

import api from '../../services/api'
import ibge from '../../services/ibge'

import {
	Container,
	ActiveSection,
	Header,
	FormContainer,
	DisabledSection
} from './styles'

import { FiArrowDown } from 'react-icons/fi';
import { toast } from 'react-toastify'

export default function Register() {
	const navigate = useNavigate()
	const [name, changeName] = useState('')
	const [email, changeMail] = useState('')
	const [password, changePass] = useState('')

	async function submitRegister(e) {
		e.preventDefault()
		if (password.length < 6) return toast.error('A senha deve conter no mínimo 6 dígitos!')

		api.post('/api/Auth/register', {
			nome: name,
			email: email,
			password: btoa(password)
		})
			.then(res => {
				localStorage.removeItem('@DataProcess:token')
				localStorage.removeItem('@DataProcess:token')

				if(res.status != 201 && res.data.success === true){
					console.log(res.data)
					toast.error("Houve um erro na criação do seu usuário.")
					return;
				}

				toast.success(res.data.message)

				setTimeout(() => {
					navigate('/')
				}, 2000)
			})
			.catch(e => {
				localStorage.removeItem('@DataProcess:token')
				localStorage.removeItem('@DataProcess:token')

				console.log(e)
				toast.error('Erro.')
			})
	}
	return (
		<Container>
			<DisabledSection>
				<h1>Já tem registro?</h1>
				<Link className="button" to="/">Volte para o Login</Link>
			</DisabledSection>

			<ActiveSection>
				<Header>
					<img src={logoImg} width={125} alt="DataProcess"></img>
					<h1 className="title"> Cadastro</h1>
				</Header>

				<FormContainer>
					<form>
						<Input type="text" name="Nome" onChange={e => changeName(e.target.value)} />
						<Input type="Email" name="E-mail" onChange={e => changeMail(e.target.value)} />
						<Input type="password" name="Senha" onChange={e => changePass(e.target.value)} />

						<button type="submit" className="button" onClick={submitRegister}>
							Cadastar
						</button>
					</form>
				</FormContainer>

				<div className="indicator">
					<FiArrowDown size={'3rem'} />
				</div>

			</ActiveSection>
		</Container>
	)
}
