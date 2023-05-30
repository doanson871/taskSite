import React, { useContext, useState } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar, notification } from "antd";
import { initialGender, initialRole } from "../../../utils/constant";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { SmileOutlined } from "@ant-design/icons";

interface Props {
  data: any;
}

const ProfileDetail: React.FC = (props) => {
  const {
    authState: { account },
  } = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Cập nhật hồ sơ thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const { updateProfile } = useTasksiteContext();
  const [accountForm, setAccountForm] = useState(account);
  const handleUpdateProfile = async () => {
    const response = await updateProfile(accountForm);
    if (response.status === 200) {
      openNotification();
    }
  };
  return (
    <>
      {contextHolder}
      <div className="profile-details">
        <h3 className="my-3">
          <i
            className="bi bi-person-bounding-box px-2"
            style={{ color: "green" }}
          ></i>{" "}
          Thông tin cơ bản
        </h3>
        <div className="row justify-content-between">
          <div className="col-5 my-2">
            <div className="my-2">
              Họ và tên
              <input
                type="text"
                className="form-control"
                value={accountForm.name}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, name: e.target.value })
                }
              />
            </div>
            <div className="my-2">
              Email
              <input
                type="text"
                className="form-control"
                value={accountForm.email}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-5 my-2 d-flex avatar-profile">
            <Avatar
              src={accountForm.photoURL || ""}
              icon={!accountForm.photoURL && <i className="bi bi-person"></i>}
              size={150}
            />
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-5 my-2">
            Số điện thoại{" "}
            <input
              type="text"
              className="form-control"
              value={accountForm.phoneNumber}
              onChange={(e) =>
                setAccountForm({ ...accountForm, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="col-5 my-2">
            Vai trò
            <select
              className="form-select"
              aria-label="Default select example"
              value={accountForm.role}
              onChange={(e) =>
                setAccountForm({ ...accountForm, role: e.target.value })
              }
            >
              {initialRole.map((role) => (
                <option value={role.role}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-5 my-2">
            Giới tính
            <select
              className="form-select"
              aria-label="Default select example"
              value={accountForm.sex}
              onChange={(e) =>
                setAccountForm({ ...accountForm, sex: e.target.value })
              }
            >
              {initialGender.map((sex) => (
                <option value={sex}>{sex}</option>
              ))}
            </select>
          </div>
          <div className="col-5 my-2">
            Tuổi
            <input
              type="text"
              className="form-control"
              value={accountForm.age}
              onChange={(e) =>
                setAccountForm({ ...accountForm, age: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-12 my-2">
            Địa chỉ chi tiết
            <input
              type="text"
              className="form-control"
              value={accountForm.quanhuyen}
              onChange={(e) =>
                setAccountForm({ ...accountForm, quanhuyen: e.target.value })
              }
            />
          </div>
        </div>
        <div className="d-flex justify-content-end py-3">
          <span className="update-button" onClick={handleUpdateProfile}>
            Cập nhật hồ sơ
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
