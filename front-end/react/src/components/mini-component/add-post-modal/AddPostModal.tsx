import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar } from "antd";

interface Props {
  element: {
    setShow: (show: boolean) => void;
    isFilter: boolean;
    setShowFilter: (show: boolean) => void;
  };
}
const AddPostModal: React.FC<Props> = ({ element }) => {
  const { setShow, isFilter, setShowFilter } = element;
  const {
    authState: { account },
  } = useContext(AuthContext);

  return (
    <div className="add-post d-flex">
      <div className="m-auto">
        <Avatar
          src={account.photoURL || ""}
          icon={!account.photoURL && <i className="bi bi-person"></i>}
          className="avatar-details"
        />
      </div>
      <div className="input-post" onClick={() => setShow(true)}>
        {account.role === "EMPLOYEE"
          ? "Bạn muốn đăng trạng thái?"
          : "Bạn muốn tìm người giúp bạn hoàn thành công việc?"}
      </div>
      <div className="m-auto">
        {isFilter ? (
          <FilterTwoTone
            style={{ fontSize: "24px" }}
            onClick={() => {
              setShowFilter(true);
            }}
          />
        ) : (
          <FilterOutlined
            style={{ fontSize: "24px" }}
            onClick={() => {
              setShowFilter(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddPostModal;
