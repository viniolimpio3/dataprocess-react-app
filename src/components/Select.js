import React from "react";
import styled from 'styled-components';

export const SelectInput = styled.select`
    width: 100%;
    font-size: 1.1rem;
    height: 2.5rem;
`;

export default function Select({ onChange, name, children ,...rest }) {
  return (    
    <SelectInput name={name} onChange={onChange} className="select" id="" {...rest} >{children}</SelectInput>
  );
}