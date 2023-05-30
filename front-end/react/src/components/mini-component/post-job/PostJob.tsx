import React, { useContext, useEffect } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";

interface Props {
  element: {
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
  const { getJobName } = useTasksiteContext();
  const { address, description, status, workId } = element.element;
  const [jobName, setjobName] = React.useState<string>("");
  useEffect(() => {
    const getName = async () => {
      const response = await getJobName(workId);
      setjobName(response.data.data.name);
    };
    getName();
    // eslint-disable-next-line
  }, []);
  console.log(account);
  return (
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
        <div className="button-post">Xem bài viết</div>
        {account.role === "USER" ? (
          <div className="button-post">Đóng bài viết</div>
        ) : (
          <div className="button-post">Ứng tuyển</div>
        )}
      </div>
    </div>
  );
};

export default PostJob;
