import React from 'react'
import { Container } from './styles'

import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Button } from '@mui/material'

const Error = ({ expiresTime, title, message }) => {
    const navigate = useNavigate()

    const left = () => {
        navigate('/logout')
    }
    return (
        <Container>
            <Alert severity="error" style={{marginTop: '20px', minWidth: '300px', display: 'flex', justifyContent: 'center'}}>
                <AlertTitle>{title}</AlertTitle>
                <p>
                    {message}
                </p>
                <Button style={{marginTop: '20px'}} variant='outlined' color='error'  onClick={left}> Voltar </Button>
            </Alert>
        </Container>
    )
}

export default Error