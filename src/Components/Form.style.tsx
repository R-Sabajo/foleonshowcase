import styled from 'styled-components';

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #b0b7c3;
  padding: 0px 8px;
  margin: 5px 0;
`;

export const InputLabel = styled.label`
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: black;
`;

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

  :hover {
    background-color: rgb(0, 159, 230);
  }
`;
