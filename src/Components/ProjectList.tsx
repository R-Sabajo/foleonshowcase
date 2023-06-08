import styled from 'styled-components';
import folder from '../img/folder.svg';
import folderBlue from '../img/folderBlue.svg';
import { useContext, useState } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';

export const ProjectList: any = () => {
  const { projects, currentProject, setCurrentProject } =
    useContext(ProjectContext);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedProject(id === selectedProject ? id : id);
  };

  return (
    <Container>
      <List>
        {projects?.map((p: any) => (
          <Li
            key={p.id}
            isSelected={p.id === selectedProject}
            onClick={() => handleClick(p.id)}
          >
            <Title>
              <Icon
                src={p.id === selectedProject ? folderBlue : folder}
                alt="folder icon"
              />
              {p.name}
            </Title>
            <Count>{p.count}</Count>
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
  width: 300px;
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
  padding: 0 0px 50px;
`;
