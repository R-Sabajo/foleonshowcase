import styled from 'styled-components';
import folder from '../img/folder.svg';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';

export const ProjectLi: any = () => {
  const { projects } = useContext(ProjectContext);
  console.log(projects);
  return projects.map((p: any) => (
    <Container>
      <Title>
        <Icon src={folder} alt="folder icon" />
        {p.name}
      </Title>
      <Count>3</Count>
    </Container>
  ));
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 60px;

  border-bottom: 1px solid var(--Grey-Blue);
  :last-child {
    border-bottom: none;
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
