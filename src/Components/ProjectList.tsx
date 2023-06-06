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
  width: 300px;
  min-height: 300px;
  max-height: auto;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 87%;
  padding: 0 25px 50px;
`;
