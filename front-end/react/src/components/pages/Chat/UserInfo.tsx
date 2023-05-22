import { Avatar, Typography } from "antd";
import React from "react";
import "./css/UserInfo.scss";

interface Props {}

const UserInfo: React.FC<Props> = (props) => {
  return (
    <div className="user-info">
      <Avatar src="">C</Avatar>
      <Typography.Text className="user-name">Chu Huy Thái</Typography.Text>
    </div>
  );
};

export default UserInfo;
