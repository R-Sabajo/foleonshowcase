import styled from 'styled-components';
import { ProjectsNav } from './ProjectsNav';
import { ProjectList } from './ProjectList';
import { ProjectContext } from '../Contexts/ProjectContext';

import { useContext, useEffect, useState } from 'react';
import { useFetch } from '../Api/useFetch';

export const Projects = () => {
  const url = 'https://api.foleon.com/v2/magazine/title?page=1&limit=100';
  // REQUEST PROJECTS FROM ACCOUNT
  const { projects, setProjects } = useContext(ProjectContext);
  const { data, error, isLoading } = useFetch(url);

  useEffect(() => {
    if (!isLoading) {
      const projectData = data?._embedded.title.map((p: any) => ({
        id: p.id,
        name: p.name,
        editions: p._embedded.editions._links.self.href,
      }));
      setProjects(projectData);
    }
  }, []);
  console.log(projects);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
