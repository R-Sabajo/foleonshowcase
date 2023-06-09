import styled from 'styled-components';
import folder from '../img/folder.svg';
import folderBlue from '../img/folderBlue.svg';
import { useContext, useState } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';

export const ProjectList: any = () => {
  const { projects, currentProject, setCurrentProject } =
    useContext(ProjectContext);

  const handleClick = (id: number) => {
    setCurrentProject(id === currentProject ? id : id);
  };

  return (
    <Container>
      <List>
        {projects?.map((project: any) => (
          <Li
            key={project.id}
            isSelected={project.id === currentProject}
            onClick={() => handleClick(project.id)}
          >
            <Title>
              <Icon
                src={project.id === currentProject ? folderBlue : folder}
                alt="folder icon"
              />
              {project.name}
            </Title>
            <Count>{project.count}</Count>
          </Li>
        ))}
      </List>
    </Container>
  );
};

const Li = styled.div<{ isSelected: boolean }>`
  background: ${props => (props.isSelected ? 'var(--Light-Grey)' : 'inherit')};
  color: ${props => (props.isSelected ? 'var(--Dark-Blue)' : 'inherit')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 60px;
  padding: 0 25px;
  border-bottom: 1px solid var(--Light-Blue);
  cursor: pointer;
  user-select: none;

  :last-child {
    border-bottom: none;
  }

  :hover {
    background: ${props =>
      props.isSelected ? 'var(--Light-Grey)' : 'var(--Light-Blue)'};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 16px;
  margin-right: 15px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 400;
`;

const Count = styled.h3`
  justify-self: flex-end;
  font-size: 16px;
  font-weight: 400;
`;

const List = styled.div`
  width: 250px;
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
  width: 250px;
  height: 85%;
  padding: 0 0px 50px;
`;
