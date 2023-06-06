import styled from 'styled-components';
import { Header } from './Header';

export const Main = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
