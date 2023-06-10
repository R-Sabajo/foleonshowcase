import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { AppContext } from './AppContext';

type Project = {
  id: number;
  name: string;
  count?: number;
  created_on?: string;
  affected_on?: string;
  editions?: string;
};

interface ProjectContextProps {
  projects: Project[];
  searchProjects: Project[];
  currentProject: number;
  url: string;
  searchUrl: string;
  isLoading: boolean;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setSearchProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
  searchProjects: [],
  currentProject: 0,
  url: '',
  searchUrl: '',
  isLoading: true,
  setProjects: () => {},
  setSearchProjects: () => {},
  setCurrentProject: () => {},
  setUrl: () => {},
  setSearchUrl: () => {},
  setIsLoading: () => {},
});

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchProjects, setSearchProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProject, setCurrentProject] = useState<number>(0);
  const [url, setUrl] = useState<string>(
    'https://api.foleon.com/v2/magazine/title'
  );
  const [searchUrl, setSearchUrl] = useState<string>(
    'https://api.foleon.com/magazine/title'
  );
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      const fetchProjects = async () => {
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
          const projectData = jsonData?._embedded.title.map((p: any) => ({
            id: p.id,
            name: p.name,
            created_on: p.created_on,
            affected_on: p.affected_on,
            editions: p._links.self.href,
          }));

          const searchProjectData = jsonData2?._embedded.title.map(
            (p: any) => ({
              id: p.id,
              name: p.name,
              count: p._computed.editions_count,
            })
          );
          if (currentProject === 0) {
            setCurrentProject(jsonData?._embedded.title[0].id);
          }
          setProjects(projectData);
          setSearchProjects(searchProjectData);
        } catch (error: any) {
          console.log(error.message);
          setProjects([]);
          setSearchProjects([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProjects();
    }
  }, [token, setToken, url, searchUrl, currentProject]);

  return (
    <ProjectContext.Provider
      value={{
        url,
        setUrl,
        searchUrl,
        setSearchUrl,
        isLoading,
        setIsLoading,
        projects,
        searchProjects,
        currentProject,
        setProjects,
        setSearchProjects,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
