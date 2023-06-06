import { GlobalStyle } from './Globals';
import { LoginModal } from './Components/LoginModal';
import { AppProvider } from './Contexts/AppContext';
import { Main } from './Components/Main';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Container>
        <GlobalStyle />
        <Main />
        <LoginModal />
      </Container>
    </AppProvider>
  );
};

export default App;
