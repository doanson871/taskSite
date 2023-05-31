import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserList from "./UserList";
import "./css/Sidebar.scss";
import { ChatContext } from "../../../contexts/chatContext";
import { IConversation } from "../../../reducers/chatReducer";
import { compare, socket } from "../../../utils/constant";

interface Props {}

const SideBar: React.FC<Props> = (props) => {
  const {
    ChatContextData: {
      chatState,
      updateLastMessage,
      currentConversationId,
      updateStatusConversation,
    },
  } = useContext(ChatContext);

  const conversations: Array<IConversation> = chatState.conversations;

  useEffect(() => {
    socket.connect();

    conversations.forEach((conversation) => {
      socket.on(`onLastMessageRoom${conversation.conversationId}`, (data) => {
        console.log(data.data);
        updateLastMessage(data.data);

        if (currentConversationId !== conversation.conversationId) {
          updateStatusConversation(conversation.conversationId);
        }
      });
    });

    return () => {
      conversations.forEach((conversation) => {
        socket.removeListener(
          `onLastMessageRoom${conversation.conversationId}`
        );
      });
    };

    // eslint-disable-next-line
  }, [conversations, updateLastMessage]);

  conversations.sort((a, b) => {
    return compare(a.updateTime, b.updateTime);
  });

  return (
    <div className="wrap-sidebar">
      <Row>
        <Col xl={12} lg={12}>
          <UserInfo />
        </Col>
        <Col xl={12} lg={12}>
          {conversations.map((conversation, id: number) => {
            return (
              <UserList
                key={id}
                conversationId={conversation.conversationId}
                name={conversation.name}
                photoURL={conversation.photoURL}
                lastMessage={conversation.lastMessage}
                updateTime={conversation.updateTime}
                seen={conversation.seen}
              />
            );
          })}
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
