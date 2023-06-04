import React from 'react';
import styled from 'styled-components';
import { InputField, InputLabel, Button } from './Form.style';

const LoginModalStyles = styled.div`
  width: 550px;
  height: 450px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  width: 550px;
  height: 140px;
  padding: 40px 40px;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    #001945 32.6%,
    rgba(0, 25, 69, 0.38) 100%
  );
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 350px;
  justify-content: space-between;
  background-color: var(--Light-Grey);
  border-radius: 8px;
  padding: 50px 40px 40px;
  transform: translateY(-40px);
`;

export default function LoginModal() {
  return (
    <LoginModalStyles>
      <Title>Showcase Foleon Docs</Title>
      <LoginForm>
        <div>
          <InputLabel>API Key</InputLabel>
          <InputField></InputField>
        </div>

        <div>
          <InputLabel>API Secret</InputLabel>
          <InputField></InputField>
        </div>
        <div>
          <InputLabel>Message after login</InputLabel>
        </div>
        <Button>Log in</Button>
      </LoginForm>
    </LoginModalStyles>
  );
}
