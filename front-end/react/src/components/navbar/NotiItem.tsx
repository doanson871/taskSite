import { Avatar } from "antd";
import "./noti.scss";
import { getDOB } from "../../utils/constant";

export interface INotification {
  isRead?: boolean;
  content?: string;
  createdAt?: string;
  photoURL?: string;
  postId?: string;
}

const NotiItem: React.FC<INotification> = (props: INotification) => {
  const handleclick = () => {};

  return (
    <div
      className={`item-notify ${props.isRead && "item-notify-read"}`}
      onClick={handleclick}
    >
      <Avatar src="" size={40} className="item-noti-avatar">
        C
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
