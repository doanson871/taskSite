import { Avatar, Typography } from "antd";
import React, { useContext } from "react";
import "./css/UserList.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import { getDOB } from "../../../utils/constant";

interface Props {
  conversationId: number;
  photoURL?: string;
  name?: string;
  lastMessage?: string;
  updateTime?: string;
  seen?: boolean;
}

const UserList: React.FC<Props> = (props: Props) => {
  // console.log(props);

  const {
    ChatContextData: {
      currentConversationId,
      setCurrentConversationId,
      setCurrentUserChat,
    },
  } = useContext(ChatContext);

  const navigation = useNavigate();
  const handleClick = () => {
    if (props.conversationId !== currentConversationId) {
      setCurrentUserChat({
        name: props.name,
        photoURL: props.photoURL,
      });
      setCurrentConversationId(props.conversationId);
      navigation(`/message/${props.conversationId ? props.conversationId : 1}`);
    }
  };

  return (
    <div
      className={"user-list-item"}
      onClick={handleClick}
      style={
        currentConversationId !== undefined &&
        currentConversationId === props.conversationId
          ? {
              backgroundColor: "#a0a0a0",
            }
          : {}
      }
    >
      <Avatar className="user-list-avatar" src={props.photoURL}>
        {props.photoURL ? "" : props.name?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div
        className="user-list-text"
        style={!props.seen ? { fontWeight: "bold" } : {}}
      >
        <Typography.Text>{props.name}</Typography.Text>
        <div className="user-list-message">
          <span className="user-list-lastmessage">{props.lastMessage}</span>
          <Typography.Text className="user-list-time">
            {getDOB(props.updateTime as string)}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default UserList;
