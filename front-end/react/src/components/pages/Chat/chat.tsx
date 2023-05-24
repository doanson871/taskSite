import React, { useContext, useEffect } from "react";
import "./css/Chat.scss";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import { AuthContext } from "../../../contexts/authContext";
import { useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import { socket } from "../../../utils/constant";

interface Props {}

const Chat: React.FC<Props> = (props) => {
  const { idParams } = useParams();

  console.log(idParams);

  const {
    ChatContextData: {
      getControvations,
      currentConversationId,
      setCurrentConversationId,
    },
  } = useContext(ChatContext);

  const {
    authState: {
      account: { id },
    },
  } = useContext(AuthContext);
  setCurrentConversationId(idParams);
  // console.log(authContextData);

  useEffect(() => {
    getControvations();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on(`onLastMessageUser${id}`, (data) => {
      console.log(data);
    });
  }, [id]);

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
