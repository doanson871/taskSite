import { Avatar } from "antd";
import React, { useContext } from "react";
import "./apply.scss";
import { DislikeTwoTone, LikeTwoTone, MessageTwoTone } from "@ant-design/icons";
import { getDOB } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import { NotiContext } from "../../../contexts/notiContext";
interface props {
  photoURL: string;
  name: string;
  content?: string;
  time?: string;
  userId?: number;
  postId?: number;
}

const Apply: React.FC<props> = (props) => {
  const navigation = useNavigate();
  const {
    ChatContextData: {
      createConversation,
      setCurrentConversationId,
      setCurrentUserChat,
    },
  } = useContext(ChatContext);

  const { createNotification } = useContext(NotiContext);

  const createNoti = (content: string) => {
    createNotification({
      reciverId: props.userId,
      content: content,
      postId: props.postId,
    });
  };

  const handleClickMessage = async () => {
    const data = await createConversation(props.userId);
    console.log(data);

    if (data.statusCode === 200) {
      setCurrentUserChat({
        name: props.name,
        photoURL: props.photoURL,
      });
      setCurrentConversationId(data.conversationId);
      navigation(`/message/${data.conversationId}`);
    }
  };

  const handleReject = async () => {};

  const handleResolve = async () => {};
  return (
    <div className="apply-item">
      <div className="apply-info">
        <div className="apply-profile">
          <Avatar src={props.photoURL} className="apply-avatar">
            C
          </Avatar>
          <span className="apply-name">{props.name}</span>
        </div>
        <span className="apply-time">{getDOB(props.time as string)}</span>
      </div>
      <div className="apply-content">{props.content}</div>
      <div className="apply-icon">
        <MessageTwoTone onClick={handleClickMessage} />
        <LikeTwoTone onClick={handleResolve} />
        <DislikeTwoTone onClick={handleReject} />
      </div>
    </div>
  );
};

export default Apply;
