import styled from 'styled-components';
import folder from '../img/folder.svg';

export const ProjectLi = () => {
  return (
    <Container>
      <Title>
        <Icon src={folder} alt="folder icon" />
        Project 1
      </Title>
      <Count>3</Count>
    </Container>
  );
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
