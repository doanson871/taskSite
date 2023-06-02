import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { Avatar, Button, Image, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import ApplyModel from "../../model/ApplyModel";
import Apply from "./Apply";
interface Props {
  post?: any;
}

const Status = {
  NONE: {
    text: "",
    color: "black",
  },
  PROCESSING: {
    text: "đã ứng tuyển",
    color: "blue",
  },
  REJECTED: {
    text: "từ chối",
    color: "red",
  },
  ACCEPTED: {
    text: "chấp nhận",
    color: "green",
  },
};

const PostDetails: React.FC<Props> = () => {
  const { idPost } = useParams();

  const [showApply, setShowApply] = useState(false);
  const [statusPost, setStatusPost] = useState<boolean>(false);
  const [statusApply, setStatusApply] = useState<any>(Status.NONE);

  const {
    authState: { account },
  } = useContext(AuthContext);

  const { getPostById } = useTasksiteContext();
  const {
    ChatContextData: {
      createConversation,
      setCurrentConversationId,
      setCurrentUserChat,
    },
  } = useContext(ChatContext);

  const [post, setPost] = useState<any>();
  const navigation = useNavigate();

  useEffect(() => {
    getPostById(idPost).then((post: any) => {
      setPost(post.data.postJob);
      setStatusPost(post.data.postJob.status);

      const Apply = (post.data.postJob.Application as Array<any>).find(
        (e) => e.employee.id === account.id
      );
      console.log(Apply);

      if (Apply) {
        setStatusApply((Status as any)[Apply.status]);
      }
    });
  }, []);

  console.log(statusApply);

  const { changeStatusPost, setIsOpenApplyModal } = useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();
  const user = post?.user;
  console.log(post);

  const openNotification = () => {
    api.open({
      message: `${
        statusPost ? "Đóng bài viết thành công" : "Mở bài viết thành công"
      }`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const changeStatus = (id: number, status: boolean) => async () => {
    const response = await changeStatusPost(id, status);
    if (response.status === 200) {
      setStatusPost(!statusPost);
      openNotification();
    }
  };

  const handleClickMessage = async () => {
    const data = await createConversation(user.id);
    if (data.statusCode === 200) {
      setCurrentUserChat({
        name: user.name,
        photoURL: user.photoURL,
      });
      setCurrentConversationId(data.conversationId);
      navigation(`/message/${data.conversationId}`);
    }
  };

  const handleClickApply = () => {
    setIsOpenApplyModal(true);
  };

  const handleSetStatusApply = () => {
    setStatusApply(Status.PROCESSING);
  };

  const handleSeeApply = () => {
    setShowApply(true);
  };

  return (
    <>
      <div className="post d-grid">
        <div className="left-post"></div>
        <div className="center-post">
          {contextHolder}
          <div className="post-detail-item">
            <div className="item-header d-flex justify-content-between">
              <div
                className="d-flex align-items-center item-job-info"
                onClick={() => {
                  navigation(`/profile/${user?.id}`);
                }}
              >
                <div className="status">
                  <Avatar
                    src={user?.photoURL || ""}
                    icon={!user?.photoURL && <i className="bi bi-person"></i>}
                    size={40}
                  />
                </div>
                <div className="item-job-name d-flex">{user?.name}</div>
              </div>
              {account.role === "EMPLOYEE" && (
                <div className="">
                  <span style={{ fontSize: "14px", color: statusApply.color }}>
                    {`Trạng thái: ${statusApply.text}`}
                  </span>
                </div>
              )}
            </div>
            <div className="image-item">
              <Image src={post?.photoURL} alt="" />
            </div>
            <ul>
              <li>Công việc: {post?.work.name}</li>
              <li>Địa chỉ: {post?.address}</li>
              <li>Lương: {post?.salary}</li>
              <li>Quận Huyện: {post?.quanhuyen}</li>
              <li>Thành phố: {post?.thanhpho}</li>
            </ul>
            <div className="description-item">
              <p className="text">{post?.descrition}</p>
            </div>
            {account?.role === "USER" ? (
              <div className="list-btn d-flex justify-content-around">
                <Button
                  type="primary"
                  onClick={changeStatus(post?.id, post?.status)}
                >
                  {statusPost ? "Đóng bài viết " : "Mở bài viết"}
                </Button>

                <Button type="primary" onClick={handleSeeApply}>
                  Xem ứng tuyển
                </Button>
              </div>
            ) : (
              <div className="list-btn d-flex justify-content-around">
                <Button type="primary" onClick={handleClickMessage}>
                  Nhắn tin
                </Button>
                <Button type="primary" onClick={handleClickApply}>
                  Ứng tuyển
                </Button>
              </div>
            )}
          </div>
          {
            showApply &&
              (post.Application as Array<any>).map((application, id) => {
                return (
                  <Apply
                    id={application.id}
                    photoURL={application.employee.photoURL}
                    name={application.employee.name}
                    content={application.content}
                    time={application.createdAt}
                    userId={application.employee.id}
                    postId={post?.id}
                    key={id}
                    status={application.status}
                  />
                );
              })
            // <>
            // <Apply photoURL={""} name={""} />
            //   <Apply photoURL={""} name={""} />
            // </>
          }
        </div>
        <div className="right-post"></div>
      </div>
      <ApplyModel
        postJobId={post?.id}
        receiverId={user?.id}
        setStatusApply={handleSetStatusApply}
      />
    </>
  );
};

export default PostDetails;
