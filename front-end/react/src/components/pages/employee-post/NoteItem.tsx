import React, { useContext } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar } from "antd";

interface Props {
  item: any;
}

const NoteItem: React.FC<Props> = ({ item }) => {
  const { authState } = useContext(AuthContext);

  const account = authState.account;
  console.log(item, account);
  return (
    <div className="note-item">
      <div className="header-note d-flex">
        <Avatar
          size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 40 }}
          src={account.photoURL || ""}
          icon={!account.photoURL && <i className="bi bi-person"></i>}
        />
        <span>{item?.title}</span>
      </div>
      {item?.url && (
        <div className="image-box d-flex">
          <img src={item?.url}></img>
        </div>
      )}
      <div className="description">{item?.description}</div>
    </div>
  );
};

export default NoteItem;
