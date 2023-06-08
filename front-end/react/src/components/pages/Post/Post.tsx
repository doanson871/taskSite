import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import AddPostJob from "../../mini-component/add-post-job/AddPostJob";
import PostJob from "../../mini-component/post-job/PostJob";
import FilterModal from "../../mini-component/filter/FilterModal";
import AddPostModal from "../../mini-component/add-post-modal/AddPostModal";
import { AuthContext } from "../../../contexts/authContext";
import Filter from "../../mini-component/filter-only/Filter";
interface Props {}
const Post: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { authState } = useContext(AuthContext);

  const account = authState.account;

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const { postList, getAllPostJob, isFilter } = useTasksiteContext();
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
            {account.role !== "EMPLOYEE" && (
              <AddPostModal
                element={{
                  setShow: setShow,
                  setShowFilter: setShowFilter,
                  isFilter: isFilter,
                }}
              />
            )}
            {account.role === "EMPLOYEE" && (
              <Filter
                element={{
                  setShow: setShow,
                  setShowFilter: setShowFilter,
                  isFilter: isFilter,
                }}
              />
            )}
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
                    time: postJob.createdAt,
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
