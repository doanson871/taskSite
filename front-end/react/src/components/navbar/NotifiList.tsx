import React, { useEffect, useContext } from "react";
import { getDOB } from "../../utils/constant";
import "./noti.scss";
import NotiItem, { INotification } from "./NotiItem";
import { NotiContext } from "../../contexts/notiContext";
import { AuthContext } from "../../contexts/authContext";

interface Props {}

export default function NotifiList(props: Props) {
  const {
    authState: {
      account: { id },
    },
  } = useContext(AuthContext);

  const { notificationList, getAllNotifications } = useContext(NotiContext);

  useEffect(() => {
    getAllNotifications(id);
  }, []);

  const notifications = (notificationList as Array<any>).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (notificationList.length === 0) {
    return (
      <>
        <div className="item-notify">
          <h4 className="noti-content">Không có thông báo</h4>
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
            photoURL={notification.photoURL}
            postId={notification.postId}
            key={id}
          />
        );
      })}
      {/* <NotiItem />
      <NotiItem isRead={true} /> */}
    </div>
  );
}
