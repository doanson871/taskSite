import { useEffect, useContext } from "react";
import "./noti.scss";
import NotiItem, { INotification } from "./NotiItem";
import { NotiContext } from "../../contexts/notiContext";
import { AuthContext } from "../../contexts/authContext";
import { Empty } from "antd";

interface Props {}

export default function NotifiList(props: Props) {
  const {
    authState: {
      account: { id },
    },
  } = useContext(AuthContext);

  const { notificationList, getAllNotifications, setIsLoading } =
    useContext(NotiContext);

  useEffect(() => {
    if (id) {
      getAllNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setIsLoading(false);
    };
  }, []);

  const notifications = (notificationList as Array<any>).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (notificationList.length === 0) {
    return (
      <>
        <div className="item-notify">
          <Empty />
        </div>
      </>
    );
  }
  return (
    <div className="list-notify">
      {notifications.map((notification: INotification, id: number) => {
        return (
          <NotiItem
            content={notification.content}
            isRead={notification.isRead}
            createdAt={notification.createdAt}
            sender={notification.sender}
            postId={notification.postId}
            id={notification.id}
            key={id}
          />
        );
      })}
      {/* <NotiItem />
      <NotiItem isRead={true} /> */}
    </div>
  );
}
