import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar, notification } from "antd";
import { initialGender, initialRole } from "../../../utils/constant";
import { SmileOutlined } from "@ant-design/icons";
import { UseUploadImage } from "../../../hooks/useUploadImg";
interface Props {
  data?: any;
  idProfile: number;
}

const ProfileDetail: React.FC<Props> = (props) => {
  const { authState, updateProfile, getInfoUserById } = useContext(AuthContext);

  const account = authState.account;
  const [api, contextHolder] = notification.useNotification();

  const [accountForm, setAccountForm] = useState(account);
  const [disabled, setDisabled] = useState(false);

  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string>(accountForm.photoURL);

  const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImageUpload(file);

    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      imageURL && URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  useEffect(() => {
    if (props.idProfile && props.idProfile !== account.id) {
      getInfoUserById(props.idProfile).then((data: any) => {
        if (data.statusCode === 200) {
          setAccountForm(data.data);
          setDisabled(true);
          setImageURL(data.data.photoURL);
        }
      });
    } else {
      setAccountForm(account);
      setDisabled(false);
      setImageURL(account.photoURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idProfile]);

  const openNotification = () => {
    api.open({
      message: "Cập nhật hồ sơ thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const handleUpdateProfile = async () => {
    const photoURL = await UseUploadImage(imageUpload);
    let dataSubmit = { ...accountForm };
    if (photoURL) {
      setAccountForm({ ...accountForm, photoURL });
      dataSubmit = { ...dataSubmit, photoURL };
    }
    dataSubmit.age = parseInt(accountForm.age);
    const response = await updateProfile(dataSubmit, account);

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
                disabled={disabled}
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
                disabled={disabled}
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
              src={imageURL}
              icon={!accountForm.photoURL && <i className="bi bi-person"></i>}
              size={150}
            />
            {!disabled && (
              <input
                type="file"
                onChange={(event) => {
                  handleUpdateImage(event);
                }}
                accept="image/*"
              />
            )}
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-5 my-2">
            Số điện thoại{" "}
            <input
              disabled={disabled}
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
              disabled
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
              disabled={disabled}
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
              disabled={disabled}
              type="text"
              className="form-control"
              value={parseInt(accountForm.age)}
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
              disabled={disabled}
              type="text"
              className="form-control"
              // value={accountForm.quanhuyen}
              // onChange={(e) =>
              //   setAccountForm({ ...accountForm, quanhuyen: e.target.value })
              // }
            />
          </div>
        </div>
        {!disabled && (
          <div className="d-flex justify-content-end py-3">
            <span className="update-button" onClick={handleUpdateProfile}>
              Cập nhật hồ sơ
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDetail;
