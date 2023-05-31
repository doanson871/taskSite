import React from "react";
import "./styles.scss";

const WorkList: React.FC = () => {
  return (
    <div className="work-list-employee">
      <div className="add-work-btn">
        <div className="button">Thêm công việc của bạn</div>
      </div>
      <table className="table-work">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên công việc</th>
            <th>Lương</th>
            <th>Trạng thái</th>
            <th>Xóa công việc</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default WorkList;
