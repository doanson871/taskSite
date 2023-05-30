import React, {
  PropsWithChildren,
  createContext,
  useReducer,
  useState,
} from "react";
import {
  ChatActionKind,
  IConversation,
  IMessage,
  chatReducer,
  payload_get_message,
  payload_recv_message,
} from "../reducers/chatReducer";
import { apiURL, socket } from "../utils/constant";
import { UseFetchData } from "../hooks/useFetchData";

export const ChatContext = createContext<any>(null);

const ChatContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentConversationId, setCurrentConversationId] = useState(undefined);
  const [currentUserChat, setCurrentUserChat] = useState({
    name: undefined,
    photoURL: undefined,
  });

  const [chatState, chatDispatch] = useReducer(chatReducer, {
    conversations: [],
  });

  const sendMessage = async (payload: payload_recv_message) => {
    socket.connect();
    socket.emit("newMessage", payload);
  };

  const recvMessage = async (payload: payload_recv_message) => {
    chatDispatch({ type: ChatActionKind.RECV_MESSAGE, payload });
  };

  const updateLastMessage = async (payload: payload_recv_message) => {
    chatDispatch({ type: ChatActionKind.UPDATE_LASTMESSSAGE, payload });
  };

  const getControvations = async () => {
    const data = await UseFetchData(`${apiURL}/conversation`);
    if (data.statusCode === 200) {
      const payload: Array<IConversation> = (data.members as Array<any>).map(
        (member) => {
          return {
            conversationId: member.conversationId,
            messages: [],
            userId: member.user.id,
            name: member.user.name,
            photoURL: member.user.photoURL,
            lastMessage: member.lastMessage,
            updateTime: member.updateTime,
            seen: member.seen,
          };
        }
      );
      chatDispatch({ type: ChatActionKind.GET_CONVERSATION, payload });
    }
  };

  const getConversationMessages = async (id: number) => {
    await UseFetchData(`${apiURL}/member/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        seen: true,
      }),
    });
    const data: any = await UseFetchData(`${apiURL}/conversation/${id}`);

    if (data.statusCode === 200) {
      const messages = (data.data.Message as Array<any>).map((message: any) => {
        return {
          content: message.content,
          date: message.createdAt,
          userId: message.userId,
        } as IMessage;
      });
      const payload: payload_get_message = {
        conversateionId: id,
        messages: messages,
      };
      chatDispatch({ type: ChatActionKind.GET_MESSAGES, payload });
    }
  };

  const updateStatusConversation = async (conversateionId: number) => {
    UseFetchData(`${apiURL}/member/${conversateionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        seen: false,
      }),
    }).then((data) => {
      console.log(data);

      if (data.statusCode === 200) {
        chatDispatch({
          type: ChatActionKind.UPDATE_STATUS_CONVERSATION,
          payload: conversateionId,
        });
      }
    });
  };

  const ChatContextData = {
    chatState,
    chatDispatch,
    currentConversationId,
    setCurrentConversationId,
    currentUserChat,
    setCurrentUserChat,
    sendMessage,
    getControvations,
    getConversationMessages,
    recvMessage,
    updateLastMessage,
    updateStatusConversation,
  };

  return (
    <ChatContext.Provider value={{ ChatContextData }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
