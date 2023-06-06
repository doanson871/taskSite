import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

interface Props {
  element: {
    setShow: (show: boolean) => void;
    isFilter: boolean;
    setShowFilter: (show: boolean) => void;
  };
}
const Filter: React.FC<Props> = ({ element }) => {
  const { setShow, isFilter, setShowFilter } = element;
  const {
    authState: { account },
  } = useContext(AuthContext);

  return (
    <>
      {account.role === "EMPLOYEE" && (
        <div className="filter-only d-flex" onClick={() => setShowFilter(true)}>
          <span> Bộ lọc: </span>
          {isFilter ? (
            <FilterTwoTone style={{ fontSize: "24px" }} />
          ) : (
            <FilterOutlined style={{ fontSize: "24px" }} />
          )}
        </div>
      )}
    </>
  );
};

export default Filter;
