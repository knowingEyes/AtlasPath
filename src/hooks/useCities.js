import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === "undefined")
    throw new Error("Cannot use context out of his provider");
  return context;
};
