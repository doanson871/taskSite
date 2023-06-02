import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import AddPostJob from "../../mini-component/add-post-job/AddPostJob";
import PostJob from "../../mini-component/post-job/PostJob";
import FilterModal from "../../mini-component/filter/FilterModal";
import AddPostModal from "../../mini-component/add-post-modal/AddPostModal";
interface Props {}
const Post: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const { postList, getAllPostJob, isFilter } = useTasksiteContext();
  // const [listPostJob, setListPostJob] = useState<any[]>([]);
  // console.log(listPostJob);
  useEffect(() => {
    getAllPostJob();
    setShowFilter(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="post d-grid">
        <div className="left-post"></div>
        <div className="center-post">
          <>
            <AddPostModal
              element={{
                setShow: setShow,
                setShowFilter: setShowFilter,
                isFilter: isFilter,
              }}
            />
            <div className="list-post-jobs d-flex">
              {postList.map((postJob: any) => (
                <PostJob
                  element={{
                    id: postJob.id,
                    address: `${postJob.quanhuyen}, ${postJob.thanhpho}`,
                    photoUrl: postJob.photoURL,
                    description: postJob.descrition,
                    status: postJob.status,
                    workId: postJob.workId,
                  }}
                />
              ))}
            </div>
          </>
        </div>
        <div className="right-post"></div>
      </div>
      <AddPostJob showModal={show} handleClose={handleClose} />
      <FilterModal showModal={showFilter} handleClose={handleCloseFilter} />
    </>
  );
};

export default Post;
