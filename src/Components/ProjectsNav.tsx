import styled from 'styled-components';
import { InputLabel } from './Form.style';
import searchIcon from '../img/searchIcon.svg';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import debounce from '../Helpers/debounce';
import { filterQuery } from '../Helpers/filterQuery';

export const ProjectsNav = () => {
  const { setSearchUrl } = useContext(ProjectContext);

  // Make a function that sets the seachUrl from the searchfield value
  const handleSearch = (value: string) => {
    const searchUrl: string = `https://api.foleon.com/magazine/title?${filterQuery(
      1,
      100,
      'name',
      'like',
      value
    )}`;

    setSearchUrl(!value ? 'https://api.foleon.com/magazine/title' : searchUrl);
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
        <Icon src={searchIcon} alt="search icon" />
        <SearchField
          onChange={handleChange}
          color="var(--Light-Grey)"
          theme="var(--Dark-Blue)"
          placeholder="search projects"
        />
      </InputLabel>
    </Container>
  );
};
const Icon = styled.img`
  position: absolute;
  transform: translate(165px, 14px);
  z-index: 10;
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

const SearchField = styled.input`
  position: relative;
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme};
  color: ${props => props.color};
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 40px 0px 15px;
  margin-top: 5px;
  transition: box-shadow 350ms ease-out;

  ::placeholder {
    color: var(--Grey-Blue);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 13px 1px rgba(255, 255, 255, 0.5);
  }
`;
