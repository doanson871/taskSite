import { Switch, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import "./styles.scss";
import { SmileOutlined, WarningTwoTone } from "@ant-design/icons";
interface Props {
  show: boolean;
  handleClose: () => void;
  item?: any;
  setUpdateItem?: () => void;
}

const AddWork: React.FC<Props> = ({
  show,
  handleClose,
  item,
  setUpdateItem,
}) => {
  const { getAllWorks, postUserOnWork, updateUserOnWork } =
    useTasksiteContext();
  const [listJobs, setlistJobs] = useState<any[]>([]);
  const [job, setjob] = useState<number>(0);
  const [salary, setsalary] = useState<string>("0");
  const [description, setdescription] = useState<string>("");
  const [status, setstatus] = useState<boolean>(true);
  // const [photo, setphoto] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (item) {
      setjob(item?.workId);
      setsalary(item?.priceExpected);
      setdescription(item?.description);
      setstatus(item?.status);
    }
    // eslint-disable-next-line
  }, [item]);

  const openNotification = () => {
    api.open({
      message: `${item ? "Thay đổi công việc" : "Tạo công việc"} thành công`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const failAddPost = () => {
    api.open({
      message: `${item ? "Thay đổi công việc" : "Tạo công việc"} thất bại`,
      icon: <WarningTwoTone style={{ color: "#red" }} />,
    });
  };

  const getAllJobs = async () => {
    try {
      const allWorks = await getAllWorks();
      let listWork = [{ id: 0, name: "Hãy lựa chọn công việc" }, ...allWorks];
      setlistJobs(listWork);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePost = async () => {
    const { statusCode } = await postUserOnWork({
      description,
      priceExpected: salary,
      status,
      workId: job,
    });

    if (statusCode === 200) {
      openNotification();
      handleClose();
    } else {
      failAddPost();
      handleClose();
    }
  };

  const handleUpdate = async () => {
    const response = await updateUserOnWork(item.id, {
      description,
      priceExpected: salary,
      status,
      workId: job,
      id: item.id,
    });
    if (response.status === 200) {
      openNotification();
    } else {
      failAddPost();
    }
    setUpdateItem && setUpdateItem();
    handleClose();
  };

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo công việc của bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-work container">
            <div className="row mb-2">
              <div className="col-2 fs-6">Công việc</div>
              <div className="col-10 fs-6 box-select p-0">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={job}
                  onChange={(e) => setjob(+e.target.value)}
                >
                  {listJobs.map((job) => (
                    <option value={job.id}>{job.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6 distric">Lương mong muốn</div>
              <div className="col-4 fs-6 box-input p-0">
                <input
                  type="text"
                  className="col-10 address-input box-input"
                  value={salary}
                  onChange={(e) => setsalary(e.target.value)}
                />
              </div>
              <div className="col-2 fs-6 city">Trạng thái</div>
              <div className="col-4 fs-6 p-0">
                {" "}
                <Switch
                  checkedChildren="Bật"
                  unCheckedChildren="Tắt"
                  defaultChecked
                  onChange={(checked) => setstatus(checked)}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 fs-6">Mô tả công việc</div>
            </div>
            <div className="row mb-2 box-input position-relative">
              <textarea
                className="col-12 description-job"
                rows={5}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thêm ảnh
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          {!item && (
            <Button variant="primary" onClick={handlePost}>
              Thêm công việc
            </Button>
          )}
          {item && (
            <Button variant="primary" onClick={handleUpdate}>
              Sửa công việc
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddWork;
