import axios from "axios";
import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { apiURL } from "../utils/constant";
import { AuthContext } from "./authContext";

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

  const {
    authState: { account },
  } = useContext(AuthContext);

  const resetData = () => {
    setIsLoading(false);
    setPostList([]);
    setIsFilter(false);
  };

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

  const getAllPostJob = async () => {
    try {
      if (!isLoading) {
        const response = await axios.get(`${apiURL}/postJob/allPostJobs`);
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
    if (account.role === "USER") {
      const data = await axios.get(`${apiURL}/postJob/searchByUser?${url}`);
      if (data.status === 200) {
        setPostList(data.data.data);
      }
    } else if (account.role === "EMPLOYEE") {
      const data = await axios.get(`${apiURL}/postJob/searchByEmployee?${url}`);
      if (data.status === 200) {
        setPostList(data.data.data);
      }
    }
  };

  const changeStatusPost = async (id: number, status: boolean) => {
    try {
      const response = await axios.patch(`${apiURL}/postJob/${id}`, {
        status: !status,
      });
      if (response.status === 200) {
        const newPostList = postList.map((post: any) => {
          if (post.id === id) {
            post.status = !status;
          }
          return post;
        });
        setPostList(newPostList);
        return response;
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const value = {
    getAllWorks,
    createNewUserPost,
    isOpenApplyModal,
    setIsOpenApplyModal,
    getAllPostJob,
    getJobName,
    postList,
    setPostList,
    isFilter,
    setIsFilter,
    filterPostJobs,
    changeStatusPost,
    resetData,
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
