import { createContext } from "react";

export const AccContext = createContext();

const AccContextProvider = ({ children }) => {

  const accContextData = {
  };
  return (
    <AccContext.Provider value={accContextData}>{children}</AccContext.Provider>
  );
};

export default AccContextProvider;
