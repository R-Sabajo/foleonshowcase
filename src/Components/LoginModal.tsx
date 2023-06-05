import styled from 'styled-components';
import { InputField, InputLabel, Button } from './Form.style';

export default function LoginModal() {
  return (
    <LoginModalDiv>
      <Title>Showcase Foleon Docs</Title>
      <LoginForm>
        <InputLabel>
          API Key
          <InputField type="username" required />
        </InputLabel>

        <InputLabel>
          API Secret
          <InputField type="password" required />
        </InputLabel>

        <LoginMessage id="loginMessage">&nbsp;</LoginMessage>

        <Button>Log in</Button>
      </LoginForm>
    </LoginModalDiv>
  );
}
const loginSucces: boolean = true;

const LoginMessage = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: ${loginSucces ? 'green' : 'red'};
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
