import React, { useContext } from "react";
import "./css/Chat.scss";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { AuthContext } from "../../../contexts/authContext";
import { useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";

interface Props {}

const Chat: React.FC<Props> = (props) => {
  const { id } = useParams();

  console.log(id);

  const authContextData = useContext(AuthContext);
  const {
    ChatContextData: { currentConversationId },
  } = useContext(ChatContext);

  console.log(authContextData);

  return (
    <div className="chat-wrap">
      <div className="chat-sidebar">
        <SideBar />
      </div>
      <div className="chat-chatwindow">
        {currentConversationId === undefined ? (
          <>Hay chon chat</>
        ) : (
          <ChatWindow />
        )}
      </div>
    </div>
  );
};

export default Chat;
