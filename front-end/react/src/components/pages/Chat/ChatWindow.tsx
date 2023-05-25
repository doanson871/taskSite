import React, { useContext, useEffect, useState } from "react";
import { Input, Button, Avatar } from "antd";
import "./css/ChatWindow.scss";
import Message from "./Message";
import { socket } from "../../../utils/constant";
import { ChatContext } from "../../../contexts/chatContext";
import { AuthContext } from "../../../contexts/authContext";

interface Props {}

const ChatWindow: React.FC<Props> = (props) => {
  const {
    authState: {
      account: { id },
    },
  } = useContext(AuthContext);

  const [value, setValue] = useState("");
  const {
    ChatContextData: {
      currentConversationId,
      sendMessage,
      getConversationMessages,
      chatState,
      recvMessage,
      currentUserChat,
    },
  } = useContext(ChatContext);

  const handleClick = () => {
    if (!value) return;
    sendMessage({
      conversationId: currentConversationId,
      message: {
        content: value,
        time: new Date().toISOString(),
        userId: id,
      },
    });
    setValue("");
  };

  // console.log(currentConversationId);

  const messages: Array<any> = (chatState.conversations as Array<any>).find(
    (conversation) => conversation.conversationId === currentConversationId
  )?.messages;

  useEffect(() => {
    getConversationMessages(currentConversationId);
    socket.connect();
    // (socketRef.current as any).socket = socket;

    socket.on(`onMessageRoom${currentConversationId}`, (data) => {
      recvMessage(data.data);
    });

    // clean
    return () => {
      socket.removeListener(`onMessageRoom${currentConversationId}`);
    };
  }, [currentConversationId]);

  return (
    <div className="chat-window-wrap">
      <div className="chat-window-header">
        <div className="chat-window-header-content">
          <Avatar
            src={currentUserChat.photoURL}
            className="chat-window-header-avatar"
          >
            {currentUserChat.photoURL
              ? ""
              : currentUserChat.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <span className="chat-window-header-name">
            {currentUserChat.name}
          </span>
        </div>
      </div>
      <div className="chat-window-content">
        <div className="chat-window-message-list">
          {messages.map((message, id) => {
            return (
              <Message
                content={message.content}
                key={id}
                userId={message.userId}
              />
            );
          })}
          {/* <Message userId={1} />
          <Message userId={1} />
          <Message />
          <Message /> */}
        </div>
        <div className="chat-window-form">
          <Input
            bordered={false}
            className="chat-window-input"
            placeholder="type message...."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button type="primary" onClick={handleClick}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
