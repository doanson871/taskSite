import React from "react";
import { Avatar, Typography } from "antd";
import "./css/Message.scss";

interface Props {}

// const formDate = (seconds) => {
//   let formattedDate = "";
//   if (seconds) {
//     formattedDate = formatRelative(new Date(seconds * 1000), new Date());

//     formattedDate =
//       formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
//   }

//   return formattedDate;
// };

const Message: React.FC<Props> = (props) => {
  return (
    <div className="message-wrap">
      <div>
        <Avatar size={"small"} src={""}>
          C
        </Avatar>
        <Typography.Text className="message-author"></Typography.Text>
      </div>
      <div className="message-content">
        <Typography.Text>Hello asdfsa fdsa fdsafdsa</Typography.Text>
      </div>
    </div>
  );
};

export default Message;
