import React, { useEffect } from "react";
import "./styles.scss";
import AddWork from "../add-work/AddWork";
import { ToolTwoTone } from "@ant-design/icons";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";

const WorkList: React.FC = () => {
  const { getAllUserOnWork, workList, getJobName, deleteUserOnWork } =
    useTasksiteContext();
  const [workNames, setWorkNames] = React.useState<any>([]);
  const [show, setShow] = React.useState<boolean>(false);
  const [updateItem, setUpdateItem] = React.useState<any>(null);
  useEffect(() => {
    getAllUserOnWork();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const handle = async () => {
      const promiseList = workList.map((work: any) => {
        const response = getJobName(+work.workId);
        return response;
      });
      const list = await Promise.all(promiseList);
      setWorkNames(list.map((item: any) => item.data.data.name));
    };

    handle();
    // eslint-disable-next-line
  }, [workList]);
  const deleteWork = (id: number) => async () => {
    const response = await deleteUserOnWork(id);
    if (response.status === 200) {
      alert("Xóa thành công");
    }
  };
  return (
    <>
      <div className="work-list-employee">
        <div className="add-work-btn d-flex">
          <div className="button" onClick={() => setShow(true)}>
            <span>Thêm công việc của bạn</span>{" "}
            <i className="bi bi-person-rolodex"></i>
          </div>
        </div>
        <table className="table-work table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên công việc</th>
              <th>Lương</th>
              <th>Trạng thái</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workList.map((work: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{workNames[index]}</td>
                <td>{work.priceExpected}</td>
                <td>{work.status ? "Đang tìm việc" : "Tạm khóa"}</td>
                <td>
                  <i
                    className="bi bi-trash item"
                    style={{ color: "red" }}
                    onClick={deleteWork(work.id)}
                  ></i>
                </td>
                <td>
                  <ToolTwoTone
                    className="item"
                    onClick={() => {
                      setUpdateItem(work);
                      setShow(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!updateItem && (
        <AddWork show={show} handleClose={() => setShow(false)} />
      )}
      {updateItem && (
        <AddWork
          show={show}
          handleClose={() => setShow(false)}
          item={updateItem}
          setUpdateItem={() => setUpdateItem(null)}
        />
      )}
    </>
  );
};

export default WorkList;
