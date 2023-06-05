import styled from 'styled-components';
import { InputField, InputLabel, Button } from './Form.style';
import { useState } from 'react';

export const LoginModal: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiSecret, setApiSecret] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const handleLoginClick: any = () => {
    reqToken(apiKey, apiSecret);
    setApiKey('');
    setApiSecret('');
  };

  return (
    <LoginModalDiv>
      <Title>Showcase Foleon Docs</Title>
      <LoginForm>
        <InputLabel>
          API Key
          <InputField
            onChange={e => setApiKey(e.target.value)}
            type="username"
            required
          />
        </InputLabel>

        <InputLabel>
          API Secret
          <InputField
            onChange={e => setApiSecret(e.target.value)}
            type="password"
            required
          />
        </InputLabel>

        <LoginMessage id="loginMessage">&nbsp;</LoginMessage>

        <Button onClick={() => handleLoginClick()}>Log in</Button>
      </LoginForm>
    </LoginModalDiv>
  );
};

// Requesting the Access Token
const reqToken = (APIKey: string, APISecret: string) => {
  fetch('https://api.foleon.com/oauth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: `${APIKey}`,
      client_secret: `${APISecret}`,
    }),
  })
    .then(res => {
      if (!res.ok) {
        console.log(res.status);
      }

      return res.json();
    })
    .then(data => {
      let token = data.access_token;
      console.log(token);
    })
    .catch(err => console.log(err.message));
};

// STYLES
const LoginMessage = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: black;
`;

const LoginModalDiv = styled.div`
  border: 1px var(--Grey-Blue) solid;
  border-radius: 8px;
  width: 500px;
  height: 400px;
  box-shadow: var(--Grey-Blue) 0 3px 15px 3px;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  height: 115px;
  padding: 30px 40px;
  background: linear-gradient(
    180deg,
    var(--Dark-Blue) 32.6%,
    var(--Grey-Blue) 100%
  );
`;

const LoginForm = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 325px;
  justify-content: space-between;
  background-color: var(--Light-Grey);
  padding: 40px 40px 40px;
  border-radius: 8px 8px 0 0;
  transform: translateY(-40px);
`;
