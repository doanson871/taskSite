export enum AuthActionKind {
  SETAUTH = "SET_AUTH",
  RESET = "RESET",
  UPDATE = "UPDATE",
}

interface AuthState {
  isAuthenticated: boolean;
  account: any;
}

interface AuthAction {
  type: AuthActionKind;
  payload: AuthState;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...action.payload,
      };
    case "RESET":
      return action.payload;
    case "UPDATE": {
      const newState = { ...state };
      newState.account = { ...newState.account, ...action.payload };
      return newState;
    }
    default:
      return state;
  }
};
