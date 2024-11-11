import React from "react";
import { Container } from "./styles.js";
import { TextField } from "@mui/material";

export default function input({  name, type, ...rest }) {
  return (
    <Container  >
      <TextField type={type} {...rest}  placeholder={name} />
    </Container>
  );
}
