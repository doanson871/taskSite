import React, { useContext, useEffect } from "react";
import "./css/Chat.scss";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
interface Props {}

const Chat: React.FC<Props> = (props) => {
  const { idChat } = useParams();

  // console.log(idChat);

  const {
    ChatContextData: {
      getControvations,
      currentConversationId,
      setCurrentConversationId,
    },
  } = useContext(ChatContext);

  // } = useContext(AuthContext);
  // console.log(authContextData);

  useEffect(() => {
    getControvations();
    if (currentConversationId !== idChat) setCurrentConversationId(idChat);
     // eslint-disable-next-line
  }, []);

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
