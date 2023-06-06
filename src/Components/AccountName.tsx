import styled from 'styled-components';
import { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';

export const AccountName = () => {
  const { token } = useContext(AppContext);

  return (
    <Container>
      <Name>Rama Sabajo | #50116</Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-width: 500px;
  height: 30px;
  overflow: hidden;
`;

const Name = styled.p`
  font-size: 22;
  font-weight: 600;
`;
