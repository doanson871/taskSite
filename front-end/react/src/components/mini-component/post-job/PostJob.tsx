import React, { useContext, useEffect } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Props {
  element: {
    id: number;
    address: string;
    photoUrl: string;
    description: string;
    status: boolean;
    workId: number;
  };
}
const PostJob: React.FC<Props> = (element) => {
  const {
    authState: { account },
  } = useContext(AuthContext);
  const { getJobName, changeStatusPost } = useTasksiteContext();
  const { address, description, status, workId, id } = element.element;
  const [jobName, setjobName] = React.useState<string>("");

  const [api, contextHolder] = notification.useNotification();
  const navigation = useNavigate();

  const openNotification = () => {
    api.open({
      message: `${
        status ? "Đóng bài viết thành công" : "Mở bài viết thành công"
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
  const handleOnclick = () => {
    navigation(`/post/${id}`);
  };
  useEffect(() => {
    const getName = async () => {
      const response = await getJobName(workId);
      console.log(response);

      setjobName(response.data.data.name);
    };
    getName();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {contextHolder}
      <div className="post-job-item">
        <div className="item-header d-flex justify-content-between">
          <div className="status">
            {status ? (
              <span className="status-text">
                <i className="bi bi-lightbulb" style={{ color: "green" }}></i>
                {address}
              </span>
            ) : (
              <span className="status-text">
                <i className="bi bi-lightbulb-off" style={{ color: "red" }}></i>
                {address}
              </span>
            )}
          </div>
          <div className="item-job-name">{jobName.toLocaleUpperCase()}</div>
        </div>
        <div className="image-item">
          <img
            src={
              "https://th.bing.com/th/id/OIP.F2JR1gcD1m3EAWIqcY2WtwHaEo?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
            alt=""
          />
        </div>
        <div className="description-item">
          <p className="text">{description}</p>
        </div>
        <div className="list-btn d-flex justify-content-evenly">
          <div className="button-post" onClick={handleOnclick}>
            Xem bài viết
          </div>
          {account.role === "USER" ? (
            <div className="button-post" onClick={changeStatus(id, status)}>
              {status ? "Đóng bài viết " : "Mở bài viết"}
            </div>
          ) : (
            <div className="button-post">Ứng tuyển</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostJob;
