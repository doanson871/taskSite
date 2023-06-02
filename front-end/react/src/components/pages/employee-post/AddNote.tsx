import { notification } from "antd";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { SmileOutlined } from "@ant-design/icons";
interface Props {
  showModal: boolean;
  handleClose: () => void;
}

const AddNote: React.FC<Props> = ({ showModal, handleClose }) => {
  const { addNote } = useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();
  const [description, setDescription] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const handlePostNote = async () => {
    const form = {
      title: title,
      description: description,
    };
    const { statusCode } = await addNote(form);
    if (statusCode === 200) {
      openNotification();
      handleClose();
    }
  };
  const openNotification = () => {
    api.open({
      message: "Đăng bài thành công",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
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
              <div className="col-2 fs-6 address">Công việc</div>
              <input
                type="text"
                className="col-10 address-input box-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="row mb-2">
              <div className="col-12 fs-6">Mô tả công việc</div>
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
        </Modal.Body>
        <Modal.Footer className="footer-post">
          <div className="btn btn-secondary">
            <i className="bi bi-camera"></i>
          </div>
          <button className="btn btn-primary" onClick={handlePostNote}>
            Đăng bài
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNote;
