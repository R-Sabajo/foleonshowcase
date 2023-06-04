import React from 'react';
import { AppContainer } from './Components/AppContainer.style';
import { GlobalStyle } from './Globals';
import LoginModal from './Components/LoginModal';

const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <LoginModal></LoginModal>
    </AppContainer>
  );
};

export default App;
