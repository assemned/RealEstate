import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const PropertyContext = createContext();

export const propertyReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTIES":
      return {
        properties: action.payload,
      };
    case "CREATE_PROPERTY":
      return {
        properties: [action.payload, ...state.properties],
      };
    case "UPDATE_PROPERTY":
      return {
        properties: state.properties.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case "DELETE_PROPERTY":
      return {
        properties: state.properties.filter(
          (p) => p._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const PropertyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, { properties: [] });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/properties"
        );

        dispatch({ type: "SET_PROPERTIES", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
};
