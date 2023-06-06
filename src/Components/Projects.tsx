import styled from 'styled-components';

export const Projects = () => {
  return <Container>Projects</Container>;
};

export const Container = styled.div`
  width: 300px;
  height: 100%;
  grid-area: projects;
  background: linear-gradient(
    90deg,
    var(--Dark-Blue) 66.6%,
    var(--Light-Blue) 100%
  );
  z-index: 3;
`;
