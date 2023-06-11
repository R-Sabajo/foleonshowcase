import styled from 'styled-components';
import { InputLabel } from './Form.style';
import searchIcon from '../img/searchIcon.svg';
import { useContext } from 'react';
import { DocContext } from '../Contexts/DocContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import debounce from '../Helpers/debounce';
import { filterQuery } from '../Helpers/filterQuery';

export const DocsNav = () => {
  const { setDocsUrl } = useContext(DocContext);
  const { currentProject } = useContext(ProjectContext);

  // Make a function that sets the seachUrl from the searchfield value
  const handleSearch = (value: string) => {
    const searchUrl: string = `https://api.foleon.com/magazine/edition?${filterQuery(
      1,
      100,
      'name',
      'like',
      value
    )}`;

    setDocsUrl(
      !value
        ? 'https://api.foleon.com/magazine/edition?page=1&limit=8'
        : searchUrl
    );
  };
  // Wrap it with a debouncer
  const debouncedSearch = debounce(handleSearch, 333);

  // Call the function in the onChangeHandler of the search field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  //   Example
  // Let's suppose we filter a publication by published date in descending order (newest first). We can define the order-by defintion as follows:{
  //   "order-by": [
  //     {
  //       "field": "created_on",
  //       "type": "field",
  //       "direction": "desc"
  //     }
  //   ]
  // }

  return (
    <Container>
      <NavDiv>
        <Title>
          <span>Foleon Docs</span>
        </Title>
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

const SearchField = styled.input`
  position: relative;
  width: 230px;
  height: 40px;
  background-color: ${props => props.theme};
  color: ${props => props.color};
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0px 40px 0px 15px;
  margin-top: 5px;
  transition: box-shadow 250ms ease-out;

  ::placeholder {
    color: var(--Grey-Blue);
  }
  :disabled {
    background-color: var(--Dark-Grey);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.25);
  }
`;

const Icon = styled.img`
  position: absolute;
  transform: translate(195px, 14px);
  z-index: 10;
`;
