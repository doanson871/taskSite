import React, { useEffect, useState } from "react";
import { List, Radio, Skeleton } from "antd";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { Link } from "react-router-dom";
import { getDOB } from "../../../utils/constant";

interface Props {}

const colorText = {
  PROCESSING: "black",
  ACCEPTED: "green",
  REJECTED: "red",
};

const History: React.FC<Props> = (props: Props) => {
  const { getAllApplications } = useTasksiteContext();
  const [value, setValue] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const [originList, setOriginList] = useState([]);
  const [list, setList] = useState([]);

  const handleString = (string: string) => {
    if (string.length < 30) {
      return string;
    }

    let newString = string.substring(0, 28);
    newString += "...";

    return newString;
  };

  useEffect(() => {
    getAllApplications().then((res: any) => {
      console.log(res);
      if (res.statusCode === 200) {
        setOriginList(res.data);
        setList(res.data);
        setIsLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    if (value === "ALL") {
      setList([...originList]);
    } else {
      const newList = [...originList].filter(
        (item: any) => item.status === value
      );
      setList(newList);
    }
  }, [value]);

  return (
    <div className="post d-grid">
      <div className="left-post"></div>
      <div className="center-post">
        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "10px" }}
        >
          <Radio.Group
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            size="large"
          >
            <Radio.Button value="ALL">Tất cả ứng tuyển</Radio.Button>
            <Radio.Button value="ACCEPTED">Đã chấp nhận</Radio.Button>
            <Radio.Button value="REJECTED">Đã bị từ chối</Radio.Button>
          </Radio.Group>
        </div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Link to={`/post/${item.postJobId}`} key="list-loadmore-more">
                  more
                </Link>,
              ]}
            >
              <Skeleton title={false} loading={!isLoading} active>
                <List.Item.Meta
                  title={
                    <>
                      <span>{item.postJob.work.name}</span>
                      <span
                        style={{
                          marginLeft: "10px",
                          color: "rgb(102 102 102)",
                          fontWeight: "normal",
                        }}
                      >
                        {getDOB(item.createdAt)}
                      </span>
                    </>
                  }
                  description={handleString(item.content)}
                />
                <div style={{ color: (colorText as any)[item.status] }}>
                  {item.status}
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>

      <div className="right-post"></div>
    </div>
  );
};

export default History;
