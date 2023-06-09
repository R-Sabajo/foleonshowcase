import styled from 'styled-components';

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #b0b7c3;
  padding: 0px 8px;
  margin-top: 5px;
`;

export const InputLabel = styled.label`
  height: 50px;
  position: relative;
  font-size: 15px;
  font-weight: 600;
  color: var(--Dark-Blue);
`;

export const Button = styled.button`
  height: 40px;
  width: 96px;
  padding: 0px 16px;
  background-color: var(--Blue);
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;

  :hover {
    background-color: rgb(0, 159, 230);
  }
`;
