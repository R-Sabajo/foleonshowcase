import styled from 'styled-components';
import { useContext } from 'react';
import { DocContext } from '../Contexts/DocContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import previewIcon from '../img/previewIcon.svg';
import { dateConstructer } from '../Helpers/dateConstructer';

export const DocList: React.FC = () => {
  const { docs, currentDoc, setCurrentDoc } = useContext(DocContext);
  const { isLoading } = useContext(ProjectContext);

  const handleClick = (id: number) => {
    setCurrentDoc(currentDoc === id ? id : id);
  };

  const handleClose = (id: number) => {
    setCurrentDoc(0);
  };

  return (
    <Container>
      <DocGrid>
        {isLoading ? (
          <DocDiv isSelected={false}> Loading Docs...</DocDiv>
        ) : (
          docs?.map((doc: any) => (
            <DocDiv
              onClick={() => handleClick(doc.id)}
              key={doc.id}
              isSelected={doc.id === currentDoc}
            >
              <DocCard>
                <Screenshot source={doc.screenshot} />
                <Preview
                  target="_blank"
                  rel="noopener noreferrer"
                  href={doc.preview}
                >
                  <img src={previewIcon} alt="preview" />
                </Preview>
              </DocCard>
              <Title>{doc.name}</Title>
            </DocDiv>
          ))
        )}
      </DocGrid>
      {currentDoc !== 0 &&
        docs?.map(
          (doc: any) =>
            doc.id === currentDoc && (
              <DocInfo infoOpen={doc.id === currentDoc} key={doc.id}>
                <Closebutton onClick={() => handleClose(doc.id)}>X</Closebutton>
                <DocDetails>
                  <h3>{doc.name}</h3>

                  <Screenshot source={doc.screenshot} />

                  <p>Category: {doc.category}</p>
                  <p>Pages: {doc.pages_count}</p>
                  <p>Status: {doc.status}</p>
                  <p>Created: {dateConstructer(doc.created_on)}</p>
                  <p>Modified: {dateConstructer(doc.affected_on)}</p>
                </DocDetails>

                <a href={doc.preview} rel="noreferrer noopener" target="_blank">
                  <Button>
                    <img src={previewIcon} alt="preview" />
                    Preview
                  </Button>
                </a>
              </DocInfo>
            )
        )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 40px 0;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const DocInfo = styled.div<{ infoOpen: boolean }>`
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0px;
  right: 0px;
  width: 350px;
  height: 100%;
  padding: 30px;
  z-index: 7;
  transition: transform 250ms ease-in;

  transform: ${props =>
    props.infoOpen ? 'translateX(0px)' : 'translateX(350px)'};
`;

const DocDetails = styled.div`
  height: 70%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Closebutton = styled.p`
  position: absolute;
  right: 40px;
  cursor: pointer;
`;

const DocGrid = styled.div`
  display: grid;

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  gap: 20px 30px;
  width: 100%;
  min-height: 400px;
  max-height: auto;
  padding: 10px 0 0;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
`;

const DocDiv = styled.div<{ isSelected: boolean }>`
  color: ${props =>
    props.isSelected ? 'var(--Dark-Blue)' : 'var(--Grey-Blue)'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  height: 230px;
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
  transition: all 150ms ease-in-out;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  user-select: none;

  :hover {
    transform: translateY(-10px);
    box-shadow: 0 40px 44px -30px rgba(0, 0, 0, 0.35);
  }
`;

const Screenshot = styled.div<{ source: string }>`
  background: center / cover no-repeat url('${props => props.source}');
  width: 100%;
  height: 120px;
`;

const Preview = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  opacity: 0.2;
  transition: opacity 200ms ease-out;

  :hover {
    opacity: 1;
  }
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  font-size: 17px;
  font-weight: 500;
`;

export const Button = styled.button`
  height: 40px;
  min-height: 40px;
  width: 130px;
  padding: 0px 16px;
  background-color: white;
  border: 1px solid var(--Grey-Blue);
  border-radius: 4px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: space-around;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;

  :hover {
    background-color: var(--Light-Grey);
  }
`;
