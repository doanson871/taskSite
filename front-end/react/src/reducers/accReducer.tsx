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
    case AuthActionKind.ADDACCOUNT:
      return {
        Id_Sub_Account: null,
        isGetSubAccount: false,
        subAccount: null,
      };
    case AuthActionKind.DELETE_ACCOUNT:
      return {
        Id_Sub_Account: null,
        isGetSubAccount: false,
        subAccount: null,
      };
    case AuthActionKind.RESET:
      return {
        ...state,
        isGetSubAccount: false,
      };

    default:
      return state;
  }
};
