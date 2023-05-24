import React, { useState } from "react";
import "./styles.scss";
import PostJob from "../../mini-component/post-job/PostJob";
interface Props {}
const Post: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className="post d-grid">
        <div className="left-post"></div>
        <div className="center-post">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                className="bi bi-image image-post"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="right-post"></div>
      </div>
      <PostJob showModal={show} handleClose={handleClose} />
    </>
  );
};

export default Post;
