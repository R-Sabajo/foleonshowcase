import styled from 'styled-components';
import { DocContext } from '../Contexts/DocContext';
import { useContext } from 'react';

export const Pagination: React.FC = () => {
  const { pagination } = useContext(DocContext);

  console.log(pagination);

  return (
    <Container>
      <Title>Pagination</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 40px;
  grid-area: pagination;
  color: var(--Dark-Grey);

  z-index: 2;
`;
const Title = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 40px;

  font-weight: 200;
  font-size: 15px;
`;
