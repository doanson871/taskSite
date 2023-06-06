import { useEffect, useState } from "react";
import AddPostModal from "../../mini-component/add-post-modal/AddPostModal";
import "./styles.scss";
import AddNote from "./AddNote";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import NoteItem from "./NoteItem";

interface Props {
  idProfile?: number | undefined;
}

const CenterPost: React.FC<Props> = ({ idProfile }) => {
  const { getAllNote, noteList } = useTasksiteContext();
  const [show, setShow] = useState(false);
  const [isFilter, setShowFilter] = useState(false);
  useEffect(() => {
    getAllNote(idProfile);
  }, [idProfile]);
  return (
    <>
      <AddPostModal
        element={{
          setShow: setShow,
          isFilter: isFilter,
          setShowFilter: setShowFilter,
        }}
      />
      <div className="d-flex" style={{ flexDirection: "column-reverse" }}>
        {noteList.map((note: any, id: number) => (
          <NoteItem item={note} key={id} />
        ))}
      </div>
      <AddNote showModal={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default CenterPost;
