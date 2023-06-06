import { Switch, notification, Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import "./styles.scss";
import { SmileOutlined, WarningTwoTone } from "@ant-design/icons";
import { UseUploadImage } from "../../../hooks/useUploadImg";
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
  const refFile: any = useRef();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImageUpload(file);

    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    return () => {
      imageURL && URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);
  useEffect(() => {
    if (item) {
      setjob(item?.workId);
      setsalary(item?.priceExpected);
      setdescription(item?.description);
      setstatus(item?.status);
      setImageURL(item?.photoURL);
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
    let workForm = {
      description,
      priceExpected: salary,
      status,
      workId: job,
      photoURL: "",
    }
    try {
      const photoURL: string | undefined = await UseUploadImage(imageUpload);
      if (photoURL) {
        workForm = { ...workForm, photoURL };
      }

      const { statusCode } = await postUserOnWork(workForm);
      if (statusCode === 200) {
        resetData();
        openNotification();
        handleClose();
      } else {
        resetData();
        failAddPost();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetData = () => {
    setjob(0);
    setsalary("0");
    setdescription("");
    setstatus(true);
    setImageURL("");
    setImageUpload(null);
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
            <div>
              <Image
                width={200}
                src={imageURL}
                fallback="https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
              ></Image>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              refFile.current.click();
            }}>
            Thêm ảnh
          </Button>
          <input
            type="file"
            className="d-none"
            ref={refFile}
            onChange={(e) => {
              handleUploadImage(e);
            }}
            accept="image/*"
          />
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
