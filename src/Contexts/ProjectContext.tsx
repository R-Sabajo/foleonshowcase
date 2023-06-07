import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  FC,
} from 'react';

export interface Project {
  id: number;
  name: string;
  count?: number;
  editions?: string;
}

export interface ProjectContextInterface {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
}

const defaultState = {
  projects: [],
  setProjects: (projects: Project[]) => null,
} as ProjectContextInterface;

export const ProjectContext =
  createContext<ProjectContextInterface>(defaultState);

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider: FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
