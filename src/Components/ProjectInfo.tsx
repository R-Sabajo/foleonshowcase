import styled from 'styled-components';
import folder from '../img/folder.svg';
import { ProjectContext } from '../Contexts/ProjectContext';
import { useContext } from 'react';
import { dateConstructer } from '../Helpers/dateConstructer';
import { useFetch } from '../Helpers/useFetch';

export const ProjectInfo: React.FC = () => {
  const { currentProject } = useContext(ProjectContext);
  const { data, error, isLoading } = useFetch(
    `https://api.foleon.com/v2/magazine/title/${currentProject}`
  );

  if (error) {
    console.log(error);
  }

  return (
    <Container>
      {!isLoading && (
        <>
          <Title>
            <Icon src={folder} alt="folder icon" />
            <h2>{data?.name}</h2>
          </Title>
          <Created>
            <p>Created</p>
            <Date>{dateConstructer(data?.created_on)}</Date>
          </Created>
        </>
      )}
    </Container>
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
  }
`;

const Icon = styled.img`
  margin-right: 15px;
`;

const Created = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 40px;
  p {
    font-size: 13px;
    color: var(--Grey-Blue);
  }
`;

const Date = styled.p`
  font-size: 17px;
  color: var(--Light-Grey);
`;
