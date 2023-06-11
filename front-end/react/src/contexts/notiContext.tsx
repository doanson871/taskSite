import { PropsWithChildren, createContext, useState } from "react";
import { apiURL, socket } from "../utils/constant";
import { UseFetchData } from "../hooks/useFetchData";

export const NotiContext = createContext<any>(null);

// export interface INotification {}

const NotiContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificaitionList] = useState<Array<any>>([]);

  const getAllNotifications = async () => {
    if (!isLoading) {
      const data = await UseFetchData(`${apiURL}/notification`);
      if (data.statusCode === 200) {
        setIsLoading(true);
        setNotificaitionList(data.data);
      }
    }
  };

  const createNotification = async (payload: any) => {
    socket.connect();
    socket.emit("newNotification", payload);

    const res = await UseFetchData(`${apiURL}/notification`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  };

  const revcNotification = (payload: any) => {
    setNotificaitionList([...notificationList, payload]);
  };

  const updateNotification = async (id: number) => {
    const res = await UseFetchData(`${apiURL}/notification/${id}`, {
      method: "PATCH",
      body: JSON.stringify({}),
    });

    return res;
  };

  const value = {
    isShowNoti,
    setIsShowNoti,
    notificationList,
    getAllNotifications,
    setNotificaitionList,
    revcNotification,
    createNotification,
    isLoading,
    setIsLoading,
    updateNotification,
  };
  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
};

export default NotiContextProvider;
