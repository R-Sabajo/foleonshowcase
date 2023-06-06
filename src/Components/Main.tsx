import styled from 'styled-components';
import { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { Header } from './Header';

export const Main = () => {
  const { token } = useContext(AppContext);
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
