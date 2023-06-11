import React, { useContext, useEffect } from "react";
import "./css/Chat.scss";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import { MessageOutlined } from "@ant-design/icons";
interface Props {}

const Chat: React.FC<Props> = (props) => {
  const { idChat } = useParams();

  const {
    ChatContextData: {
      getConversations,
      currentConversationId,
      setCurrentConversationId,
    },
  } = useContext(ChatContext);

  // } = useContext(AuthContext);
  // console.log(authContextData);

  useEffect(() => {
    if (!idChat) setCurrentConversationId(undefined);
    getConversations();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat-wrap">
      <div className="chat-sidebar">
        <SideBar />
      </div>
      <div className="chat-chatwindow">
        {currentConversationId === undefined ? (
          <div className="chat-empty">
            <MessageOutlined className="chat-empty-icon" />
            <span className="chat-empty-text">Hãy chọn ai đó để chat....</span>
          </div>
        ) : (
          <ChatWindow />
        )}
      </div>
    </div>
  );
};

export default Chat;
