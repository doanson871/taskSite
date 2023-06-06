import React, { useEffect } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import "./styles.scss";
import { Image } from "antd";
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
  const { getJobName } = useTasksiteContext();
  const { address, description, status, workId, id, photoUrl } =
    element.element;
  const [jobName, setjobName] = React.useState<string>("");

  const navigation = useNavigate();

  // const changeStatus = (id: number, status: boolean) => async () => {
  //   const response = await changeStatusPost(id, status);
  //   if (response.status === 200) {
  //     openNotification();
  //   }
  // };
  const handleOnclick = () => {
    navigation(`/post/${id}`);
  };
  useEffect(() => {
    const getName = async () => {
      const response = await getJobName(+workId);

      setjobName(response.data.data.name);
    };
    getName();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="post-job-item" onClick={handleOnclick}>
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
        <Image src={photoUrl} alt="" />
      </div>
      <div className="description-item">
        <p className="text">{description}</p>
      </div>
    </div>
  );
};

export default PostJob;
