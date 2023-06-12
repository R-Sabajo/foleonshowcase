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
  const [search, setSearch] = useState<string>('');

  type argsType = [
    page: number,
    limit: number,
    //  Search
    field0: string,
    type0: string,
    value0: string | number,
    // Sort
    orderbyField: string,
    orderbyType: string,
    orderbyDirection: string,
    // Filter
    field1?: string,
    type1?: string,
    value1?: string | number,
    // Project
    field2?: string,
    type2?: string,
    value2?: string | number
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
    let direction = sort === 'name' ? 'asc' : 'desc';
    let term = value === '' ? '%%' : value;

    //  Remove project and filter query from fetch if no project is selected and filter is all docs
    const args: argsType =
      currentProject === 0 && filter === ''
        ? [1, 8, 'name', 'like', term, sort, 'field', direction]
        : currentProject === 0
        ? [
            1,
            8,
            'name',
            'like',
            term,
            sort,
            'field',
            direction,
            'status',
            'eq',
            filter,
          ]
        : filter === ''
        ? [
            1,
            8,
            'name',
            'like',
            term,
            sort,
            'field',
            direction,
            'title',
            'eq',
            currentProject,
          ]
        : [
            1,
            8,
            'name',
            'like',
            term,
            sort,
            'field',
            direction,
            'status',
            'eq',
            filter,
            'title',
            'eq',
            currentProject,
          ];

    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      ...args
    )}`;

    setDocsUrl(searchUrl);
  };

  const debouncedSearch = debounce(handleSearch, 333);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleFilter = (event: any) => {
    setFilter(event.target.value);
    let direction = sort === 'name' ? 'asc' : 'desc';

    const args: argsType =
      currentProject === 0 && event.target.value === ''
        ? [1, 8, 'name', 'like', search, sort, 'field', direction]
        : currentProject === 0
        ? [
            1,
            8,
            'name',
            'like',
            search,
            sort,
            'field',
            direction,
            'status',
            'eq',
            event.target.value,
          ]
        : filter === ''
        ? [
            1,
            8,
            'name',
            'like',
            search,
            sort,
            'field',
            direction,
            'title',
            'eq',
            currentProject,
          ]
        : [
            1,
            8,
            'name',
            'like',
            search,
            sort,
            'field',
            direction,
            'status',
            'eq',
            event.target.value,
            'title',
            'eq',
            currentProject,
          ];

    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      ...args
    )}`;

    setDocsUrl(searchUrl);
  };

  const handleSort = (event: any) => {
    setSort(event.target.value);
    let sortTerm = event.target.value;
    let direction = event.target.value === 'name' ? 'asc' : 'desc';

    const args: argsType =
      currentProject === 0 && filter === ''
        ? [1, 8, 'name', 'like', search, sortTerm, 'field', direction]
        : currentProject === 0
        ? [
            1,
            8,
            'name',
            'like',
            search,
            sortTerm,
            'field',
            direction,
            'status',
            'eq',
            filter,
          ]
        : filter === ''
        ? [
            1,
            8,
            'name',
            'like',
            search,
            sortTerm,
            'field',
            direction,
            'title',
            'eq',
            currentProject,
          ]
        : [
            1,
            8,
            'name',
            'like',
            search,
            sortTerm,
            'field',
            direction,
            'status',
            'eq',
            filter,
            'title',
            'eq',
            currentProject,
          ];

    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      ...args
    )}`;

    setDocsUrl(searchUrl);
  };

  return (
    <Container>
      <NavDiv>
        <Title>Foleon Docs</Title>
        <SelectLabel htmlFor="sort-select">
          Sort
          <Sort
            onChange={event => handleSort(event)}
            name="sort"
            id="sort-select"
            value={sort}
          >
            <option value="affected_on">Last Edited</option>
            <option value="name">A-Z</option>
          </Sort>
        </SelectLabel>
        <SelectLabel htmlFor="filter-select">
          Filter
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
        </SelectLabel>

        <InputLabel>
          <Icon src={searchIcon} alt="search icon" />
          <SearchField
            onChange={handleChange}
            color="var(--Dark-Blue)"
            theme="#fff"
            placeholder={'Search docs'}
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
  width: 150px;
  height: 40px;
  margin-left: 15px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 0px 0px 5px;
  transition: all 250ms ease-out;

  :disabled {
    background-color: var(--Dark-Grey);
    opacity: 0;
  }
  :hover {
    opacity: 1;
  }
`;
const Sort = styled.select`
  width: 150px;
  height: 40px;
  margin-left: 15px;
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
  padding: 0px 30px 0px 15px;
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

const SelectLabel = styled.label`
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
  font-size: 15px;
  font-weight: 400;
  color: var(--Grey-Blue);

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
