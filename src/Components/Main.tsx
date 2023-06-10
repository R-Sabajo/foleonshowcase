import styled from 'styled-components';
import { Header } from './Header';
import { VBar } from './VBar';
import { Projects } from './Projects';
import { Docs } from './Docs';
import { AppContext } from '../Contexts/AppContext';
import { useContext } from 'react';

export const Main: React.FC = () => {
  const { token } = useContext(AppContext);

  return token ? (
    <Container>
      <Header />
      <VBar />
      <Projects />
      <Docs />
    </Container>
  ) : null;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  display: grid;
  grid-template-columns: 60px 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    'header header header'
    'vbar projects docs';
`;
