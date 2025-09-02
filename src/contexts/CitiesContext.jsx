import { createContext } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  return <CitiesContext.Provider>{children}</CitiesContext.Provider>;
};

export { CitiesContext, CitiesProvider };
