import React, { useEffect, useState } from "react";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import AvailableItem from "./AvailableItem";
import "./styles.scss";
import { FilterOutlined } from "@ant-design/icons";
import Filter from "./Filter";

const AvailableWorks: React.FC = () => {
  const { getAllAvailJob, availableWorks, getUserById } = useTasksiteContext();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [filterForm, setFilterForm] = useState<any>({
    workId: 0,
    salary: 0,
    city: "",
    distric: "",
  });
  useEffect(() => {
    getAllAvailJob();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const getListJob = async () => {
      const getUser = async (id: number) => {
        const response = await getUserById(id);
        if (response.statusCode === 200) {
          return response.data;
        }
      };
      const _list = availableWorks.map(async (item: any) => {
        const response = await getUser(item.userId);
        const data = {
          ...item,
          thanhpho: response.thanhpho,
          quanhuyen: response.quanhuyen,
          phoneNumber: response.phoneNumber,
        };
        return data;
      });
      let result = await Promise.all(_list);
      
      setList(result);
    };
    getListJob();
    // eslint-disable-next-line
  }, [availableWorks, filterForm]);
  return (
    <div className="list-available-work">
      <div className="filter" onClick={() => setShowFilter(true)}>
        Bộ lọc: <FilterOutlined />
      </div>
      <Filter
        showModal={showFilter}
        handleClose={() => setShowFilter(false)}
        setFilterForm={setFilterForm}
      />
      <div className="list-item d-flex">
        {list.map((item: any) => (
          <AvailableItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default AvailableWorks;
