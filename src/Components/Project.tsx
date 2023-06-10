import styled from 'styled-components';
import { ProjectInfo } from './ProjectInfo';
import { DocList } from './DocList';

export const Docs = () => {
  return (
    <Container>
      <ProjectInfo />
      <h1>DocsNav</h1>
      <DocList />
      <h1>Pagination</h1>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 111px 1fr 60px;
  grid-template-areas:
    'projectinfo'
    'docsnav'
    'doclist'
    'pagination';

  width: 100%;
  height: 100%;
  overflow: hidden;
  grid-area: docs;
  background: var(--Light-Grey);
  color: var(--Dark-Blue);
  z-index: 2;
`;
