import styled from 'styled-components';
import { useContext } from 'react';
import { DocContext } from '../Contexts/DocContext';
import { ProjectContext } from '../Contexts/ProjectContext';

export const DocList: React.FC = () => {
  const { docs } = useContext(DocContext);
  const { currentProject, isLoading } = useContext(ProjectContext);

  return (
    <Container>
      <DocGrid>
        {isLoading ? (
          <DocDiv isSelected={false}> Loading Docs...</DocDiv>
        ) : (
          docs?.map((doc: any) => (
            <DocDiv isSelected={false}>
              <DocCard>
                <Screenshot source={doc.screenshot} />
                <Preview
                  target="_blank"
                  rel="noopener noreferrer"
                  href={doc.preview}
                ></Preview>
              </DocCard>
              <Title>{doc.name}</Title>
            </DocDiv>
          ))
        )}
      </DocGrid>
    </Container>
  );
};

const DocGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px 50px;
  width: 100%;
  min-height: 300px;
  max-height: auto;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;
  padding: 20px 50px 0;
  display: flex;
  flex-direction: column;
  height: 99%;
`;

const DocCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 180px;
  padding: 5px 7px;
  border-radius: 5px;
  background-color: #fff;
`;

const DocDiv = styled.div<{ isSelected: boolean }>`
  background-color: 'var(--Light-Grey)';
  color: ${props =>
    props.isSelected ? 'var(--Dark-Blue)' : 'var(--Grey-Blue)'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 210px;
  height: 230px;

  cursor: pointer;
  user-select: none;

  :hover {
  }
`;

const Screenshot = styled.div<{ source: string }>`
  background: center / cover no-repeat url('${props => props.source}');
  width: 100%;
  height: 120px;
`;

const Preview = styled.a`
  background-color: var(--Light-Grey);
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
`;
