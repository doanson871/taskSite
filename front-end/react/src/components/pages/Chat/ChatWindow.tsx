import React from "react";
import { Input, Button, Avatar } from "antd";
import "./css/ChatWindow.scss";
import Message from "./Message";

interface Props {}

const ChatWindow: React.FC<Props> = (props) => {
  return (
    <div className="chat-window-wrap">
      <div className="chat-window-header">
        <div className="chat-window-header-content">
          <Avatar src="" className="chat-window-header-avatar">
            D
          </Avatar>
          <span className="chat-window-header-name">Doan Hoang Son</span>
        </div>
      </div>
      <div className="chat-window-content">
        <div className="chat-window-message-list">
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="chat-window-form">
          <Input
            bordered={false}
            className="chat-window-input"
            placeholder="type message...."
          />
          <Button type="primary" onClick={() => {}}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
