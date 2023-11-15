import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { PropertyContextProvider } from "./context/PropertyContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PropertyContextProvider>
        <App />
      </PropertyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
