import styled from 'styled-components';
import { ProjectInfo } from './ProjectInfo';
import { DocList } from './DocList';
import { DocsNav } from './DocsNav';

export const Docs = () => {
  return (
    <Container>
      <ProjectInfo />
      <DocsNav />
      <DocList />
      <h1>Pagination</h1>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 80px 1fr 50px;
  grid-template-areas:
    'projectinfo'
    'docsnav'
    'doclist'
    'pagination';

  overflow-y: auto;
  width: 100%;
  height: 100%;
  grid-area: docs;
  background: var(--Light-Grey);
  color: var(--Dark-Blue);
  z-index: 2;
`;
