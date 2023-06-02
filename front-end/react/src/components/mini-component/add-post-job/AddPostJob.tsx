import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { listAddress } from "../../../utils/constant";
import { Image, notification } from "antd";
import { SmileOutlined, WarningTwoTone } from "@ant-design/icons";
import { UseUploadImage } from "../../../hooks/useUploadImg";

interface Props {
  showModal: boolean;
  handleClose: () => void;
}
const AddPostJob: React.FC<Props> = ({ showModal, handleClose }) => {
  const { getAllWorks } = useTasksiteContext();
  const [jobs, setjobs] = useState<any[]>([]);
  const [workId, setWorkId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [distric, setDistric] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const { createNewUserPost } = useTasksiteContext();

  const [api, contextHolder] = notification.useNotification();

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

  const refFile: any = useRef();

  const openNotification = () => {
    api.open({
      message: "Đăng bài thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const failAddPost = () => {
    api.open({
      message: "Đăng bài thất bại",
      icon: <WarningTwoTone style={{ color: "#red" }} />,
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

  const postJob = async () => {
    let postForm = {
      address: address,
      descrition: description,
      workId: workId,
      thanhpho: city,
      quanhuyen: distric,
      salary: salary,
      photoURL: "",
    };
    try {
      const photoURL: string | undefined = await UseUploadImage(imageUpload);
      if (photoURL) {
        postForm = { ...postForm, photoURL };
      }

      const { status } = await createNewUserPost(postForm);
      if (status === 200) {
        openNotification();
        handleClose();
      } else {
        failAddPost();
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
        style={{
          top: 0,
        }}
        show={showModal}
        onHide={() => {
          imageURL && URL.revokeObjectURL(imageURL);
          setImageURL(imageURL);
          handleClose();
        }}
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
              <div className="col-2 fs-6">Lương</div>
              <input
                type="text"
                className="col-10 cost box-input"
                onChange={(e) => setSalary(+e.target.value)}
              />
            </div>
            <div className="row mb-2">
              <div className="col-12 fs-6">Mô tả công việc</div>
            </div>
            <div className="row mb-2 position-relative">
              <textarea
                className="col-12 description-job"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
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
        <Modal.Footer className="footer-post">
          <div
            className="btn btn-secondary"
            onClick={() => {
              refFile.current.click();
            }}
          >
            <i className="bi bi-camera"></i>
          </div>
          <button className="btn btn-primary" onClick={postJob}>
            Đăng bài
          </button>
          <input
            type="file"
            className="d-none"
            ref={refFile}
            onChange={(e) => {
              handleUploadImage(e);
            }}
            accept="image/*"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddPostJob;
