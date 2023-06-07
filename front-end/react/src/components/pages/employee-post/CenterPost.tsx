import { useContext, useEffect, useState } from "react";
import AddPostModal from "../../mini-component/add-post-modal/AddPostModal";
import "./styles.scss";
import AddNote from "./AddNote";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import NoteItem from "./NoteItem";
import { AuthContext } from "../../../contexts/authContext";

interface Props {
  idProfile?: number | undefined;
}

const CenterPost: React.FC<Props> = ({ idProfile }) => {
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { getAllNote, noteList } = useTasksiteContext();
  const [show, setShow] = useState(false);
  const [isFilter, setShowFilter] = useState(false);
  useEffect(() => {
    getAllNote(idProfile);
  }, [idProfile]);

  return (
    <>
      {(!idProfile || idProfile === account.id) && (
        <AddPostModal
          element={{
            setShow: setShow,
            isFilter: isFilter,
            setShowFilter: setShowFilter,
          }}
        />
      )}
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
