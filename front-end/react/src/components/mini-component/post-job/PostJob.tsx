import React, { useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { listAddress } from "../../../utils/constant";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

interface Props {
  showModal: boolean;
  handleClose: () => void;
}
const PostJob: React.FC<Props> = ({ showModal, handleClose }) => {
  const { getAllWorks } = useTasksiteContext();
  const [jobs, setjobs] = useState<any[]>([]);
  const [workId, setWorkId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [distric, setDistric] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { createNewUserPost } = useTasksiteContext();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Đăng bài thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, []);
  const listCity = useMemo(() => {
    let _listCity = ["Hãy chọn thành phố"];
    listAddress.forEach((address) => {
      _listCity.push(address.city);
    });
    return _listCity;
    // eslint-disable-next-line
  }, [listAddress]);
  const listDistric = useMemo(() => {
    let _listDistric = ["Hãy chọn quận"];
    listAddress.forEach((address) => {
      if (address.city === city) {
        _listDistric = _listDistric.concat(address.district);
      }
    });
    return _listDistric;
  }, [city]);
  const getAllJobs = async () => {
    try {
      const allWorks = await getAllWorks();
      let listWork = [{ id: 0, name: "Hãy lựa chọn công việc" }, ...allWorks];
      setjobs(listWork);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = () => {};
  const postJob = async () => {
    const postForm = {
      address: `${address}, ${distric}, ${city}`,
      descrition: description,
      workId: workId,
    };
    try {
      const response = await createNewUserPost(postForm);
      if (response.data.statusCode === 200) {
        openNotification();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post-job container">
            <div className="row mb-2">
              <div className="col-2 fs-6 address">Địa chỉ</div>
              <input
                type="text"
                className="col-10 address-input box-input"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6 distric">Thành phố</div>
              <div className="col-4 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDistric("Hãy chọn quận");
                  }}
                >
                  {listCity.map((city) => (
                    <option value={city}>{city}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-2 fs-6 city">Quận</div>
              <div className="col-4 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e) => {
                    setDistric(e.target.value);
                  }}
                  value={distric}
                >
                  {listDistric.map((distric) => (
                    <option value={distric}>{distric}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6">Job</div>
              <div className="col-10 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e) => setWorkId(+e.target.value)}
                >
                  {jobs.map((job) => (
                    <option value={job.id}>{job.name}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6">Tiền công</div>
              <input type="text" className="col-4 cost box-input" />
              <div
                className="col-2 m-auto d-flex"
                style={{ justifyContent: "center" }}
              >
                ----
              </div>
              <input type="text" className="col-4 cost box-input" />
            </div>
            <div className="row mb-2">
              <div className="col-12 fs-6">Mô tả công việc</div>
            </div>
            <div className="row mb-2 position-relative">
              <textarea
                className="col-12 description-job"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-post">
          <div className="btn btn-secondary" onClick={uploadImage}>
            <i className="bi bi-camera"></i>
          </div>
          <button className="btn btn-primary" onClick={postJob}>
            Đăng bài
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PostJob;
