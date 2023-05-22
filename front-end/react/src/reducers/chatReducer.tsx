export enum ChatActionKind {
  GET_CONVERSATION = "GET_CONVERSATION",
  GET_MESSAGE = "GET_MESSAGE",
  SEND_MESSAGE = "SEND_MESSAGE",
}

interface ChatState {
  conversations: Array<{
    conversationID: number;
    userId: number;
    name: string;
    photoURL?: string;
    message?: Array<any>;
  }>;
}

interface ChatAction {
  type: ChatActionKind;
  payload: ChatState;
}

export const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case ChatActionKind.SEND_MESSAGE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
