import styled from 'styled-components';

export const VBar = () => {
  return (
    <Container>
      <Version>v1.0</Version>
    </Container>
  );
};

export const Container = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: end;
  background-color: var(--Dark-Blue);
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  grid-area: vbar;
`;

const Version = styled.p`
  font-size: 22;
  font-weight: 600;
`;
