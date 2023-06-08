import styled from 'styled-components';
import { Header } from './Header';
import { VBar } from './VBar';
import { Projects } from './Projects';
import { AppContext } from '../Contexts/AppContext';
import { useContext } from 'react';

export const Main: React.FC = () => {
  const { token } = useContext(AppContext);

  return token ? (
    <Container>
      <Header />
      <VBar />
      <Projects />
    </Container>
  ) : null;
};

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 60px 300px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    'header header header'
    'vbar projects docs';
`;
