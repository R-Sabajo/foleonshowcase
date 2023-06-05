import { AppContainer } from './Components/AppContainer.style';
import { GlobalStyle } from './Globals';
import { LoginModal } from './Components/LoginModal';
import { AppProvider, AppContext } from './Contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

const App: React.FC = () => {
  const { token } = useContext(AppContext);

  return (
    <AppProvider>
      <AppContainer>
        <GlobalStyle />
        {!token ? <LoginModal /> : 'hello'}
      </AppContainer>
    </AppProvider>
  );
};

export default App;
