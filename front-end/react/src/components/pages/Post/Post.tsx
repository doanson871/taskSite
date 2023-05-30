import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import AddPostJob from "../../mini-component/add-post-job/AddPostJob";
import PostJob from "../../mini-component/post-job/PostJob";
import { FilterOutlined, FilterTwoTone } from "@ant-design/icons";
import { useRef } from "react";
import FilterModal from "../../mini-component/filter/FilterModal";
interface Props {}
const Post: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const { postList, getAllPostJob } = useTasksiteContext();
  const refElement = useRef<HTMLElement>(null);
  // const [listPostJob, setListPostJob] = useState<any[]>([]);
  // console.log(listPostJob);
  useEffect(() => {
    getAllPostJob();
  }, [getAllPostJob]);

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
              <FilterTwoTone
                style={{ fontSize: "24px" }}
                ref={refElement}
                onClick={() => {
                  setShowFilter(true);
                }}
              />
            </div>
          </div>
          <div className="list-post-jobs d-flex">
            {postList.map((postJob: any) => (
              <PostJob
                element={{
                  address: `${postJob.quanhuyen}, ${postJob.thanhpho}`,
                  photoUrl: postJob.photoURL,
                  description: postJob.descrition,
                  status: postJob.status,
                  workId: postJob.workId,
                }}
              />
            ))}
          </div>
        </div>
        <div className="right-post"></div>
      </div>
      <AddPostJob showModal={show} handleClose={handleClose} />
      <FilterModal showModal={showFilter} handleClose={handleCloseFilter} />
    </>
  );
};

export default Post;
