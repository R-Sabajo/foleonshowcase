import styled from 'styled-components';
import { InputLabel, SearchField } from './Form.style';
import searchIcon from '../img/searchIcon.svg';

export const ProjectsNav = () => {
  return (
    <Container>
      <Title>Projects</Title>
      <InputLabel>
        <SearchField
          color="var(--Light-Grey)"
          theme="var(--Dark-Blue)"
          placeholder="Search projects"
        />
        <Icon src={searchIcon} alt="search icon" />
      </InputLabel>
    </Container>
  );
};
const Icon = styled.img`
  position: absolute;
  transform: translate(-40px, 15px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 140px;
  grid-area: projects;
  padding: 25px;
  border-bottom: 1px solid var(--Grey-Blue);
  z-index: 3;
`;

const Title = styled.h2`
  padding: 0 15px;
  font-size: 20px;
  font-weight: 500;
`;
