import styled from 'styled-components';
import { ProjectsNav } from './ProjectsNav';
import { ProjectList } from './ProjectList';

export const Projects = () => {
  return (
    <Container>
      <ProjectsNav />
      <ProjectList />
    </Container>
  );
};

export const Container = styled.div`
  width: 300px;
  height: 100%;
  grid-area: projects;
  background: linear-gradient(
    90deg,
    var(--Dark-Blue) 44.4%,
    var(--Light-Blue) 100%
  );
  z-index: 3;
`;
