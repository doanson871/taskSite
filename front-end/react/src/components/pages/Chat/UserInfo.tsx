import { Avatar, Typography } from "antd";
import React, { useContext } from "react";
import "./css/UserInfo.scss";
import { AuthContext } from "../../../contexts/authContext";

interface Props {}

const UserInfo: React.FC<Props> = (props) => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  return (
    <div className="user-info">
      <Avatar src={account.photoURL}>
        {account.photoURL ? "" : account.name?.charAt(0)?.toUpperCase()}
      </Avatar>
      <Typography.Text className="user-name">{account.name}</Typography.Text>
    </div>
  );
};

export default UserInfo;
