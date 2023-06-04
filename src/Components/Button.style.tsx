import styled from 'styled-components';

export const Button = styled.button`
  width: 120px;
  height: 48px;
  background-color: rgb(0, 177, 255);
  border-radius: 4px;
  border: 1px solid transparent;
  color: white;
  font-family: 'Proxima Nova';
  font-weight: bold;
  font-size: 15px;
  transition: background-color 1500ms ease;

  :hover {
    background-color: rgb(0, 159, 230);
  }
`;
