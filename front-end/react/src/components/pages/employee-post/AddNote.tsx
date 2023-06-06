import { notification, Image } from "antd";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { SmileOutlined } from "@ant-design/icons";
import { UseUploadImage } from "../../../hooks/useUploadImg";
interface Props {
  showModal: boolean;
  handleClose: () => void;
}

const AddNote: React.FC<Props> = ({ showModal, handleClose }) => {
  const { addNote } = useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();
  const [description, setDescription] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const handlePostNote = async () => {
    let postForm = {
      description: description,
      title: title,
      url: "",
    };
    try {
      const photoURL: string | undefined = await UseUploadImage(imageUpload);
      if (photoURL) {
        postForm = { ...postForm, url: photoURL };
      }

      const { status } = await addNote(postForm);
      if (status === 200) {
        resetData();
        openNotification();
        handleClose();
      } else {
        resetData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openNotification = () => {
    api.open({
      message: "Đăng bài thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const resetData = () => {
    setDescription("");
    setTitle("");
  };

  //image upload
  const refFile: any = useRef();
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    setImageUpload(file);

    if (file) {
      setImageURL(URL.createObjectURL(file));
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
              <div className="col-2 fs-6 address">Tiêu đề</div>
              <input
                type="text"
                className="col-10 address-input box-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="row mb-2">
              <div className="col-12 fs-6">Nội dung</div>
            </div>
            <div className="row mb-2 position-relative">
              <textarea
                className="col-12 description-job"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-2">
            <Image
              width={200}
              src={imageURL}
              fallback="https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
            ></Image>
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
          <button className="btn btn-primary" onClick={handlePostNote}>
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

export default AddNote;
