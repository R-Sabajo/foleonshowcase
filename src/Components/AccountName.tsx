import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../Contexts/AppContext';

export const AccountName = () => {
  const { token, setToken } = useContext(AppContext);
  const [accountName, setAccountName] = useState('');
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    const reqAccount = async (token: string) => {
      let url = 'https://api.foleon.com/v2/account';
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setToken('');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data) {
          return;
        } else {
          setAccountName(data._embedded.account[0].name);
          setAccountId(data._embedded.account[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    reqAccount(token);
  }, [setToken, token]);

  return (
    <Container>
      {token && (
        <Name>
          {accountName} | #{accountId}
        </Name>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 30px;
  width: 600px;
  height: 30px;
  overflow: hidden;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;
