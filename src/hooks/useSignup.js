import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://real-estate-server-b8bv.onrender.com/api/user/signup",
        formData
      );

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // update Auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };
  return { signup, isLoading, error };
};
