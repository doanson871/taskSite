import { Avatar, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDOB } from "../../../utils/constant";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";

interface Props {}

const HistoryUser = (props: Props) => {
  const { getAllPostJob } = useTasksiteContext();
  const [listData, setListData] = useState<Array<any>>([]);

  useEffect(() => {
    getAllPostJob().then((data: any) => {
      let list: Array<any> = [];
      data.forEach((post: any) => {
        let rawApplications = (post.Application as Array<any>)?.filter(
          (app: any) => {
            return app.status === "ACCEPTED";
          }
        );

        let applications = rawApplications.map((app: any) => {
          return {
            postId: post.id,
            app: app,
            createdAt: app.createdAt,
          };
        });

        list.push(...applications);
      });
      setListData([...list]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listApply = (listData as Array<any>).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={listApply}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Link to={`/post/${item.postId}`} key="list-loadmore-more">
                xem
              </Link>,
            ]}
          >
            <Skeleton title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item?.app.employee?.photoURL} />}
                title={
                  <>
                    <Link to={`/profile/${item?.app.employee?.id}`}>
                      {item?.app.employee?.name}
                    </Link>
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
                description={"Đã chấp nhận"}
              />
              {/* <div>{"item.status"}</div> */}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistoryUser;
