import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserList from "./UserList";
import "./css/Sidebar.scss";
import { ChatContext } from "../../../contexts/chatContext";

interface Props {}

const SideBar: React.FC<Props> = (props) => {
  return (
    <div className="wrap-sidebar">
      <Row>
        <Col xl={12} lg={12}>
          <UserInfo />
        </Col>
        <Col xl={12} lg={12}>
          <UserList conversationId={1} />
          <UserList conversationId={2} />
          <UserList conversationId={3} />
          <UserList conversationId={4} />
        </Col>
      </Row>
    </div>
  );
};

export default SideBar;
