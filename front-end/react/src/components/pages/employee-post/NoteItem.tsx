import React, { useContext } from "react";
import "./styles.scss";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar, Image } from "antd";
import { getDOB } from "../../../utils/constant";

interface Props {
  item: any;
}

const NoteItem: React.FC<Props> = ({ item }) => {
  const { authState } = useContext(AuthContext);

  const account = authState.account;
  return (
    <div className="note-item">
      <div className="header-note d-flex">
        <div className="d-flex align-items-center">
          <Avatar
            size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 40 }}
            src={account.photoURL || ""}
            icon={!account.photoURL && <i className="bi bi-person"></i>}
            style={{
              marginRight: "10px",
            }}
          />
          <span>{item?.user?.name}</span>
        </div>
        <span>{item?.title}</span>
      </div>
      {item?.url && (
        <div className="image-box d-flex">
          <Image width={300} alt="" src={item?.url}></Image>
        </div>
      )}
      <div className="description">{item?.description}</div>
      <div
        className="d-flex justify-content-end"
        style={{ fontWeight: "bold" }}
      >
        {getDOB(item.createdAt)}
      </div>
    </div>
  );
};

export default NoteItem;
