import React from "react";
import styled from "styled-components";

const Container = styled.div`
    input{
      margin: 3px auto;
      font-size: 1.1rem;
      padding: 1.2rem 1.2rem;
    }
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function input({  name, type, ...rest }) {
  return (
    <Container>
      <input type={type} {...rest}  placeholder={name} />
    </Container>
  );
}