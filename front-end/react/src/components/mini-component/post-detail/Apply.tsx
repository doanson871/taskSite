import { Avatar } from "antd";
import React from "react";

interface props {
  photoURL: string;
  name: string;
  desc?: string;
  time?: string;
}

const Apply: React.FC<props> = () => {
  return (
    <>
      <div className="apply-info">
        <div className="apply-profile">
          <Avatar src>C</Avatar>
          <span className="apply-name">Thai</span>
        </div>
        <span className="apply-time">11/06/2001</span>
      </div>
      <div className="apply-content">12321321</div>
      <div className="apply-icon">1232143</div>
    </>
  );
};

export default Apply;
