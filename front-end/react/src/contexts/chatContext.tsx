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

  const getControvations = async () => {
    const data = await UseFetchData(`${apiURL}/conversation`);
    if (data.statusCode === 200) {
      console.log(data);

      const payload: Array<IConversation> = (data.members as Array<any>).map(
        (member) => {
          return {
            conversationId: member.conversationId,
            messages: [],
            userId: member.user.id,
            name: member.user.name,
            photoURL: member.user.photoURL,
          };
        }
      );
      chatDispatch({ type: ChatActionKind.GET_CONVERSATION, payload });
    }
  };

  const getConversationMessages = async (id: number) => {
    const data: any = await UseFetchData(`${apiURL}/conversation/${id}`);

    console.log(data);

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

  const ChatContextData = {
    chatState,
    chatDispatch,
    currentConversationId,
    setCurrentConversationId,
    sendMessage,
    getControvations,
    getConversationMessages,
    recvMessage,
  };

  return (
    <ChatContext.Provider value={{ ChatContextData }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
