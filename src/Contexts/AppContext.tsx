import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  FC,
} from 'react';

export type Token = string;

export interface AppContextInterface {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
}

const defaultState = {
  token: '',
  setToken: (token: Token) => {},
} as AppContextInterface;

export const AppContext = createContext<AppContextInterface>(defaultState);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [token, setToken] = useState<Token>('');

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};
