import React, { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

interface TasksiteContextProps {
  element: {
    showNavbar: boolean;
    setShowNavbar: (c: boolean) => void;
  };
}

interface TasksiteContextProviderProps
  extends PropsWithChildren,
    TasksiteContextProps {}
const TasksiteContext = React.createContext<TasksiteContextProviderProps>(
  {} as TasksiteContextProviderProps
);
export const useTasksiteContext = () => {
  return useContext(TasksiteContext);
};

export const TasksiteContextProvider: React.FC<
  TasksiteContextProviderProps
> = ({ element, children }) => {
  const [showNavbar, setShowNavbar] = React.useState<boolean>(false);
  const value = {
    element: {
      showNavbar,
      setShowNavbar,
    },
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
