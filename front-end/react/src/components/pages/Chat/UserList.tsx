import { Avatar, Typography } from "antd";
import React, { useContext } from "react";
import "./css/UserList.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";

interface Props {
  conversationId: number;
  photoURL?: string;
  name?: string;
  lastMessage?: string;
}

const UserList: React.FC<Props> = (props: Props) => {
  // console.log(props);

  const {
    ChatContextData: { currentConversationId, setCurrentConversationId },
  } = useContext(ChatContext);

  const navigation = useNavigate();
  const handleClick = () => {
    console.log(props.conversationId);

    setCurrentConversationId(props.conversationId);
    navigation(`/message/${props.conversationId ? props.conversationId : 1}`);
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
      <Avatar className="user-list-avatar" src="">
        C
      </Avatar>
      <div className="user-list-text">
        <Typography.Text>Chu Huy Thai</Typography.Text>
        <div className="user-list-message">
          <span className="user-list-lastmessage">{props.lastMessage}</span>
          <Typography.Text className="user-list-time">Time</Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default UserList;
