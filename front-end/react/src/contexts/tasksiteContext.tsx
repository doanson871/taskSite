import axios from "axios";
import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { apiURL } from "../utils/constant";

const TasksiteContext = React.createContext<any>(null);
export const useTasksiteContext = () => {
  return useContext(TasksiteContext);
};

export const TasksiteContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState<any>([]);
  const [isFilter, setIsFilter] = useState(false);

  const getAllWorks = async () => {
    try {
      const response = await axios.get(`${apiURL}/work/works`);
      return response?.data;
    } catch (error: any) {
      if (error.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const createNewUserPost = async (postForm: any) => {
    try {
      const response = await axios.post(`${apiURL}/postjob`, postForm);

      if (response.status === 201) {
        setPostList([...postList, response.data.data]);
        return { status: 200 };
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const updateProfile = async (accountForm: any) => {
    try {
      const response = await axios.patch(`${apiURL}/users/update`, accountForm);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllPostJob = async () => {
    try {
      if (!isLoading) {
        const response = await axios.get(`${apiURL}/postJob/allPostJobs`);
        console.log(response);

        if (response.status === 200) {
          setIsLoading(true);
          setPostList(response.data.data.postJobs);
        }
        // return response;
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getJobName = async (id: string) => {
    try {
      const response = await axios.get(`${apiURL}/work/${id}/details`);
      return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const filterPostJobs = async (url: string) => {
    const data = await axios.get(`${apiURL}/postJob/search?${url}`);
    console.log(data);
    if (data.status === 200) {
      setPostList(data.data.data);
    }
  };

  const value = {
    getAllWorks,
    createNewUserPost,
    updateProfile,
    isOpenApplyModal,
    setIsOpenApplyModal,
    getAllPostJob,
    getJobName,
    postList,
    setPostList,
    isFilter,
    setIsFilter,
    filterPostJobs,
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
