import React, { PropsWithChildren } from "react";
import { useContext } from "react";

interface TasksiteContextProps {
  element: {};
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
  const value = {
    element: {},
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
