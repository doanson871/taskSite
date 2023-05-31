import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { Avatar, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
interface Props {
  post: any;
}
const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    authState: { account },
  } = useContext(AuthContext);
  const [jobName, setjobName] = useState<any>("");
  const { getJobName } = useTasksiteContext();
  console.log(post);
  const { changeStatusPost } = useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `${
        post?.status ? "Đóng bài viết thành công" : "Mở bài viết thành công"
      }`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  useEffect(() => {
    const getName = async () => {
      const response = post?.workId && (await getJobName(`${post.workId}`));
      setjobName(response.data.data.name);
    };
    getName();
    // eslint-disable-next-line
  }, [post]);

  const changeStatus = (id: number, status: boolean) => async () => {
    const response = await changeStatusPost(id, status);
    if (response.status === 200) {
      openNotification();
    }
  };
  return (
    <>
      {contextHolder}
      <div className="post-detail-item">
        <div className="item-header d-flex">
          <div className="status">
            <Avatar
              src={account.photoURL || ""}
              icon={!account.photoURL && <i className="bi bi-person"></i>}
              size={40}
            />
          </div>
          <div className="item-job-name d-flex ">{account.name}</div>
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
          <li>Công việc: {jobName}</li>
          <li>Địa chỉ: {post?.address}</li>
          <li>Lương: {post?.salary}</li>
          <li>Quận Huyện: {post?.quanhuyen}</li>
          <li>Thành phố: {post?.thanhpho}</li>
        </ul>
        <div className="description-item">
          <p className="text">{post?.descrition}</p>
        </div>
        <div className="list-btn d-flex justify-content-center">
          {account.role === "USER" ? (
            <div
              className="button-post"
              onClick={changeStatus(0, post?.status)}
            >
              {post?.status ? "Đóng bài viết " : "Mở bài viết"}
            </div>
          ) : (
            <div className="button-post">Ứng tuyển</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
