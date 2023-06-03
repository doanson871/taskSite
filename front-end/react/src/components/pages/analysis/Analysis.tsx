import React, { useEffect, useState } from "react";
import "./analysis.scss";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { getDataTimeAnalysis } from "../../../utils/constant";

const Analysis = () => {
  const { getInfoPostJob, getAllWorks } = useTasksiteContext();
  const [listData, setListData] = useState<Array<any>>(getDataTimeAnalysis());
  const [rawDataWork, setRawDataWork] = useState<any>([]);

  useEffect(() => {
    Promise.all([getInfoPostJob(), getAllWorks()]).then(
      ([infoJob, infoWork]) => {
        let listPostJob = infoJob.data;

        let dataWork = {};
        let arrWork = [];

        for (let i = 0; i < infoWork.length; i++) {
          (dataWork as any)[infoWork[i].name] = 0;
          arrWork.push(infoWork[i].name);
        }

        setRawDataWork([...arrWork]);

        let rawListData = listData.map((data) => {
          return {
            ...data,
            ...dataWork,
          };
        });

        for (let i = 0; i < listPostJob.length; i++) {
          for (let j = 0; j < rawListData.length; j++) {
            if (
              new Date(listPostJob[i].createdAt).getTime() >=
              new Date(rawListData[j].breakTimePoint).getTime()
            ) {
              rawListData[j][listPostJob[i].work.name]++;
              break;
            }
          }
        }
        setListData([...rawListData.reverse()]);
      }
    );
  }, []);

  return (
    <div className="graph">
      <h1 className="graph-title">Biểu đồ đường</h1>
      <ResponsiveContainer width="80%" height="50%">
        <LineChart
          data={listData}
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
          {rawDataWork.map((name: any) => (
            <Line type="monotone" dataKey={name} stroke="#8884d8" />
          ))}

          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analysis;
