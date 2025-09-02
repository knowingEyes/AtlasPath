import { useContext } from "react";

export const useCities = () => {
  const context = useContext();
  if (context === "undefined")
    throw new Error("Cannot use context out of his provider");
  return context;
};
