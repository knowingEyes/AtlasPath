import { useContext } from "react";
import { IsNewContext } from "../contexts/IsNewContext";

export const useIsNew = () => {
  const context = useContext(IsNewContext);
  if (!context) throw new Error("Cannot use Context outside of its provider");
  return context;
};
