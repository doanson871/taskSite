export enum ChatActionKind {
  GET_CONVERSATION = "GET_CONVERSATION",
  GET_MESSAGES = "GET_MESSAGES",
  RECV_MESSAGE = "RECV_MESSAGE",
  UPDATE_LASTMESSSAGE = "UPDATE_LASTMESSSAGE",
  UPDATE_STATUS_CONVERSATION = "UPDATE_STATUS_CONVERSATION",
}

export interface IMessage {
  userId: number;
  content: string;
  date: string;
}

export interface IConversation {
  conversationId: number;
  userId: number;
  name?: string;
  photoURL?: string;
  lastMessage?: string;
  messages: Array<IMessage>;
  updateTime: string;
  seen?: boolean;
}

interface ChatState {
  conversations: Array<IConversation>;
}

interface ChatAction {
  type: ChatActionKind;
  payload: any;
}

export interface payload_recv_message {
  conversationId: number;
  message: IMessage;
}

export interface payload_get_message {
  conversateionId: number;
  messages: Array<IMessage>;
}

export const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case ChatActionKind.RECV_MESSAGE: {
      state.conversations = state.conversations.map((item) => {
        const payload = action.payload as payload_recv_message;
        if (item.conversationId === payload.conversationId) {
          const newMessages: Array<IMessage> = [...item.messages];
          newMessages.push({
            ...payload.message,
          });
          return {
            ...item,
            messages: newMessages,
            lastMessage: payload.message.content,
            seen: true,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
      };
    }

    case ChatActionKind.GET_CONVERSATION: {
      state.conversations = [...action.payload];
      return {
        ...state,
      };
    }

    case ChatActionKind.GET_MESSAGES: {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.conversationId === action.payload.conversateionId) {
          return {
            ...conversation,
            messages: [...action.payload.messages],
            seen: true,
          };
        } else return conversation;
      });

      return {
        ...state,
      };
    }
    case ChatActionKind.UPDATE_LASTMESSSAGE: {
      state.conversations = state.conversations.map((item) => {
        const payload = action.payload as payload_recv_message;
        if (item.conversationId === payload.conversationId) {
          return {
            ...item,
            lastMessage: payload.message.content,
            updateTime: new Date().toISOString(),
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
      };
    }
    case ChatActionKind.UPDATE_STATUS_CONVERSATION: {
      state.conversations = state.conversations.map((item) => {
        const payload = action.payload;
        if (item.conversationId === payload) {
          return {
            ...item,
            seen: false,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
