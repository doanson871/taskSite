export enum AuthActionKind {
  ADDACCOUNT = "ADD_ACCOUNT",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
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
export const accReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};
