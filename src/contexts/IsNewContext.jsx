import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const IsNewContext = createContext();

const IsNewProvider = ({ children }) => {
  const [isNew, setIsNew] = useLocalStorageState(true, "isNew", {
    render: true,
  });

  return (
    <IsNewContext.Provider value={{ isNew, setIsNew }}>
      {children}
    </IsNewContext.Provider>
  );
};
export { IsNewContext, IsNewProvider };
