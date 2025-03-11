/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SuccessMessageContext = createContext();

export function SuccessMessageProvider({ children }) {
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
    </SuccessMessageContext.Provider>
  );
}
