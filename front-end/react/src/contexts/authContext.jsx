import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // Context data
  const authContextData = { };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
