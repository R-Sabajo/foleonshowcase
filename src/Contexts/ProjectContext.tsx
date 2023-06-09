import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { AppContext } from './AppContext';

interface Project {
  id: number;
  name: string;
  count?: number;
  editions?: string;
}

interface ProjectContextProps {
  projects: Project[];
  currentProject: number;
  url: string;
  isLoading: boolean;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectContext = createContext<ProjectContextProps>({
  projects: [],
  currentProject: 0,
  url: '',
  isLoading: true,
  setProjects: () => {},
  setCurrentProject: () => {},
  setUrl: () => {},
  setIsLoading: () => {},
});

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProject, setCurrentProject] = useState<number>(0);
  const [url, setUrl] = useState<string>(
    'https://api.foleon.com/magazine/title?page=1&limit=50'
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

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              setToken('');
            }
            throw new Error('Request failed. status: ' + response.status);
          }

          const jsonData = await response.json();
          const projectData = jsonData?._embedded.title.map((p: any) => ({
            id: p.id,
            name: p.name,
            count: p._computed.editions_count,
            editions: p._links.self.href,
          }));
          if (currentProject === 0) {
            setCurrentProject(jsonData?._embedded.title[0].id);
          }

          setProjects(projectData);
        } catch (error: any) {
          console.log(error.message);
          setProjects([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProjects();
    }
  }, [token, setToken, url, currentProject]);

  return (
    <ProjectContext.Provider
      value={{
        url,
        setUrl,
        isLoading,
        setIsLoading,
        projects,
        currentProject,
        setProjects,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
