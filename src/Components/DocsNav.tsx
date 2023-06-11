import styled from 'styled-components';
import searchIcon from '../img/searchIcon.svg';
import { useContext, useState } from 'react';
import { DocContext } from '../Contexts/DocContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import debounce from '../Helpers/debounce';
import { filterQuery } from '../Helpers/filterQuery';

export const DocsNav = () => {
  const { setDocsUrl } = useContext(DocContext);
  const { currentProject } = useContext(ProjectContext);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  // Make a function that sets the seachUrl from the searchfield value
  const handleSearch = (value: string) => {
    let direction = sort === 'name' ? 'asc' : 'desc';
    let term = value === '' ? '%%' : value;
    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      1,
      8,
      'name',
      'like',
      term,
      sort,
      'field',
      direction
    )}`;

    setDocsUrl(searchUrl);
  };
  // Wrap it with a debouncer
  const debouncedSearch = debounce(handleSearch, 333);

  // Call the function in the onChangeHandler of the search field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleFilter = (event: any) => {
    setFilter(event.target.value);
    let status = event.target.value === '' ? '%%' : event.target.value;
    let direction = sort === 'name' ? 'asc' : 'desc';
    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      1,
      8,
      'status',
      'like',
      status,
      sort,
      'field',
      direction
    )}`;

    setDocsUrl(searchUrl);
  };

  const handleSort = (event: any) => {
    setSort(event.target.value);
    let filterTerm =
      currentProject !== 0
        ? { field: 'title', type: 'eq', value: currentProject }
        : { field: 'status', type: 'like', value: filter };
    let direction = event.target.value === 'name' ? 'asc' : 'desc';
    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      1,
      8,
      filterTerm.field,
      filterTerm.type,
      filterTerm.value,
      event.target.value,
      'field',
      direction
    )}`;

    setDocsUrl(searchUrl);
  };

  return (
    <Container>
      <NavDiv>
        <Title>Foleon Docs</Title>
        <Sort
          onChange={event => handleSort(event)}
          name="sort"
          id="sort-select"
          value={sort}
        >
          <option value="affected_on">Last Edited</option>
          <option value="name">A-Z</option>
        </Sort>
        <Filter
          value={filter}
          onChange={event => handleFilter(event)}
          name="filter"
          id="filter-select"
        >
          <option value="">Show All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="offline">Offline</option>
        </Filter>

        <InputLabel>
          <Icon src={searchIcon} alt="search icon" />
          <SearchField
            disabled={currentProject !== 0}
            onChange={handleChange}
            color="var(--Dark-Blue)"
            theme="#fff"
            placeholder={
              currentProject !== 0
                ? 'Deselect project to enable'
                : 'Search all docs'
            }
          />
        </InputLabel>
      </NavDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  grid-area: docsnav;
  padding: 0px 40px;
  z-index: 3;
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: var(--Dark-Blue);
  border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;

  span {
    font-size: 18px;
    margin-left: 5px;
  }
`;

const Filter = styled.select`
  width: 100px;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 0px 0px 5px;
  transition: all 250ms ease-out;
`;
const Sort = styled.select`
  width: 100px;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 0px 0px 5px;
  transition: all 250ms ease-out;
`;

const SearchField = styled.input`
  position: relative;
  width: 200px;
  height: 40px;
  background-color: ${props => props.theme};
  color: ${props => props.color};
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 27px 0px 15px;
  margin-top: 5px;
  transition: all 250ms ease-out;

  ::placeholder {
    color: var(--Grey-Blue);
  }
  :disabled {
    background-color: var(--Dark-Grey);
    opacity: 0;
  }
  :hover {
    opacity: 1;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.25);
  }
`;

const InputLabel = styled.label`
  height: 50px;
  position: relative;
  font-size: 15px;
  font-weight: 600;
  color: var(--Dark-Blue);

  :hover input {
    opacity: 1;
  }
`;

const Icon = styled.img`
  position: absolute;
  transform: translate(170px, 14px);
  z-index: 10;
  opacity: 1;
`;
