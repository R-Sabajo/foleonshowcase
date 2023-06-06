import { GlobalStyle } from './Globals';
import { LoginModal } from './Components/LoginModal';
import { AppProvider } from './Contexts/AppContext';
import { Header } from './Components/Header';
import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <LoginModal />
      </AppContainer>
    </AppProvider>
  );
};

export default App;
