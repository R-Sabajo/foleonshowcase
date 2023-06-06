import styled from 'styled-components';
import { FoleonLogo } from './FoleonLogo';
import { AccountName } from './AccountName';

export const Header = () => {
  return (
    <Container>
      <FoleonLogo />
      <AccountName />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  height: 60px;
  background-color: var(--Dark-Blue);
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  grid-area: header;
`;
