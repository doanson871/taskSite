import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";
import './styles.scss'

interface Props {
  element: {
    setShow: (show: boolean) => void;
    isFilter: boolean;
    setShowFilter: (show: boolean) => void;
  };
}
const AddPostModal: React.FC<Props> = ({ element }) => {
  const { setShow, isFilter, setShowFilter } = element;
  return (
    <div className="add-post d-flex">
      <div className="m-auto">
        <img
          src="https://images.pexels.com/photos/6461482/pexels-photo-6461482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
          className="avatar-post"
          alt="avtar"
        />
      </div>
      <div className="input-post" onClick={() => setShow(true)}>
        Bạn muốn tìm người giúp bạn hoàn thành công việc?
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
