import React, { useEffect } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import AvailableItem from "./AvailableItem";
import "./styles.scss";

const AvailableWorks: React.FC = () => {
  const { getAllAvailJob, availableWorks } = useTasksiteContext();
  useEffect(() => {
    getAllAvailJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="list-available-work">
      <div className="list-item d-flex">
        {availableWorks.map((item: any) => (
          <AvailableItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default AvailableWorks;
