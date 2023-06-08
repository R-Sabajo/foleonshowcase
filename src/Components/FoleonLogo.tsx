import styled from 'styled-components';
import Logo from '../img/FoleonLogo.png';
import PrideLogo from '../img/FoleonPrideLogo.png';

export const FoleonLogo = () => {
  let thisDate = new Date(Date.now());
  const month = thisDate.getMonth();
  return (
    <Container>
      <img width="30" src={month === 5 ? PrideLogo : Logo} alt="Foleon logo" />
    </Container>
  );
};

const Container = styled.div`
  width: 30px;
  height: 30px;
`;
