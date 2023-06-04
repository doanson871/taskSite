import { PropsWithChildren, createContext, useState } from "react";
import { apiURL } from "../utils/constant";
import { UseFetchData } from "../hooks/useFetchData";

export const NotiContext = createContext<any>(null);

// export interface INotification {}

const NotiContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isShowNoti, setIsShowNoti] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificaitionList] = useState([]);

  const getAllNotifications = async (userId: number) => {
    const data = await UseFetchData(`${apiURL}/notification`);
    if (data.statusCode === 200) {
      // setIsLoading(true);
      setNotificaitionList(data.data);
    }
  };

  const createNotification = async (payload: any) => {
    // socket.connect();
    // socket.emit("newNotification", payload);
    const res = await UseFetchData(`${apiURL}/notification`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res;
  };

  const revcNotification = (payload: any) => {
    console.log(payload);
  };

  const value = {
    isShowNoti,
    setIsShowNoti,
    notificationList,
    getAllNotifications,
    setNotificaitionList,
    revcNotification,
    createNotification,
  };
  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
};

export default NotiContextProvider;
