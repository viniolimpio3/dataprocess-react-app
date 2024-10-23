import React, { useState } from 'react'
import {Main, Container} from './styles'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import styled, { css } from 'styled-components'

//funções css
const flexCenter = css`
    display:flex;
    justify-content:center;
    align-items:center;
`;

//components
export const Main = styled.div`
    ${flexCenter}
    width:100%;
    z-index:1000;
    background:#e16262;

    h2{
        font-family:'Ubuntu';
        font-size:30px;
        color:#fff;
    }

`;

export const Container = styled.div`
    z-index:1000;
    ${flexCenter}
    width:100vw !important;
    height:100vh !important;
    background:#cecece;
    max-width:300px;
`;

const Error = ({ expiresTime, label, message}) =>{
    const [isOpen, setIsOpen] = useState(true)
    const ref = React.createRef()
    function close(){
        setIsOpen(false)
    }

    setTimeout(() =>{
        ref.current.style='display:none !important'
        close()
    }, expiresTime)

    return(
        <Container ref={ref}>
            <Main>
                <Modal
                    contentLabel={label}
                    isOpen={isOpen}
                    onRequestClose={close}
                >
                    {message}
                </Modal>
            </Main>
        </Container>   
    )
}

export default Error