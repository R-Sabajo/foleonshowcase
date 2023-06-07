import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Contexts/AppContext';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
          throw new Error('Request failed');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, token, setToken]);

  return { data, error, isLoading };
};
