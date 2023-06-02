import { Avatar, notification } from "antd";
import React, { useContext, useState } from "react";
import "./apply.scss";
import {
  DislikeOutlined,
  DislikeTwoTone,
  LikeOutlined,
  LikeTwoTone,
  MessageTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import { getDOB } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import { NotiContext } from "../../../contexts/notiContext";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
interface props {
  id?: number;
  photoURL: string;
  name: string;
  content?: string;
  time?: string;
  userId?: number;
  postId?: number;
  status?: string;
}

const Apply: React.FC<props> = (props) => {
  const navigation = useNavigate();
  const [statusApply, setStatusApply] = useState(props.status);

  console.log(props.status);

  const {
    ChatContextData: {
      createConversation,
      setCurrentConversationId,
      setCurrentUserChat,
    },
  } = useContext(ChatContext);

  const { createNotification } = useContext(NotiContext);

  const { changeStatusApply } = useTasksiteContext();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `Đã gửi thành công`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

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

  const handleReject = async () => {
    const data = await changeStatusApply(props.id, { status: "REJECTED" });
    console.log(data);

    if (data.statusCode === 200) {
      createNoti("Đơn ứng tuyển của bạn bị từ chối");
      openNotification();
      setStatusApply(data.data.status);
    }
  };

  const handleAccept = async () => {
    const data = await changeStatusApply(props.id, { status: "ACCEPTED" });
    if (data.statusCode === 200) {
      createNoti("Đơn ứng tuyển của bạn được chấp nhận");
      openNotification();
      setStatusApply(data.data.status);
    }
  };
  return (
    <div className="apply-item">
      {contextHolder}
      <div className="apply-info">
        <div
          className="apply-profile"
          onClick={() => {
            navigation(`/profile/${props.userId}`);
          }}
        >
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
        {statusApply === "ACCEPTED" ? (
          <LikeTwoTone />
        ) : (
          <LikeOutlined onClick={handleAccept} />
        )}
        {statusApply === "REJECTED" ? (
          <DislikeTwoTone />
        ) : (
          <DislikeOutlined onClick={handleReject} />
        )}
      </div>
    </div>
  );
};

export default Apply;
