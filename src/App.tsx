import { GlobalStyle } from './Globals';
import { LoginModal } from './Components/LoginModal';
import { AppProvider } from './Contexts/AppContext';

import { ProjectProvider } from './Contexts/ProjectContext';
import { Main } from './Components/Main';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <ProjectProvider>
        <Container>
          <LoginModal />
          <Main />
        </Container>
      </ProjectProvider>
    </AppProvider>
  );
};

export default App;
