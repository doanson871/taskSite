import axios from "axios";
import React, { PropsWithChildren } from "react";
import { useContext } from "react";
import { apiURL } from "../utils/constant";

const TasksiteContext = React.createContext<any>(null);
export const useTasksiteContext = () => {
  return useContext(TasksiteContext);
};

export const TasksiteContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const getAllWorks = async () => {
    try {
      const response = await axios.get(`${apiURL}/work/works`);
      return response?.data;
    } catch (error: any) {
      if (error.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const createNewuserPost = async (postForm: any) => {
    try {
      const response = await axios.post(`${apiURL}/postjob`, postForm);
      return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const value = {
    getAllWorks
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
