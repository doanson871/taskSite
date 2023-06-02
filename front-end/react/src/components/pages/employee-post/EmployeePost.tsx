import { useEffect, useState } from "react";
import AddPostModal from "../../mini-component/add-post-modal/AddPostModal";
import "./styles.scss";
import AddNote from "./AddNote";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import NoteItem from "./NoteItem";
const EmployeePost: React.FC = () => {
  const { getAllNote, noteList } = useTasksiteContext();
  const [show, setShow] = useState(false);
  const [isFilter, setShowFilter] = useState(false);
  useEffect(() => {
    getAllNote();
  }, []);
  return (
    <>
      <div className="employee-post d-grid">
        <div className="left-side"></div>
        <div className="center-side">
          <AddPostModal
            element={{
              setShow: setShow,
              isFilter: isFilter,
              setShowFilter: setShowFilter,
            }}
          />
          <div className="d-flex" style={{flexDirection: 'column-reverse'}}>
          {noteList.map((note: any) => (
            <NoteItem item={note} />
          ))}
          </div>
        </div>
        <div className="right-side"></div>
      </div>
      <AddNote showModal={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default EmployeePost;
