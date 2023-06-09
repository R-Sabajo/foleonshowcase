import styled from 'styled-components';

export const Docs = () => {
  return (
    <Container>
      <h1>Docs</h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  grid-area: docs;
  background: var(--Light-Grey);
  color: var(--Dark-blue);
  z-index: 2;
`;
