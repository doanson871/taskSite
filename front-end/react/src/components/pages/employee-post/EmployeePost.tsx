import "./styles.scss";
import CenterPost from "./CenterPost";
const EmployeePost: React.FC = () => {
  return (
    <>
      <div className="employee-post d-grid">
        <div className="left-side"></div>
        <div className="center-side">
          <CenterPost />
        </div>
        <div className="right-side"></div>
      </div>
    </>
  );
};

export default EmployeePost;
