import { PropertyContext } from "../context/PropertyContext";
import { useContext } from "react";

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw Error(
      "usePropertyContext must be used inside an PropertyContextProvider"
    );
  }

  return context;
};
