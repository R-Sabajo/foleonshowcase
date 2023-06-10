import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { AppContext } from './AppContext';
import { ProjectContext } from './ProjectContext';

type Doc = {
  id: number;
  name: string;
  category?: string;
  screenshot?: string;
  pages_count?: number;
  created_on?: string;
  affected_on?: string;
  status?: string;
  preview?: string;
};

interface DocContextProps {
  docs: Doc[];
  searchDocs: Doc[];
  currentDoc: number;
  url: string;
  searchUrl: string;
  isLoading: boolean;
  setDocs: React.Dispatch<React.SetStateAction<Doc[]>>;
  setSearchDocs: React.Dispatch<React.SetStateAction<Doc[]>>;
  setCurrentDoc: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DocContext = createContext<DocContextProps>({
  docs: [],
  searchDocs: [],
  currentDoc: 0,
  url: '',
  searchUrl: '',
  isLoading: true,
  setDocs: () => {},
  setSearchDocs: () => {},
  setCurrentDoc: () => {},
  setUrl: () => {},
  setSearchUrl: () => {},
  setIsLoading: () => {},
});

type DocProviderProps = {
  children: ReactNode;
};

export const ProjectProvider: React.FC<DocProviderProps> = ({ children }) => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchDocs, setSearchDocs] = useState<Doc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDoc, setCurrentDoc] = useState<number>(0);
  const { currentProject } = useContext(ProjectContext);
  const [url, setUrl] = useState<string>(
    `https://api.foleon.com/magazine/edition?filter%5B0%5D%5Bfield%5D=title&filter%5B0%5D%5Btype%5D=eq&filter%5B0%5D%5Bvalue%5D=${currentProject}`
  );
  const [searchUrl, setSearchUrl] = useState<string>('');
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      const fetchDocs = async () => {
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
          const response2 = await fetch(searchUrl, options);

          if (!response.ok && !response2.ok) {
            if (
              response.status === 401 ||
              response.status === 403 ||
              response2.status === 401 ||
              response2.status === 403
            ) {
              setToken('');
            }
            throw new Error('Request failed. status: ' + response.status);
          }

          const jsonData = await response.json();
          const jsonData2 = await response2.json();
          const docData = jsonData?._embedded.edition.map((doc: any) => ({
            id: doc.id,
            name: doc.name,
            category: doc.category,
            pages_count: doc._computed.pages_count,
            status: doc.status,
            created_on: doc.created_on,
            affected_on: doc.affected_on,
            screenshot: doc._embedded.screenshot._links.original.href,
            preview: doc._links.preview.href,
          }));

          const searchDocData = jsonData2?._embedded.edition.map(
            (doc: any) => ({
              id: doc.id,
              name: doc.name,
              category: doc.category,
              status: doc.status,
              created_on: doc.created_on,
              affected_on: doc.affected_on,
              screenshot: doc._embedded.screenshot._links.original.href,
              preview: doc._links.preview.href,
            })
          );

          setDocs(docData);
          setSearchDocs(searchDocData);
        } catch (error: any) {
          console.log(error.message);
          setDocs([]);
          setSearchDocs([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDocs();
    }
  }, [token, setToken, url, searchUrl, currentProject]);

  return (
    <DocContext.Provider
      value={{
        url,
        setUrl,
        searchUrl,
        setSearchUrl,
        isLoading,
        setIsLoading,
        docs,
        searchDocs,
        currentDoc,
        setDocs,
        setSearchDocs,
        setCurrentDoc,
      }}
    >
      {children}
    </DocContext.Provider>
  );
};
