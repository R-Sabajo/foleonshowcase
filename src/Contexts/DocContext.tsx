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
  currentDoc: number;
  project: number;
  docsUrl: string;
  isLoading: boolean;
  setDocs: React.Dispatch<React.SetStateAction<Doc[]>>;
  setCurrentDoc: React.Dispatch<React.SetStateAction<number>>;
  setProject: React.Dispatch<React.SetStateAction<number>>;
  setDocsUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DocContext = createContext<DocContextProps>({
  docs: [],

  currentDoc: 0,
  project: 0,
  docsUrl: '',
  isLoading: true,
  setDocs: () => {},
  setCurrentDoc: () => {},
  setProject: () => {},
  setDocsUrl: () => {},
  setIsLoading: () => {},
});

type DocProviderProps = {
  children: ReactNode;
};

export const DocProvider: React.FC<DocProviderProps> = ({ children }) => {
  const { currentProject } = useContext(ProjectContext);
  const [project, setProject] = useState<number>(0);
  const [docsUrl, setDocsUrl] = useState<string>(
    'https://api.foleon.com/magazine/edition?page=1&limit=8'
  );
  const [docs, setDocs] = useState<Doc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentDoc, setCurrentDoc] = useState<number>(0);
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
          const response = await fetch(docsUrl, options);

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              setToken('');
            }
            throw new Error('Request failed. status: ' + response.status);
          }

          const jsonData = await response.json();

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

          if (project === 0) {
            setProject(currentProject);
          }
          setDocs(docData);
        } catch (error: any) {
          console.log(error.message);
          setDocs([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDocs();
    }
  }, [token, setToken, docsUrl, currentDoc, currentProject, project]);

  return (
    <DocContext.Provider
      value={{
        docsUrl,
        setDocsUrl,
        isLoading,
        setIsLoading,
        project,
        setProject,
        docs,
        currentDoc,
        setDocs,
        setCurrentDoc,
      }}
    >
      {children}
    </DocContext.Provider>
  );
};
