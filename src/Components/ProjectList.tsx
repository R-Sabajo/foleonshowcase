import styled from 'styled-components';
import { ProjectLi } from './ProjectLi';

export const ProjectList = () => {
  return (
    <Container>
      <List>
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
        <ProjectLi />
      </List>
    </Container>
  );
};

const List = styled.div`
  width: 250px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 0 25px;
`;
