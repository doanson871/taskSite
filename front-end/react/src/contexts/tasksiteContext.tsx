import axios from "axios";
import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { apiURL } from "../utils/constant";
import { AuthContext } from "./authContext";
import { UseFetchData } from "../hooks/useFetchData";

const TasksiteContext = React.createContext<any>(null);
export const useTasksiteContext = () => {
  return useContext(TasksiteContext);
};

const TasksiteContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState<any>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [workList, setWorkList] = useState<any>([]);
  const [noteList, setNoteList] = useState<any>([]);
  const [availableWorks, setAvailableworks] = useState<any>([]);

  const {
    authState: { account },
  } = useContext(AuthContext);

  const resetData = () => {
    // setIsLoading(false);
    setPostList([]);
    setIsFilter(false);
    setWorkList([]);
  };

  const getUserById = async (id: number) => {
    try {
      const response = await axios.get(`${apiURL}/users/${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        return { statusCode: response.status };
      }
    } catch (error: any) {
      if (error.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
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
      console.log("context", response);
      if (response.status === 201) {
        setPostList([...postList, response.data.data]);
        return { status: 200, data: response.data.data };
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllPostJob = async () => {
    try {
      if (account.role === "USER") {
        const response = await axios.get(`${apiURL}/postJob/allPostJobs`);
        if (response.status === 200) {
          setPostList(response.data.data.postJobs);
        }
      } else if (account.role === "EMPLOYEE") {
        const response = await axios.get(
          `${apiURL}/postJob/allPostJobsByEmployee`
        );
        if (response.status === 200) {
          setPostList(response.data.data.postJobs);
        }
      }

      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getJobName = async (id: number) => {
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

  const postUserOnWork = async (workForm: any) => {
    try {
      const response = await axios.post(
        `${apiURL}/users-on-work/postUserOnWork`,
        workForm
      );
      if (response.status === 201) {
        setWorkList([...workList, response.data.data]);
        return { statusCode: 200 };
      } else {
        return { statusCode: 400 };
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllUserOnWork = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/users-on-work/allUserOnWorksById`
      );
      if (response.status === 200) {
        setWorkList(response.data.data);
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const deleteUserOnWork = async (id: number) => {
    try {
      const response = await axios.delete(`${apiURL}/users-on-work/${id}`);
      if (response.status === 200) {
        const newWorkList = workList.filter((work: any) => work.id !== id);
        setWorkList(newWorkList);
        return response;
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const updateUserOnWork = async (id: number, updateForm: any) => {
    try {
      const response = await axios.patch(
        `${apiURL}/users-on-work/${id}`,
        updateForm
      );
      if (response.status === 200) {
        const newWorkList = workList.map((work: any) => {
          if (work.id === id) {
            work = { ...updateForm };
          }
          return work;
        });
        setWorkList(newWorkList);
        return response;
      }
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const getPostById = async (id: number) => {
    const data = await axios.get(`${apiURL}/postJob/${id}`);

    if (data.status === 200) {
      return data.data;
    }
  };

  const createApply = async (payload: any) => {
    const data = await UseFetchData(`${apiURL}/application`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  };

  const createApplyDefault = async (payload: any, userId: number) => {
    const data = await UseFetchData(`${apiURL}/application/${userId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  };

  const getAllAvailJob = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/users-on-work/allUserOnWorks`
      );
      if (response.status === 200) {
        setAvailableworks(response.data.data);
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const changeStatusApply = async (applyId: number, payload: any) => {
    const data = await UseFetchData(`${apiURL}/application/${applyId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return data;
  };

  const addNote = async (noteForm: any) => {
    try {
      const response = await axios.post(`${apiURL}/notes`, noteForm);
      if (response.status === 201) {
        setNoteList([...noteList, response.data.data]);
        return { statusCode: 200 };
      } else {
        return { statusCode: 400 };
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllNote = async () => {
    try {
      const response = await axios.get(`${apiURL}/notes`);
      if (response.status === 200) {
        setNoteList(response.data);
      }
      // return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getAllApplications = async () => {
    const data = await UseFetchData(`${apiURL}/application`);
    return data;
  };

  const getInfoPostJob = async () => {
    const data = await UseFetchData(`${apiURL}/postJob/infoPostJob`);
    return data;
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
    postUserOnWork,
    getAllUserOnWork,
    workList,
    deleteUserOnWork,
    updateUserOnWork,
    getPostById,
    createApply,
    addNote,
    noteList,
    getAllNote,
    changeStatusApply,
    getAllApplications,
    getInfoPostJob,
    getAllAvailJob,
    availableWorks,
    getUserById,
    createApplyDefault,
  };
  return (
    <TasksiteContext.Provider value={value}>
      {children}
    </TasksiteContext.Provider>
  );
};

export default TasksiteContextProvider;
