import styled from 'styled-components';
import folder from '../img/folder.svg';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useContext } from 'react';
import { dateConstructer } from '../Helpers/dateConstructer';

export const ProjectInfo: React.FC = () => {
  const { currentProject, projects } = useContext(ProjectContext);

  return (
    <>
      {currentProject !== 0 &&
        projects?.map(
          (project: any) =>
            project.id === currentProject && (
              <Container key={project.id}>
                <Title>
                  <Icon src={folder} alt="folder icon" />
                  <h2>{project.name}</h2>
                </Title>
                <DatesDiv>
                  <SubDiv>
                    <DateTitle>Created on</DateTitle>
                    <Date>{dateConstructer(project.created_on)}</Date>
                  </SubDiv>
                  <SubDiv>
                    <DateTitle>Affected on</DateTitle>
                    <Date>{dateConstructer(project.affected_on)}</Date>
                  </SubDiv>
                </DatesDiv>
              </Container>
            )
        )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 20px;
  grid-area: projectinfo;
  color: var(--Light-Grey);
  box-shadow: 0px 13px 18px rgba(0, 0, 0, 0.25);
  background: linear-gradient(
    180deg,
    var(--Dark-Blue) 0%,
    var(--Light-Blue) 100%
  );
  z-index: 2;
`;

const Title = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  height: 40px;

  h2 {
    font-weight: 400;
    font-size: 24px;
  }
`;

const Icon = styled.img`
  margin-right: 15px;
`;

const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 40px;
`;

const DateTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--Grey-Blue);
`;
const DatesDiv = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`;

const Date = styled.p`
  font-size: 14px;
  color: var(--Light-Grey);
`;
