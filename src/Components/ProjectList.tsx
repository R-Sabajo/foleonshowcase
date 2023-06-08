import styled from 'styled-components';
import folder from '../img/folder.svg';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import { AppContext } from '../Contexts/AppContext';

export const ProjectList: any = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { projects, setProjects } = useContext(ProjectContext);
  const { token, setToken } = useContext(AppContext);
  const url = 'https://api.foleon.com/v2/magazine/title?page=1&limit=50';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setToken('');
          }
          throw new Error('Request failed. status: ' + response.status);
        }

        const jsonData = await response.json();

        const projectData = jsonData?._embedded.title.map((p: any) => ({
          id: p.id,
          name: p.name,
          editions: p._embedded.editions._links.self.href,
        }));
        setProjects(projectData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProjects, setToken, token]);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <Container>
      <List>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          projects?.map((p: any) => (
            <Li key={p.id}>
              <Title>
                <Icon src={folder} alt="folder icon" />
                {p.name}
              </Title>
              <Count></Count>
            </Li>
          ))
        )}
      </List>
    </Container>
  );
};

const Li = styled.div`
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
  width: 300px;
  height: 85%;
  padding: 0 25px 50px;
`;
