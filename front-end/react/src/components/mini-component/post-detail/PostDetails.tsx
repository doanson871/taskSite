import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { Avatar, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "../../../contexts/chatContext";
import ApplyModel from "../../model/ApplyModel";
interface Props {
  post?: any;
}
const PostDetails: React.FC<Props> = () => {
  const { idPost } = useParams();

  const [showApply, setShowApply] = useState(false);

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
    });
  }, []);

  const { changeStatusPost, isOpenApplyModal, setIsOpenApplyModal } =
    useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();
  const user = post?.user;

  const openNotification = () => {
    api.open({
      message: `${
        post?.status ? "Đóng bài viết thành công" : "Mở bài viết thành công"
      }`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const changeStatus = (id: number, status: boolean) => async () => {
    const response = await changeStatusPost(id, status);
    if (response.status === 200) {
      openNotification();
    }
  };

  const handleClickMessage = async () => {
    const data = await createConversation(user.id);
    console.log(data);
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

  const handleSeeApply = () => {};

  console.log(post);

  return (
    <>
      <div className="post d-grid">
        <div className="left-post"></div>
        <div className="center-post">
          {contextHolder}
          <div className="post-detail-item">
            <div className="item-header d-flex">
              <div className="status">
                <Avatar
                  src={user?.photoURL || ""}
                  icon={!user?.photoURL && <i className="bi bi-person"></i>}
                  size={40}
                />
              </div>
              <div className="item-job-name d-flex ">{user?.name}</div>

              {account.id !== user?.id && (
                <Button type="primary" onClick={handleClickMessage}>
                  {" "}
                  nhắn tin
                </Button>
              )}
            </div>
            <div className="image-item">
              <img
                src={
                  "https://th.bing.com/th/id/OIP.F2JR1gcD1m3EAWIqcY2WtwHaEo?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                }
                alt=""
              />
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
                <Button type="primary" onClick={changeStatus(0, post?.status)}>
                  {post?.status ? "Đóng bài viết " : "Mở bài viết"}
                </Button>

                <Button type="primary" onClick={handleSeeApply}>
                  Xem ứng tuyển
                </Button>
              </div>
            ) : (
              <div className="list-btn d-flex justify-content-around">
                <Button type="primary" onClick={handleClickApply}>
                  Ứng tuyển
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="right-post"></div>
      </div>
      <ApplyModel postJobId={post?.id} receiverId={user?.id} />
    </>
  );
};

export default PostDetails;
