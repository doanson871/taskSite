import { Avatar, Typography } from "antd";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import "./css/UserList.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";

interface Props {
  photoURL?: string;
  name?: string;
  conversationId: number;
}

const UserList: React.FC<Props> = (props: Props) => {
  const {
    ChatContextData: { currentConversationId, setCurrentConversationId },
  } = useContext(ChatContext);

  console.log(currentConversationId, setCurrentConversationId);

  const navigation = useNavigate();
  const handleClick = () => {
    setCurrentConversationId(props.conversationId);
    navigation(`/message/${props.conversationId ? props.conversationId : 1}`);
  };

  return (
    <div
      className={"user-list-item"}
      onClick={handleClick}
      style={
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
          <span className="user-list-lastmessage">
            Message asdf sadf safsd adsfs d
          </span>
          <Typography.Text className="user-list-time">Time</Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default UserList;
