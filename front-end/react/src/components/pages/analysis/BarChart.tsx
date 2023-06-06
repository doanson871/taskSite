import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { useEffect, useState } from "react";

const BarChartData = () => {
  const { getAllApplications, getAllWorks } = useTasksiteContext();
  const [dataList, setDataList] = useState<any>([]);

  useEffect(() => {
    Promise.all([getAllApplications(), getAllWorks()]).then(
      ([listApplications, works]) => {
        const applications = listApplications.data;
        const data = [];
        const object: any = {};
        for (let i = 0; i < works.length; i++) {
          //   data.push({
          //     name: works[i].name,
          //     accpeted: 0,
          //     rejected: 0,
          //   });
          object[works[i].name] = {
            name: works[i].name,
            accpeted: 0,
            rejected: 0,
            total: 0,
          };
        }

        for (let i = 0; i < applications.length; i++) {
          if (applications[i].status === "ACCEPTED") {
            object[applications[i].postJob.work.name].accpeted++;
          } else if (applications[i].status === "REJECTED") {
            object[applications[i].postJob.work.name].rejected++;
          }
          object[applications[i].postJob.work.name].total++;
        }

        for (let value in object) {
          if (
            object[value].accpeted === 0 &&
            object[value].rejected === 0 &&
            object[value].total === 0
          ) {
            continue;
          }
          data.push(object[value]);
        }
        setDataList(data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="graph">
      <h2 className="graph-title">
        Biểu đồ thống kê lượng đơn chập nhận, từ chối và đang chờ theo từng công
        việc
      </h2>
      <ResponsiveContainer width="80%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accpeted" fill="green" />
          <Bar dataKey="rejected" fill="red" />
          <Bar dataKey="total" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartData;
