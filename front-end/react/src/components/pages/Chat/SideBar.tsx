import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserList from "./UserList";
import "./css/Sidebar.scss";
import { ChatContext } from "../../../contexts/chatContext";
import { IConversation } from "../../../reducers/chatReducer";

interface Props {}

const SideBar: React.FC<Props> = (props) => {
  const {
    ChatContextData: { chatState },
  } = useContext(ChatContext);

  return (
    <div className="wrap-sidebar">
      <Row>
        <Col xl={12} lg={12}>
          <UserInfo />
        </Col>
        <Col xl={12} lg={12}>
          {chatState.conversations.map(
            (conversation: IConversation, id: number) => {
              return (
                <UserList
                  key={id}
                  conversationId={conversation.conversationId}
                  name={conversation.name}
                  photoURL={conversation.photoURL}
                  lastMessage={conversation.lastMessage}
                />
              );
            }
          )}
          {/* <UserList conversationId={1} />
          <UserList conversationId={2} />
          <UserList conversationId={3} />
          <UserList conversationId={4} /> */}
        </Col>
      </Row>
    </div>
  );
};

export default SideBar;
