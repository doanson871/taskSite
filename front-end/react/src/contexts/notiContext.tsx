import { PropsWithChildren, createContext, useState } from "react";
import { apiURL, socket } from "../utils/constant";
import { UseFetchData } from "../hooks/useFetchData";

export const NotiContext = createContext<any>(null);

export interface INotification {}

const NotiContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificaitionList] = useState([]);

  const getAllNotifications = async (userId: number) => {
    if (!isLoading) {
      const data = await UseFetchData(`${apiURL}/notification`);
      console.log(data);
      if (data.statusCode === 200) {
        setIsLoading(true);
        setNotificaitionList(data.data);
      }
    }
  };

  const createNotification = (payload: INotification) => {
    socket.connect();
    socket.emit("newNotification", payload);
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
