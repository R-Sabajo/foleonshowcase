import styled from 'styled-components';
import { ProjectLi } from './ProjectLi';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';

export const ProjectList: React.FC = () => {
  const { projects } = useContext(ProjectContext);
  return projects ? (
    <Container>
      <List>
        <ProjectLi />
      </List>
    </Container>
  ) : (
    <h1>Loading...</h1>
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
  height: 85%;
  padding: 0 25px 50px;
`;
