import { PropsWithChildren, createContext, useEffect, useReducer } from "react";
import { AuthActionKind, authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import { LOCAL_STORAGE_TOKEN_NAME, apiURL } from "../utils/constant";
import axios from "axios";

export interface LoginUserForm {
  email: string;
  password: string;
}

export const AuthContext = createContext<any>(null);

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Reducers for authentication
  const [authState, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    account: null,
  });
  // Authenticate User

  const loadAccount = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiURL}/users/me`);
      if (response.status === 200) {
        authDispatch({
          type: AuthActionKind.SETAUTH,
          payload: {
            isAuthenticated: true,
            account: response.data,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      authDispatch({
        type: AuthActionKind.SETAUTH,
        payload: { isAuthenticated: false, account: null },
      });
    }
  };

  // get data profile
  const profileData = async () => {
    try {
      const response = await axios.get(`${apiURL}/users/me`);
      if (response.status === 200) {
        authDispatch({
          type: AuthActionKind.SETAUTH,
          payload: {
            isAuthenticated: true,
            account: response.data,
          },
        });
      }
    } catch (error: any) {
      if (error.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  useEffect(() => {
    loadAccount();
    profileData();
  }, []);

  // Login
  const loginUser = async (userForm: LoginUserForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, userForm);
      if (response.status === 201) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      //
      await loadAccount();

      return response?.data;
    } catch (error: any) {
      if (error.response?.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    authDispatch({
      type: AuthActionKind.SETAUTH,
      payload: { isAuthenticated: false, account: null },
    });
  };
  // Context data
  const authContextData = { loginUser, authState, logOut };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
