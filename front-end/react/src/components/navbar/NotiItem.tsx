import { Avatar } from "antd";
import "./noti.scss";
import { getDOB } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotiContext } from "../../contexts/notiContext";

export interface INotification {
  isRead?: boolean;
  content?: string;
  createdAt?: string;
  postId?: string;
  id?: number;
  sender?: {
    photoURL?: string;
    name?: string;
  };
}

const NotiItem: React.FC<INotification> = (props: INotification) => {
  const { setIsShowNoti, updateNotification } = useContext(NotiContext);
  const navigation = useNavigate();
  const handleclick = () => {
    setIsShowNoti(false);
    updateNotification(props?.id);
    navigation(`/post/${props.postId}`);
  };

  return (
    <div
      className={`item-notify ${props.isRead && "item-notify-read"}`}
      onClick={handleclick}
    >
      <Avatar
        src={props?.sender?.photoURL}
        size={40}
        className="item-noti-avatar"
      >
        {props.sender?.photoURL
          ? ""
          : props.sender?.name?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div
        className="item-noti-text"
        style={props.isRead ? {} : { fontWeight: "bold" }}
      >
        <span className="item-noti-content">{props.content}</span>
        <span className="item-noti-time">
          {getDOB(props.createdAt as string)}
        </span>
      </div>
    </div>
  );
};

export default NotiItem;
