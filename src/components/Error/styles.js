import styled, { css } from 'styled-components'

//funções css
const flexCenter = css`
    display:flex;
    justify-content:center;
    align-items:center;
`;


export const Container = styled.div`
    ${flexCenter}
    width:100% !important;
    height:100% !important;
    background-color: #fdeded;
    height: 100%;
    width: 100%;
`;