import styled from 'styled-components';
import { InputLabel, SearchField } from './Form.style';
import searchIcon from '../img/searchIcon.svg';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import debounce from '../Api/debounce';

export const ProjectsNav = () => {
  const { setUrl } = useContext(ProjectContext);

  // Make a function that sets the seachUrl from the searchfield value
  const handleSearch = (value: string) => {
    const searchUrl: string = `https://api.foleon.com/magazine/title?page=1&limit=50&filter%5B0%5D%5Bfield%5D=name&filter%5B0%5D%5Btype%5D=like&filter%5B0%5D%5Bvalue%5D=%${value}%`;

    setUrl(
      !value
        ? 'https://api.foleon.com/magazine/title?page=1&limit=50'
        : searchUrl
    );
  };
  // Wrap it with a debouncer
  const debouncedSearch = debounce(handleSearch, 333);

  // Call the function in the onChangeHandler of the search field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <Container>
      <Title>Projects</Title>
      <InputLabel>
        <SearchField
          onChange={handleChange}
          color="var(--Light-Grey)"
          theme="var(--Dark-Blue)"
          placeholder="search projects"
        />
        <Icon src={searchIcon} alt="search icon" />
      </InputLabel>
    </Container>
  );
};
const Icon = styled.img`
  position: absolute;
  transform: translate(-35px, 14px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
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
