import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo-dataprocess.png'
import Input from '../../components/Input'

import {
  Container,
  ActiveSection,
  Header,
  FormContainer,
  DisabledSection
} from './styles'

import { FiArrowDown } from 'react-icons/fi';
import { toast } from 'react-toastify'

//---Começo da API---//


export default function Register() {
  const [name, changeName] = useState('')
  const [email, changeMail] = useState('')
  const [password, changePass] = useState('')

  // //get ufs

  // useEffect(() => {
  // 	async function getUfsOnIBGE() {
  // 		const ufs = await ibge.getUfs()
  // 		setUfs(ufs)

  // 	}
  // 	getUfsOnIBGE()
  // }, [])

  // useEffect(() => {
  // 	async function getCitiesOnIBGE() {
  // 		const cities = await ibge.getCities(selectedUf)
  // 		setCities(cities)

  // 	}
  // 	getCitiesOnIBGE()
  // }, [selectedUf])

  //  SUBMIT- -----------------------------

  async function submitRegister(e) {
    e.preventDefault()
    toast.warn("Infelizmente, essa função ainda não está ativa na plataforma :/")
    // if (password.length < 6) return toast.error('A senha deve conter no mínimo 6 dígitos!')

    // api.post('/signup', {
    //   name: name,
    //   email: email,
    //   password: password
    // })
    //   .then(res => {
    //     console.log(res, 'res')
    //     localStorage.removeItem('@DataProcess:token')
    //     //confirmação
    //     localStorage.setItem('@DataProcess:token', `Bearer ${res.data.token}`)

    //     setTimeout(() => {
    //       goToLogin()
    //     }, 2000)
    //   })
    //   .catch(e => {
    //     localStorage.removeItem('@DataProcess:token')

    //     console.log(e)
    //     toast.error('Erro..')
    //   })
  }
  function goToLogin() {
    window.location = '/'
  }

  return (
    <Container>
      <DisabledSection>
        <h1>Lembrou a senha?</h1>
        <Link className="button" to="/">Volte para o Login</Link>
      </DisabledSection>

      <ActiveSection>
        <Header>
          <img src={logoImg} width={125} alt="DataProcess"></img>
          <h1 className="title"> Esqueci minha senha </h1>
        </Header>

        <FormContainer>
          <form>
            <Input type="Email" name="E-mail" onChange={e => changeMail(e.target.value)} />
            <button type="submit" className="button" onClick={submitRegister}>
              Prosseguir
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