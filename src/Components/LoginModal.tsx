import styled from 'styled-components';
import { InputField, InputLabel, Button } from './Form.style';
import { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';

import failIcon from '../img/fail.svg';
import succesIcon from '../img/succes.svg';

export const LoginModal: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiSecret, setApiSecret] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<any>('');
  const [loginSucces, setLoginSucces] = useState<boolean>(false);
  const { token, setToken } = useContext(AppContext);

  // REQUEST ACCESS TOKEN
  const reqToken = async (APIKey: string, APISecret: string) => {
    let url = 'https://api.foleon.com/oauth';
    let options = {
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
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        setLoginSucces(false);
        setLoginMessage(
          'The API Key or Secret you entered is incorrect. Try again.'
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoginSucces(true);
      setLoginMessage('Login Succesful!');
      setApiKey('');
      setApiSecret('');
      const data = await response.json();
      if (!data) {
        return;
      } else {
        setTimeout(() => {
          setToken(data.access_token);
          setLoginMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = () => {
    reqToken(apiKey, apiSecret);
  };

  return !token ? (
    <Container>
      <LoginModalDiv>
        <Title>Showcase Foleon Docs</Title>
        <LoginForm>
          <InputLabel>
            API Key
            <InputField
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              type="username"
              required
            />
          </InputLabel>

          <InputLabel>
            API Secret
            <InputField
              value={apiSecret}
              onChange={e => setApiSecret(e.target.value)}
              type="password"
              required
            />
          </InputLabel>

          <LoginMessage color={loginSucces ? 'green' : 'red'}>
            {loginMessage && (
              <img
                src={loginSucces ? succesIcon : failIcon}
                alt="login succes or fail icon"
              />
            )}
            {loginMessage}
          </LoginMessage>

          <Button type="submit" onClick={() => handleLoginClick()}>
            Log in
          </Button>
        </LoginForm>
      </LoginModalDiv>
    </Container>
  ) : null;
};

// STYLES

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const LoginMessage = styled.p`
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  font-weight: 400;
  color: ${props => props.color};
`;
