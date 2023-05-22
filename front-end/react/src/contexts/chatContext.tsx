import React, {
  PropsWithChildren,
  createContext,
  useReducer,
  useState,
} from "react";
import { chatReducer } from "../reducers/chatReducer";
import { io } from "socket.io-client";

export const ChatContext = createContext<any>(null);

const ChatContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentConversationId, setCurrentConversationId] = useState(undefined);

  const [chatState, chatDispatch] = useReducer(chatReducer, {
    conversations: [],
  });

  const ChatContextData = {
    chatState,
    chatDispatch,
    currentConversationId,
    setCurrentConversationId,
  };

  return (
    <ChatContext.Provider value={{ ChatContextData }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
