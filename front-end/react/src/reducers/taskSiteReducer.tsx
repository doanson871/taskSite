export enum TaskSiteActionKind {
  GET_CONVERSATION = "GET_CONVERSATION",
  GET_MESSAGE = "GET_MESSAGE",
  SEND_MESSAGE = "SEND_MESSAGE",
}

interface TaskSiteState {
  conversations: Array<{
    conversationID: number;
    userId: number;
    name: string;
    photoURL?: string;
    message?: Array<any>;
  }>;
}

interface TaskSiteAction {
  type: TaskSiteActionKind;
  payload: TaskSiteState;
}

const taskSiteReducer = (state: TaskSiteState, action: TaskSiteAction) => {
  switch (action.type) {
    case TaskSiteActionKind.SEND_MESSAGE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default taskSiteReducer;
