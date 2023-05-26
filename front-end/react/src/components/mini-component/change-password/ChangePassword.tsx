import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import "./styles.scss";

const ChangePassword: React.FC = () => {
  const {
    authState: { account },
  } = useContext(AuthContext);
  console.log(account);
  return (
    <div className="profile-details">
      <h3 className="my-3">
        <i className="bi bi-key px-2" style={{ color: "green" }}></i> Thay dổi
        mật khẩu
      </h3>
      <div className="row justify-content-between">
        <div className="col-12 my-2">
          Mật khẩu cũ <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-12 my-2">
          Mật khẩu mới <input type="text" className="form-control" />
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-12 my-2">
          Nhập lại khẩu mới <input type="text" className="form-control" />
        </div>
      </div>
      <div className="d-flex justify-content-end py-3">
        <span className="update-button">Thay đổi mật khẩu</span>
      </div>
    </div>
  );
};

export default ChangePassword;
