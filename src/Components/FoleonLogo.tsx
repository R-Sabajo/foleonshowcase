import styled from 'styled-components';
import Logo from '../img/FoleonLogo.png';
import PrideLogo from '../img/FoleonPrideLogo.png';

export const FoleonLogo = () => {
  let thisDate = new Date(Date.now());
  const month = thisDate.getMonth();
  return (
    <Container>
      <a
        href="https://www.foleon.com"
        rel="noreferrer noopener"
        target="_blank"
      >
        <img
          width="30"
          src={month === 5 ? PrideLogo : Logo}
          alt="Foleon logo"
        />
      </a>
    </Container>
  );
};

const Container = styled.div`
  width: 30px;
  height: 30px;
`;
