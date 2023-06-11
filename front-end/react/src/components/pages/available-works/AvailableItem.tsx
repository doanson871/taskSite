import React, { useContext, useEffect, useState } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { Avatar, Image, notification } from "antd";
import { ChatContext } from "../../../contexts/chatContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import { SmileOutlined } from "@ant-design/icons";
import { NotiContext } from "../../../contexts/notiContext";

interface Props {
  item: any;
}
const AvailableItem: React.FC<Props> = ({ item }) => {
  const {
    getUserById,
    getJobName,
    createNewUserPost,
    createApplyDefault,
    changeStatusApply,
  } = useTasksiteContext();
  const [user, setUser] = useState<any>(null);
  const [job, setJob] = useState<string>("");
  const {
    ChatContextData: {
      createConversation,
      setCurrentConversationId,
      setCurrentUserChat,
    },
  } = useContext(ChatContext);
  const { createNotification } = useContext(NotiContext);
  const [api, contextHolder] = notification.useNotification();
  const { authState } = useContext(AuthContext);

  const account = authState.account;
  const navigation = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getUserById(item.userId);
      if (response.statusCode === 200) {
        setUser(response.data);
      }
      const jobName = await getJobName(+item.workId);
      if (jobName.status === 200) {
        setJob(jobName.data.data.name);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  const handleMessage = async () => {
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
  const openNotification = () => {
    api.open({
      message: "Đã tuyển thành công. Đang điều hướng tới trang nhắn tin",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const createNoti = (reciveId: number, postID: number, content: string) => {
    createNotification({
      reciverId: reciveId,
      content: content,
      postId: postID,
    });
  };

  const handleApply = async () => {
    const postForm = {
      address: account.address || "",
      descrition: item?.description,
      workId: +item?.workId,
      thanhpho: account.thanhpho,
      quanhuyen: account.quanhuyen,
      salary: +item?.priceExpected,
      photoURL: item?.photoURL,
    };
    try {
      const { status, data } = await createNewUserPost(postForm);
      if (status === 200) {
        const response = await createApplyDefault(
          {
            content: "toi muon lam viec nay",
            postJobId: data.id,
          },
          user.id
        );
        if (response.statusCode === 200) {
          const { statusCode, data } = await changeStatusApply(
            response.data.id,
            {
              content: "toi muon lam viec nay",
              status: "ACCEPTED",
            }
          );
          if (statusCode === 200) {
            openNotification();
            setTimeout(() => {
              handleMessage();
            }, 2000);
            createNoti(
              data.employeeId,
              data.id,
              `${account.name} đã tuyển bạn cho công việc ${job}`
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="availble-work-item">
        <div className="work-header d-flex">
          <div
            className="header-item"
            onClick={() => navigation(`/profile/${item.userId}`)}
          >
            <Avatar
              src={user?.photoURL || ""}
              icon={!user?.photoURL && <i className="bi bi-person"></i>}
              className="avatar-details"
            />{" "}
            {" " + user?.name}
          </div>
          <span>{job}</span>
        </div>
        <div className="work-image">
          <Image width={400} src={item.photoURL} alt="" />
        </div>
        <div>
          <span className="fw-bolder">Thu nhập mong muốn: </span>
          {item?.priceExpected}
        </div>
        <div>
          <span className="fw-bolder">Thành phố: </span>
          {item.thanhpho ? (
            item.thanhpho
          ) : (
            <span style={{ color: "blue" }}>Chưa cập nhật</span>
          )}
        </div>
        <div>
          <span className="fw-bolder">Quận Huyện: </span>
          {item.quanhuyen ? (
            item.quanhuyen
          ) : (
            <span style={{ color: "blue" }}>Chưa cập nhật</span>
          )}
        </div>
        <div>
          <span className="fw-bolder">Số điện thoại: </span>
          {item.phoneNumber ? (
            item.phoneNumber
          ) : (
            <span style={{ color: "blue" }}>Chưa cập nhật</span>
          )}
        </div>
        <div className="work-description">
          {" "}
          <span className="fw-bolder">Mô tả: </span>
          {item?.description}
        </div>
        <div className="work-footer">
          <div className="btn" onClick={handleMessage}>
            Nhắn tin
          </div>
          <div className="btn" onClick={handleApply}>
            Tuyển
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableItem;
