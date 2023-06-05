import { AppContainer } from './Components/AppContainer.style';
import { GlobalStyle } from './Globals';
import { LoginModal } from './Components/LoginModal';
import { AppProvider } from './Contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContainer>
        <GlobalStyle />
        <LoginModal />
      </AppContainer>
    </AppProvider>
  );
};

export default App;
