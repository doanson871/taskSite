import { PropsWithChildren, createContext } from "react";
import { RegisterForm } from "../components/pages/register/Register";
import { apiURL } from "../utils/constant";
import axios from "axios";

export const AccContext = createContext<any>(null);

const AccContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const createNewAccount = async (accountForm: RegisterForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, accountForm);
      return response;
    } catch (error: any) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const accContextData = { createNewAccount };
  return (
    <AccContext.Provider value={accContextData}>{children}</AccContext.Provider>
  );
};

export default AccContextProvider;
