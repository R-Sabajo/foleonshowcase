import styled from 'styled-components';
import { useContext } from 'react';
import { DocContext } from '../Contexts/DocContext';

export const DocList: React.FC = () => {
  const handleClick = () => {};

  return <Container>DOCLIST</Container>;
};

const Li = styled.div<{ isSelected: boolean }>`
  background: ${props => (props.isSelected ? 'var(--Light-Grey)' : 'inherit')};
  color: ${props => (props.isSelected ? 'var(--Dark-Blue)' : 'inherit')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 60px;
  padding: 0 25px;
  border-bottom: 1px solid var(--Light-Blue);
  cursor: pointer;
  user-select: none;

  :last-child {
    border-bottom: none;
  }

  :hover {
    background: ${props =>
      props.isSelected ? 'var(--Light-Grey)' : 'var(--Light-Blue)'};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 16px;
  margin-right: 15px;
`;

const Title = styled.h3`
  display: flex;
  width: 170px;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 85%;
  padding: 0 0px 50px;
`;
