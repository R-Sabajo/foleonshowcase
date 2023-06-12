import styled from 'styled-components';
import folder from '../img/folder.svg';
import folderBlue from '../img/folderBlue.svg';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import { DocContext } from '../Contexts/DocContext';

export const ProjectList: React.FC = () => {
  const { searchProjects, currentProject, setCurrentProject, isLoading } =
    useContext(ProjectContext);
  const { setDocsUrl } = useContext(DocContext);

  const handleClick = (id: number) => {
    setCurrentProject(currentProject === id ? 0 : id);
    // set doclist url to the selected project
    setDocsUrl(
      currentProject === id
        ? 'https://api.foleon.com/magazine/edition?page=1&limit=8'
        : 'https://api.foleon.com/magazine/edition?filter%5B0%5D%5Bfield%5D=title&filter%5B0%5D%5Btype%5D=eq&filter%5B0%5D%5Bvalue%5D=' +
            id
    );
  };

  return (
    <Container>
      <List>
        {isLoading ? (
          <Li isSelected={false}> Loading Projects...</Li>
        ) : searchProjects.length !== 0 ? (
          searchProjects?.map((project: any) => (
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
          ))
        ) : (
          <Li isSelected={false}> No projects found</Li>
        )}
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
  display: flex;
  width: 170px;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const Count = styled.h3`
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
