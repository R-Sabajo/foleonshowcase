import styled from 'styled-components';
import { ProjectsNav } from './ProjectsNav';
import { ProjectList } from './ProjectList';
import { AppContext } from '../Contexts/AppContext';
import { useContext, useEffect, useState } from 'react';

export const Projects = () => {
  const { token, setToken } = useContext(AppContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    reqProjects(token);
  }, [token]);

  // REQUEST PROJECTS FROM ACCOUNT
  const reqProjects = async (token: string) => {
    let url = 'https://api.foleon.com/v2/magazine/title?page=1&limit=100';
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        return;
      } else {
        setProjects(data._embedded.title.map((item: any) => item.name));
        console.log(projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ProjectsNav />
      <ProjectList />
    </Container>
  );
};

export const Container = styled.div`
  width: 300px;
  height: 100%;
  overflow: hidden;
  grid-area: projects;
  background: linear-gradient(
    90deg,
    var(--Dark-Blue) 44.4%,
    var(--Light-Blue) 100%
  );
  z-index: 3;
`;
