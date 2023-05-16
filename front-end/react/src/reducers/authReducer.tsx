export enum AuthActionKind {
  SETAUTH = "SET_AUTH",
  RESET = "RESET",
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
    default:
      return state;
  }
};
