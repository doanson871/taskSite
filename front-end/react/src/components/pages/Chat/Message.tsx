import React, { useContext, useRef } from "react";
import { Avatar, Typography } from "antd";
import "./css/Message.scss";
import { AuthContext } from "../../../contexts/authContext";

interface Props {
  content: string;
  userId?: number;
}

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
  // const scrollIntoView = (index: string) => {
  //   if (isStart) {
  //     const element = document.getElementById(q-${index});
  //     if (element) {
  //       element.scrollIntoView({
  //         block: 'center',
  //         inline: 'center',
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // };

  const refMsg = useRef();
  const {
    authState: {
      account: { id },
    },
  } = useContext(AuthContext);

  return (
    <div
      className="message-wrap"
      style={props.userId === id ? { justifyContent: "flex-end" } : {}}
    >
      {props.userId !== id && (
        <div>
          <Avatar size={"small"} src={""}>
            C
          </Avatar>
        </div>
      )}
      <div
        className="message-content"
        style={props.userId === id ? { backgroundColor: "#0d6efd" } : {}}
      >
        <Typography.Text>{props.content}</Typography.Text>
      </div>
    </div>
  );
};

export default Message;
